/**
 * PHYSICS ENGINE V11 - TRACKMAN GRADE
 * Objectif : Précision CREPS / Outil Pédagogique
 * * Améliorations V11 :
 * 1. Reynolds Number Approximation : Gestion fine du vent de face extrême.
 * 2. Spin Decay Realism : La balle perd du spin de manière réaliste (4%/s).
 * 3. Iron Trajectory Flattening : Correction des "Moon Balls" sur les longs fers.
 */

// --- CONSTANTS ---
const CONSTANTS = {
    GRAVITY: 9.81,
    AIR_DENSITY_SEA_LEVEL: 1.225,
    BALL_MASS: 0.0459,
    BALL_RADIUS: 0.02135,
    BALL_AREA: Math.PI * Math.pow(0.02135, 2),
    VISCOSITY: 1.48e-5
};

// --- GOLF BAG CONFIGURATION ---
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
    'LW': { loft: 58.0, mass: 310, length: 35.25, smashFactor: 1.00, attackAngle: -6.0, efficiency: 0.85 },
    'Put': { loft: 3.5, mass: 330, length: 34.00, smashFactor: 1.00, attackAngle: 0.0, efficiency: 1.00 }
};

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
        // Correction V11: Face fermée (négatif) -> Tilt gauche (négatif)
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

    /**
     * Cœur aérodynamique V11
     * Gère la crise de traînée et la saturation de portance.
     */
    static calculateCoefficients(speed, spinRpm) {
        const omega = spinRpm * 0.10472;
        const spinRatio = (omega * CONSTANTS.BALL_RADIUS) / (speed + 0.1);

        // --- 1. DRAG (Cd) ---
        // Base : 0.23 (Un peu plus résistant que V10 pour punir le vent)
        let cd = 0.23 + (0.12 * spinRatio);

        // Drag Crisis (High Speed Efficiency)
        // Les balles modernes percent mieux l'air au-dessus de 60m/s
        if (speed > 60) {
            cd *= 0.92;
        }

        // MUR DE VENT (Reynolds Penalties)
        // Si la vitesse relative est extrême (> 75 m/s, ex: Drive + Vent Face),
        // La traînée augmente brutalement.
        if (speed > 75) {
            cd *= 1.10; // +10% de traînée pour les conditions extrêmes
        }

        cd = Math.min(Math.max(cd, 0.19), 0.65);

        // --- 2. LIFT (Cl) ---
        // V11 Tweak: On aplatit la courbe pour les fers.
        // tanh(3.5) au lieu de 4.0 -> Sature plus lentement -> Moins de "ballon"
        let cl = 0.09 + (0.28 * Math.tanh(3.5 * spinRatio));

        // Plafond strict pour éviter les envolées des Wedges
        cl = Math.min(cl, 0.38);

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

        // Facteur de direction (1 = Standard)
        const WIND_DIRECTION_FACTOR = 1;

        const windVel = Vec3.new(
            windSpeedMps * Math.cos(windRad) * WIND_DIRECTION_FACTOR,
            windSpeedMps * Math.sin(windRad) * WIND_DIRECTION_FACTOR,
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

            // Calcul dynamique des coefs
            let { cd, cl } = this.calculateCoefficients(speed, currentRpm);

            const groundSpeed = Vec3.mag(vel);

            // --- Forces ---
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

            // --- SPIN DECAY V11 (Realism) ---
            // Perte de ~4% de spin par seconde (0.04).
            // Cela empêche la balle de rester "vivante" trop longtemps en l'air.
            spinRate *= (1.0 - 0.04 * dt);

            if (pos.z > maxHeight) maxHeight = pos.z;
            trajectory.push({ x: pos.x, y: pos.y, z: pos.z, t });

            if (pos.z <= 0) {
                pos.z = 0;
                isFlying = false;
            }
            t += dt;
        }

        // --- ROLLING & BOUNCE PHYSICS ---
        const carryDistance = Math.sqrt(pos.x ** 2 + pos.y ** 2);
        let rollDistance = 0;
        let bounceCount = 0;
        const landingAngleRad = Math.atan2(Math.abs(vel.z), Math.sqrt(vel.x ** 2 + vel.y ** 2));
        const landingAngleDeg = landingAngleRad * (180 / Math.PI);

        // Restitution dépendant de l'angle (0.35 base)
        let energyRestitution = 0.35 + (0.35 * (1 - (landingAngleDeg / 90)));
        let hVel = Math.sqrt(vel.x ** 2 + vel.y ** 2);

        while (hVel > 0.5 && bounceCount < 10) {
            hVel *= energyRestitution;
            // Backspin brake (plus efficace si on tombe verticalement)
            const spinBrake = (spinRate * 0.002) * Math.sin(landingAngleRad);
            hVel -= spinBrake;
            if (hVel < 0) hVel = 0;

            // Friction herbe
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
            faceToPath: (launchParams.spinAxisTiltDeg / -2.5) // Conversion inverse pour affichage
        };
    }

    /**
     * Calculates the rolling phase specifically for chipping/putting
     */
    static calculateRoll(landingState, greenSpeed = 10) {
        let pos = landingState.pos; // Helper ref
        // pos is actually a reference to the vector in landingState? 
        // No, landingState comes from simulateTrajectory which pushes new objects to path.
        // But landingState might be the last object.
        // Let's ensure we work on copies if needed, but here we just need start values.

        // We need mutable vectors for the loop
        // landingState.velocity is {x,y,z}
        let vel = { ...landingState.velocity };
        let posC = { ...landingState.pos }; // Current Pos copy

        let spinRate = landingState.spinRate;

        // Zero out Z velocity/pos for pure roll start (physics simplification)
        vel.z = 0;
        posC.z = 0;

        let rollPath = [];
        let t = 0;
        const dt = 0.01;
        const g = CONSTANTS.GRAVITY;

        // Green Speed to friction coefficient approx
        // Stimp 10 -> mu ~ 0.13
        // Formula: mu = 1.3 / Stimp ?? 
        // Stimp 10ft => ball rolls 10ft.
        // v^2 = 2*mu*g*d => mu = v^2 / (2*g*d)
        // Common approx: mu = 1.3 / Stimp is a bit simplistic but works for games.
        const muBase = 1.3 / greenSpeed;

        let isRolling = true;
        let rollDist = 0;

        // Push start point
        rollPath.push({ x: posC.x, y: posC.y, z: 0, t: 0 }); // Relative time

        while (isRolling && t < 10.0) {
            const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
            if (speed < 0.05) {
                isRolling = false;
                break;
            }

            // Friction Model:
            // 1. Base friction from green speed
            // 2. Spin Influence: Backspin increases friction, Topspin decreases it
            // Spin is in rad/s. Positive = Backspin.
            // A high backspin should act as a brake.

            // Normalized spin factor (approx 5000rpm = 523 rad/s)
            // We want significant braking effect from backspin
            const spinFactor = (spinRate * 0.001);

            // Effective Friction
            let muEff = muBase * (1.0 + spinFactor);

            // Deceleration
            const decel = g * muEff;

            // Update Velocity
            const speedNew = speed - (decel * dt);

            if (speedNew <= 0) {
                vel.x = 0; vel.y = 0;
                isRolling = false;
            } else {
                const ratio = speedNew / speed;
                vel.x *= ratio;
                vel.y *= ratio;
            }

            // Update Position
            posC.x += vel.x * dt;
            posC.y += vel.y * dt;

            rollPath.push({ x: posC.x, y: posC.y, z: 0, t: t + dt });

            // Spin Decay during roll (friction eats spin)
            spinRate *= (1.0 - 2.0 * dt); // Fast decay on ground

            t += dt;
        }

        // Calculate total distance from start of roll
        if (rollPath.length > 0) {
            const start = rollPath[0];
            const end = rollPath[rollPath.length - 1];
            rollDist = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        }

        return {
            rollPath: rollPath,
            rollDistance: rollDist
        };
    }

    static simulateChipping(launchParams, environment = {}, greenSpeed = 10) {
        // 1. Calculate Flight
        const flightResult = this.simulateTrajectory(launchParams, environment);

        // RECONSTRUCT LANDING STATE
        const path = flightResult.path;

        // --- PUTTER FIX: Handle immediate landing ---
        let vx = 0, vy = 0, vz = 0;
        let last = path.length > 0 ? path[path.length - 1] : { x: 0, y: 0, z: 0, t: 0 };

        if (path.length > 1) {
            // Normal flight: Calc velocity from last 2 points
            const prev = path[path.length - 2];
            const dt = last.t - prev.t;
            if (dt > 0) {
                vx = (last.x - prev.x) / dt;
                vy = (last.y - prev.y) / dt;
                vz = (last.z - prev.z) / dt;
            }
        } else {
            // Immediate Ground Contact (Putter with 0 loft)
            // Use launch velocity approx
            const launchRad = launchParams.launchAngleDeg * (Math.PI / 180);
            const dirRad = launchParams.launchDirectionDeg * (Math.PI / 180);
            const speed = launchParams.ballSpeedMps; // m/s

            vx = speed * Math.cos(launchRad) * Math.cos(dirRad);
            vy = speed * Math.cos(launchRad) * Math.sin(dirRad);
            vz = speed * Math.sin(launchRad);

            // Ensure pos is at least 0,0,0 if path was empty
            if (path.length === 0) last = { x: 0, y: 0, z: 0, t: 0 };
        }

        const landingState = {
            pos: { x: last.x, y: last.y, z: last.z },
            velocity: { x: vx, y: vy, z: vz },
            spinRate: flightResult.spinRpm * 0.10472 // Approx residual spin (rad/s)
        };

        // 2. Calculate Roll
        const rollResult = this.calculateRoll(landingState, greenSpeed);

        // 3. Merge Results
        const flightTime = flightResult.flightTimeSeconds;
        // Shift time for roll points
        rollResult.rollPath.forEach(p => p.t += flightTime);

        const fullPath = flightResult.path.concat(rollResult.rollPath);

        return {
            ...flightResult,
            rollDistance: parseFloat(rollResult.rollDistance.toFixed(1)),
            totalDistance: parseFloat((flightResult.carryDistance + rollResult.rollDistance).toFixed(1)),
            path: fullPath,
            flightPathEndIndex: flightResult.path.length,
            isChip: true
        };
    }

    static calculatePutting(targetDistance, slopeXDeg, slopeYDeg, aimAngleDeg = 0) {
        // ... (Code Putting inchangé, il est fonctionnel) ...
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