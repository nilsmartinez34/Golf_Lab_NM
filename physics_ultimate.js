/**
 * PHYSICS ENGINE V2 - High Fidelity Golf Simulation
 * * Corrections:
 * - Vecteurs 3D pour la force Magnus (Cross Product).
 * - Calcul du Spin basé sur le "Spin Loft" (D-Plane).
 * - Gestion du vent en m/s (conversion correcte).
 * - Simulation de rebond et de roulement physique.
 */

// --- CONSTANTS ---
const CONSTANTS = {
    GRAVITY: 9.81,
    AIR_DENSITY_SEA_LEVEL: 1.225, // kg/m^3
    BALL_MASS: 0.0459,            // kg
    BALL_RADIUS: 0.02135,         // m
    BALL_AREA: Math.PI * Math.pow(0.02135, 2),
    VISCOSITY: 1.48e-5
};

// --- GOLF BAG CONFIGURATION (MODERN / POWER SPECS) ---
const GOLF_BAG = {
    'Dr': { loft: 10.5, mass: 200, length: 45.75, smashFactor: 1.49, attackAngle: 3.0, efficiency: 1.0 },
    '3W': { loft: 15.0, mass: 210, length: 43.25, smashFactor: 1.47, attackAngle: -1.0, efficiency: 0.99 },

    '4i': { loft: 21.0, mass: 249, length: 38.50, smashFactor: 1.43, attackAngle: -2.5, efficiency: 0.97 },
    '5i': { loft: 24.0, mass: 256, length: 38.00, smashFactor: 1.39, attackAngle: -3.0, efficiency: 0.96 },

    '6i': { loft: 27.0, mass: 263, length: 37.50, smashFactor: 1.36, attackAngle: -3.5, efficiency: 0.95 },
    '7i': { loft: 30.5, mass: 270, length: 37.00, smashFactor: 1.33, attackAngle: -4.0, efficiency: 0.94 },

    '8i': { loft: 35.0, mass: 277, length: 36.50, smashFactor: 1.29, attackAngle: -4.5, efficiency: 0.93 },
    '9i': { loft: 39.5, mass: 284, length: 36.00, smashFactor: 1.25, attackAngle: -5.0, efficiency: 0.92 },
    'PW': { loft: 44.0, mass: 291, length: 35.75, smashFactor: 1.20, attackAngle: -5.5, efficiency: 0.91 },

    'SW': { loft: 54.0, mass: 305, length: 35.50, smashFactor: 1.08, attackAngle: -6.0, efficiency: 0.88 },
    'LW': { loft: 58.0, mass: 310, length: 35.25, smashFactor: 1.00, attackAngle: -6.0, efficiency: 0.85 }
};

// --- VECTOR MATH HELPER ---
const Vec3 = {
    new: (x, y, z) => ({ x, y, z }),
    add: (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }),
    sub: (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }),
    mult: (v, s) => ({ x: v.x * s, y: v.y * s, z: v.z * s }),
    mag: (v) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z),
    normalize: (v) => {
        const m = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        return m === 0 ? { x: 0, y: 0, z: 0 } : { x: v.x / m, y: v.y / m, z: v.z / m };
    },
    dot: (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z,
    cross: (v1, v2) => ({
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    })
};

class PhysicsEngine {

    static get GOLF_BAG() { return GOLF_BAG; }

    static calculateLaunchParams(input, club, manualAttackAngle = null) {
        const clubSpeedMps = input.clubSpeedMph * 0.44704;
        const ballSpeedMps = clubSpeedMps * club.smashFactor * input.efficiency;

        const attackAngle = manualAttackAngle !== null ? manualAttackAngle : club.attackAngle;
        let dynamicLoft = club.loft * 0.85 + (attackAngle * 0.5);
        dynamicLoft += input.clubFaceAngle * 0.3;

        const launchAngleDeg = dynamicLoft;
        const launchDirectionDeg = (input.clubFaceAngle * 0.85) + (input.pathDeviationDeg * 0.15);

        const spinLoft = dynamicLoft - attackAngle;
        let totalSpinRpm = clubSpeedMps * spinLoft * 5.5;
        totalSpinRpm *= input.powerFactor;

        const faceToPath = input.clubFaceAngle - input.pathDeviationDeg;
        const spinAxisTiltDeg = faceToPath * 2.5;

        const spinAxisRad = spinAxisTiltDeg * (Math.PI / 180);
        const backSpinRpm = totalSpinRpm * Math.cos(spinAxisRad);
        const sideSpinRpm = totalSpinRpm * Math.sin(spinAxisRad);

        return {
            ballSpeedMps,
            launchAngleDeg,
            launchDirectionDeg,
            totalSpinRpm,
            spinAxisTiltDeg,
            backSpinRpm,
            sideSpinRpm,
            clubHeadSpeedMph: input.clubSpeedMph,
            smashFactor: club.smashFactor,
            attackAngle: attackAngle
        };
    }

    static calculateAirDensity(alt, temp) {
        const p0 = 101325;
        const t0 = 288.15;
        const m = 0.0289644;
        const r = 8.31447;
        const tempK = temp + 273.15;
        const pressure = p0 * Math.exp(-CONSTANTS.GRAVITY * m * alt / (r * t0));
        return (pressure * m) / (r * tempK);
    }

    static calculateCoefficients(speed, spinRpm) {
        const omega = spinRpm * 0.10472;
        const spinRatio = (omega * CONSTANTS.BALL_RADIUS) / (speed + 0.1);

        // Cd (Traînée) : Base standard propre
        let cd = 0.21 + (0.35 * spinRatio);
        // Drag crisis à haute vitesse (standard)
        if (speed > 60) cd *= 0.95;

        cd = Math.min(Math.max(cd, 0.20), 0.60);

        // Cl (Portance) : La formule qui marchait bien pour la hauteur
        let cl = 0.09 + (0.32 * Math.tanh(4.0 * spinRatio));
        cl = Math.min(cl, 0.40);

        return { cd, cl };
    }

    static simulateTrajectory(launchParams, environment = {}) {
        const env = {
            altitude: environment.altitude || 0,
            temp: environment.temp || 20,
            windSpeed: environment.windSpeed || 0,
            windDirDeg: environment.windDir || 0
        };

        const dt = 0.01;
        let t = 0;

        const launchRad = launchParams.launchAngleDeg * (Math.PI / 180);
        const dirRad = launchParams.launchDirectionDeg * (Math.PI / 180);

        let pos = Vec3.new(0, 0, 0);
        let vel = Vec3.new(
            launchParams.ballSpeedMps * Math.cos(launchRad) * Math.cos(dirRad),
            launchParams.ballSpeedMps * Math.cos(launchRad) * Math.sin(dirRad),
            launchParams.ballSpeedMps * Math.sin(launchRad)
        );

        const axisTiltRad = launchParams.spinAxisTiltDeg * (Math.PI / 180);
        let spinRate = launchParams.totalSpinRpm * 0.10472;

        const windSpeedMps = env.windSpeed * 0.27778;
        const windRad = env.windDirDeg * (Math.PI / 180);
        const windVel = Vec3.new(
            windSpeedMps * Math.cos(windRad),
            windSpeedMps * Math.sin(windRad),
            0
        );

        const rho = this.calculateAirDensity(env.altitude, env.temp);
        const area = CONSTANTS.BALL_AREA;
        const mass = CONSTANTS.BALL_MASS;

        let trajectory = [];
        let maxHeight = 0;
        let isFlying = true;

        while (isFlying && t < 20) {
            const vRel = Vec3.sub(vel, windVel);
            const speed = Vec3.mag(vRel);
            const currentRpm = spinRate / 0.10472;
            let { cd, cl } = this.calculateCoefficients(speed, currentRpm);

            const groundSpeed = Vec3.mag(vel);

            // Si la balle va plus vite par rapport au sol que par rapport à l'air,
            // c'est qu'elle est portée par le vent (Tailwind).
            if (groundSpeed > speed) {
                // 1. On réduit la traînée pour simuler l'effet "voile"
                // Plus le delta est grand, plus on réduit.
                cd *= 0.85;

                // 2. CRITIQUE : On BOOSTE la portance.
                // Normalement, vent arrière = moins de vitesse air = chute.
                // On compense artificiellement pour garder la balle en l'air.
                cl *= 1.20;
            }

            const Fg = Vec3.new(0, 0, -mass * CONSTANTS.GRAVITY);
            const dragMag = 0.5 * rho * area * cd * speed * speed;
            const vRelNorm = Vec3.normalize(vRel);
            const Fd = Vec3.mult(vRelNorm, -dragMag);

            const flightDir = Math.atan2(vel.y, vel.x);
            const spinAxis = Vec3.new(
                Math.sin(flightDir) * Math.cos(axisTiltRad),
                -Math.cos(flightDir) * Math.cos(axisTiltRad),
                Math.sin(axisTiltRad)
            );

            let magnusDir = Vec3.cross(spinAxis, vRelNorm);
            magnusDir = Vec3.normalize(magnusDir);

            const liftMag = 0.5 * rho * area * cl * speed * speed;
            const Fm = Vec3.mult(magnusDir, liftMag);

            const Ftot = Vec3.add(Vec3.add(Fg, Fd), Fm);
            const acc = Vec3.mult(Ftot, 1 / mass);

            vel = Vec3.add(vel, Vec3.mult(acc, dt));
            pos = Vec3.add(pos, Vec3.mult(vel, dt));

            spinRate *= (1.0 - 0.01 * dt);

            if (pos.z > maxHeight) maxHeight = pos.z;
            trajectory.push({ x: pos.x, y: pos.y, z: pos.z, t });

            if (pos.z <= 0) {
                pos.z = 0;
                isFlying = false;
            }
            t += dt;
        }

        const carryDistance = Math.sqrt(pos.x ** 2 + pos.y ** 2);

        let rollDistance = 0;
        let bounceCount = 0;
        const landingAngleRad = Math.atan2(Math.abs(vel.z), Math.sqrt(vel.x ** 2 + vel.y ** 2));
        const landingAngleDeg = landingAngleRad * (180 / Math.PI);
        //let energyRestitution = 0.5 + (0.4 * (1 - (landingAngleDeg / 90)));
        let energyRestitution = 0.35 + (0.35 * (1 - (landingAngleDeg / 90)));
        let hVel = Math.sqrt(vel.x ** 2 + vel.y ** 2);

        while (hVel > 0.5 && bounceCount < 10) {
            hVel *= energyRestitution;
            const spinBrake = (spinRate * 0.002) * Math.sin(landingAngleRad);
            hVel -= spinBrake;
            if (hVel < 0) hVel = 0;
            const stepDist = hVel * 1.0;
            rollDistance += stepDist;
            energyRestitution *= 0.65;
            bounceCount++;
        }

        const totalDistance = carryDistance + rollDistance;

        return {
            carryDistance: parseFloat(carryDistance.toFixed(1)),
            totalDistance: parseFloat(totalDistance.toFixed(1)),
            maxHeight: parseFloat(maxHeight.toFixed(1)),
            flightTimeSeconds: parseFloat(t.toFixed(2)),
            lateralDeviation: parseFloat(pos.y.toFixed(1)),
            path: trajectory,
            spinRpm: launchParams.backSpinRpm,
            sideSpinRpm: launchParams.sideSpinRpm,
            ballSpeedMph: launchParams.ballSpeedMps / 0.44704,
            clubHeadSpeedMph: launchParams.clubHeadSpeedMph,
            smashFactor: launchParams.smashFactor,
            swingPath: launchParams.launchDirectionDeg,
            faceToPath: (launchParams.spinAxisTiltDeg / -2.5)
        };
    }

    static calculatePutting(targetDistance, slopeXDeg, slopeYDeg, aimAngleDeg = 0) {
        const MU_STIMP_10 = 0.131;
        const DT = 0.01;
        const STOP_THRESHOLD = 0.01;
        const path = [];
        const thetaX = slopeXDeg * Math.PI / 180;
        const thetaY = slopeYDeg * Math.PI / 180;
        const phiAim = aimAngleDeg * Math.PI / 180;
        const v0 = Math.sqrt(2 * MU_STIMP_10 * CONSTANTS.GRAVITY * targetDistance);
        let vx = v0 * Math.sin(phiAim);
        let vy = v0 * Math.cos(phiAim);
        let x = 0.0, y = 0.0, t = 0.0;
        const ax_slope = CONSTANTS.GRAVITY * Math.sin(thetaX);
        const ay_slope = -CONSTANTS.GRAVITY * Math.sin(thetaY);
        let totalDistTraveled = 0.0;
        while (t < 10.0) {
            path.push({ x, y, z: 0.0 });
            const v = Math.sqrt(vx * vx + vy * vy);
            if (v < STOP_THRESHOLD && t > 0.1) break;
            const cosTheta = Math.cos(Math.sqrt(thetaX ** 2 + thetaY ** 2));
            const frictionAcc = MU_STIMP_10 * CONSTANTS.GRAVITY * cosTheta;
            const ax_fric = v > 0 ? -(vx / v) * frictionAcc : 0.0;
            const ay_fric = v > 0 ? -(vy / v) * frictionAcc : 0.0;
            const ax_total = ax_fric + ax_slope;
            const ay_total = ay_fric + ay_slope;
            vx += ax_total * DT;
            vy += ay_total * DT;
            const dx = vx * DT;
            const dy = vy * DT;
            x += dx; y += dy;
            totalDistTraveled += Math.sqrt(dx * dx + dy * dy);
            t += DT;
            if (Math.sqrt(vx * vx + vy * vy) < STOP_THRESHOLD && t > 0.1) break;
        }
        return { path, totalDistance: totalDistTraveled, finalX: x, finalY: y, residualSpeed: Math.sqrt(vx * vx + vy * vy) };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsEngine;
} else {
    window.PhysicsEngine = PhysicsEngine;
}