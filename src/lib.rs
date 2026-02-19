use wasm_bindgen::prelude::*;
use std::f64::consts::PI;
use serde::{Serialize, Deserialize};

// --- CONSTANTS ---
const GRAVITY: f64 = 9.81;
const BALL_MASS: f64 = 0.0459;
const BALL_RADIUS: f64 = 0.02135;
const BALL_AREA: f64 = PI * BALL_RADIUS * BALL_RADIUS;

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Copy, Clone, Debug)]
pub struct Vec3 {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

impl Vec3 {
    pub fn new(x: f64, y: f64, z: f64) -> Self { Vec3 { x, y, z } }
    pub fn add(self, other: Vec3) -> Vec3 { Vec3::new(self.x + other.x, self.y + other.y, self.z + other.z) }
    pub fn sub(self, other: Vec3) -> Vec3 { Vec3::new(self.x - other.x, self.y - other.y, self.z - other.z) }
    pub fn mult(self, s: f64) -> Vec3 { Vec3::new(self.x * s, self.y * s, self.z * s) }
    pub fn mag(self) -> f64 { (self.x * self.x + self.y * self.y + self.z * self.z).sqrt() }
    pub fn normalize(self) -> Vec3 {
        let m = self.mag();
        if m == 0.0 { Vec3::new(0.0, 0.0, 0.0) } else { self.mult(1.0 / m) }
    }
    pub fn cross(self, other: Vec3) -> Vec3 {
        Vec3::new(
            self.y * other.z - self.z * other.y,
            self.z * other.x - self.x * other.z,
            self.x * other.y - self.y * other.x,
        )
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TrajectoryPoint {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub t: f64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TrajectoryResult {
    pub path: Vec<TrajectoryPoint>,
    pub carry_distance: f64,
    pub total_distance: f64,
    pub max_height: f64,
    pub flight_time: f64,
    pub lateral_deviation: f64,
}

#[wasm_bindgen]
pub struct PhysicsEngineRust;

#[wasm_bindgen]
impl PhysicsEngineRust {
    pub fn calculate_air_density(alt: f64, temp: f64) -> f64 {
        let p0 = 101325.0;
        let t0 = 288.15;
        let m = 0.0289644;
        let r = 8.31447;
        let temp_k = temp + 273.15;
        let pressure = p0 * ((-GRAVITY * m * alt) / (r * t0)).exp();
        (pressure * m) / (r * temp_k)
    }

    pub fn calculate_coefficients(speed: f64, current_rpm: f64) -> JsValue {
        let (cd, cl) = Self::calculate_coefficients_internal(speed, current_rpm);
        serde_wasm_bindgen::to_value(&serde_json::json!({ "cd": cd, "cl": cl })).unwrap()
    }

    fn calculate_coefficients_internal(speed: f64, current_rpm: f64) -> (f64, f64) {
        let omega = current_rpm * 0.10471975512;
        let spin_ratio = (omega * BALL_RADIUS) / (speed + 0.1);
        let mut cd = 0.23 + (0.12 * spin_ratio);
        if speed > 60.0 { cd *= 0.92; }
        if speed > 75.0 { cd *= 1.10; }
        cd = cd.clamp(0.19, 0.65);
        let cl = (0.09 + (0.28 * (3.5 * spin_ratio).tanh())).min(0.38);
        (cd, cl)
    }

    fn get_acceleration(vel: Vec3, spin_rate: f64, axis_tilt_rad: f64, wind_vel: Vec3, rho: f64) -> Vec3 {
        let v_rel = vel.sub(wind_vel);
        let speed = v_rel.mag();
        let (cd, cl) = Self::calculate_coefficients_internal(speed, spin_rate / 0.10471975512);

        let fd = v_rel.normalize().mult(-0.5 * rho * BALL_AREA * cd * speed * speed);
        let fg = Vec3::new(0.0, 0.0, -BALL_MASS * GRAVITY);
        
        let flight_dir = vel.y.atan2(vel.x);
        let spin_axis = Vec3::new(
            flight_dir.sin() * axis_tilt_rad.cos(),
            -flight_dir.cos() * axis_tilt_rad.cos(),
            axis_tilt_rad.sin(),
        );
        let magnus_dir = spin_axis.cross(v_rel.normalize()).normalize();
        let fm = magnus_dir.mult(0.5 * rho * BALL_AREA * cl * speed * speed);

        fg.add(fd).add(fm).mult(1.0 / BALL_MASS)
    }

    pub fn simulate_trajectory(
        speed_mps: f64, launch_angle_deg: f64, launch_dir_deg: f64,
        total_spin_rpm: f64, axis_tilt_deg: f64, altitude: f64, temp: f64,
        wind_speed_kmh: f64, wind_dir_deg: f64,
    ) -> JsValue {
        let dt = 0.01;
        let launch_rad = launch_angle_deg.to_radians();
        let dir_rad = launch_dir_deg.to_radians();
        let axis_tilt_rad = axis_tilt_deg.to_radians();
        let mut spin_rate = total_spin_rpm * 0.10471975512;

        let mut pos = Vec3::new(0.0, 0.0, 0.0);
        let mut vel = Vec3::new(
            speed_mps * launch_rad.cos() * dir_rad.cos(),
            speed_mps * launch_rad.cos() * dir_rad.sin(),
            speed_mps * launch_rad.sin(),
        );

        let wind_mps = wind_speed_kmh * 0.277778;
        let wind_rad = wind_dir_deg.to_radians();
        let wind_vel = Vec3::new(wind_mps * wind_rad.cos(), wind_mps * wind_rad.sin(), 0.0);
        let rho = Self::calculate_air_density(altitude, temp);
        
        let mut path = Vec::new();
        let mut max_height = 0.0;
        let mut t = 0.0;

        while pos.z >= -0.1 && t < 20.0 {
            path.push(TrajectoryPoint { x: pos.x, y: pos.y, z: pos.z, t });
            if pos.z > max_height { max_height = pos.z; }

            // RK4 Step
            let k1_v = Self::get_acceleration(vel, spin_rate, axis_tilt_rad, wind_vel, rho);
            let k1_p = vel;
            let k2_v = Self::get_acceleration(vel.add(k1_v.mult(0.5 * dt)), spin_rate, axis_tilt_rad, wind_vel, rho);
            let k2_p = vel.add(k1_v.mult(0.5 * dt));
            let k3_v = Self::get_acceleration(vel.add(k2_v.mult(0.5 * dt)), spin_rate, axis_tilt_rad, wind_vel, rho);
            let k3_p = vel.add(k2_v.mult(0.5 * dt));
            let k4_v = Self::get_acceleration(vel.add(k3_v.mult(dt)), spin_rate, axis_tilt_rad, wind_vel, rho);
            let k4_p = vel.add(k3_v.mult(dt));

            vel = vel.add(k1_v.add(k2_v.mult(2.0)).add(k3_v.mult(2.0)).add(k4_v).mult(dt / 6.0));
            pos = pos.add(k1_p.add(k2_p.mult(2.0)).add(k3_p.mult(2.0)).add(k4_p).mult(dt / 6.0));
            spin_rate *= 1.0 - 0.04 * dt;
            t += dt;
            if pos.z < 0.0 && t > 0.1 { break; }
        }
        
        if pos.z < 0.0 { pos.z = 0.0; }
        
        // Basic Roll Approximation for full swing
        let carry = (pos.x * pos.x + pos.y * pos.y).sqrt();
        let mut roll = 0.0;
        let mut h_vel = (vel.x * vel.x + vel.y * vel.y).sqrt();
        let mut bounce = 0;
        while h_vel > 0.5 && bounce < 10 {
            h_vel *= 0.35;
            roll += h_vel * 1.0;
            bounce += 1;
        }

        let res = TrajectoryResult {
            path, carry_distance: carry, total_distance: carry + roll,
            max_height, flight_time: t, lateral_deviation: pos.y,
        };
        serde_wasm_bindgen::to_value(&res).unwrap()
    }

    pub fn calculate_putting(target_dist: f64, slope_x_deg: f64, slope_y_deg: f64, aim_angle_deg: f64) -> JsValue {
        let mu = 0.131;
        let dt = 0.01;
        let mut x = 0.0; let mut y = 0.0; let mut t = 0.0;
        let v0 = (2.0 * mu * GRAVITY * target_dist).sqrt();
        let mut vx = v0 * aim_angle_deg.to_radians().sin();
        let mut vy = v0 * aim_angle_deg.to_radians().cos();
        let ax_slope = GRAVITY * slope_x_deg.to_radians().sin();
        let ay_slope = -GRAVITY * slope_y_deg.to_radians().sin();
        let mut path = Vec::new();

        while t < 10.0 {
            path.push(TrajectoryPoint { x, y, z: 0.0, t });
            let v = (vx * vx + vy * vy).sqrt();
            if v < 0.01 && t > 0.1 { break; }
            let friction_acc = mu * GRAVITY;
            let ax = if v > 0.0 { -(vx / v) * friction_acc + ax_slope } else { ax_slope };
            let ay = if v > 0.0 { -(vy / v) * friction_acc + ay_slope } else { ay_slope };
            vx += ax * dt; vy += ay * dt;
            x += vx * dt; y += vy * dt;
            t += dt;
        }

        serde_wasm_bindgen::to_value(&serde_json::json!({
            "path": path, "totalDistance": (x*x + y*y).sqrt(), "finalX": x, "finalY": y
        })).unwrap()
    }
}
