const PhysicsEngine = {
    GRAVITY: 9.81,
    RHO: 1.225,      // Densité de l'air (kg/m3)
    MASS: 0.0459,     // Masse balle (kg)
    AREA: 0.001432,   // Section transversale (m2)
    RADIUS: 0.02135,  // Rayon de la balle (m)
    SPIN_DECAY: 0.999, // Décroissance naturelle du spin

    GOLF_BAG: {
        "Dr": { name: "Dr", loft: 10.5, length: 45.0, smashFactor: 1.50, baseSpinRpm: 2300.0, rollFactor: 0.25 },
        "3W": { name: "3W", loft: 15.0, length: 43.0, smashFactor: 1.42, baseSpinRpm: 3600.0, rollFactor: 0.18 },
        "4i": { name: "4i", loft: 24.0, length: 38.5, smashFactor: 1.37, baseSpinRpm: 5200.0, rollFactor: 0.08 },
        "5i": { name: "5i", loft: 27.0, length: 38.0, smashFactor: 1.32, baseSpinRpm: 5800.0, rollFactor: 0.07 },
        "6i": { name: "6i", loft: 30.0, length: 37.5, smashFactor: 1.27, baseSpinRpm: 6400.0, rollFactor: 0.06 },
        "7i": { name: "7i", loft: 34.0, length: 37.0, smashFactor: 1.22, baseSpinRpm: 7200.0, rollFactor: 0.06 },
        "8i": { name: "8i", loft: 37.0, length: 36.5, smashFactor: 1.17, baseSpinRpm: 8000.0, rollFactor: 0.05 },
        "9i": { name: "9i", loft: 41.0, length: 36.0, smashFactor: 1.12, baseSpinRpm: 8800.0, rollFactor: 0.05 },
        "PW": { name: "PW", loft: 45.0, length: 35.5, smashFactor: 1.07, baseSpinRpm: 10200.0, rollFactor: 0.04 },
        "SW": { name: "SW", loft: 54.0, length: 35.0, smashFactor: 1.03, baseSpinRpm: 11800.0, rollFactor: 0.02 },
        "LW": { name: "LW", loft: 58.0, length: 35.0, smashFactor: 1.00, baseSpinRpm: 13500.0, rollFactor: 0.01 }
    },

    calculateLaunchParams: (input, club, manualAttackAngle = 0) => {
        const vClubMps = (input.clubSpeedMph * input.powerFactor) * 0.44704;
        const vBallMps = vClubMps * club.smashFactor * input.efficiency;

        const launchAngle = club.loft * (0.95 - club.loft * 0.005) + manualAttackAngle * 0.6;
        const speedRatio = vBallMps / 60.0;
        const spinLoft = Math.max(club.loft - manualAttackAngle, 10.0);
        const spinLoftFactor = spinLoft / club.loft;

        const backSpin = club.baseSpinRpm * speedRatio * spinLoftFactor;
        const sideSpin = (input.clubFaceAngle - input.pathDeviationDeg) * 180.0 * speedRatio;
        const horizontalLaunch = (input.pathDeviationDeg * 0.7) + (input.clubFaceAngle * 0.3);

        return {
            ballSpeedMps: vBallMps,
            launchAngleDeg: launchAngle,
            horizontalLaunchDeg: horizontalLaunch,
            sideSpinRpm: sideSpin,
            backSpinRpm: backSpin
        };
    },

    simulateTrajectory: (params, input, club) => {
        const path = [];
        const dt = 0.01;
        let t = 0.0;
        let x = 0.0, y = 0.0, z = 0.0;

        const launchRad = params.launchAngleDeg * Math.PI / 180;
        const yawRad = params.horizontalLaunchDeg * Math.PI / 180;

        let vx = params.ballSpeedMps * Math.cos(launchRad) * Math.cos(yawRad);
        let vy = params.ballSpeedMps * Math.sin(launchRad);
        let vz = params.ballSpeedMps * Math.cos(launchRad) * Math.sin(yawRad);

        let currentBackSpin = params.backSpinRpm;
        let currentSideSpin = params.sideSpinRpm;
        let maxY = 0.0;

        while (y >= 0.0 && t < 15.0) {
            path.push({ x, y, z });
            if (y > maxY) maxY = y;

            const v = Math.sqrt(vx * vx + vy * vy + vz * vz);
            if (v < 0.5) break;

            const omegaRad = (Math.sqrt(currentBackSpin ** 2 + currentSideSpin ** 2) * 2 * Math.PI) / 60.0;
            const spinParameter = (PhysicsEngine.RADIUS * omegaRad) / v;

            const cd_base = 0.20 + 0.25 / (1.0 + Math.exp(0.3 * (v - 35.0)));
            const cd_spin = 0.35 * Math.pow(spinParameter, 1.8);
            const cd = cd_base + cd_spin;

            const cl = 0.10 + 0.30 * (1.0 - Math.exp(-3.0 * spinParameter));

            const dragForce = 0.5 * PhysicsEngine.RHO * v * v * PhysicsEngine.AREA * cd;
            const liftForce = 0.5 * PhysicsEngine.RHO * v * v * PhysicsEngine.AREA * cl;

            const ax_drag = -(vx / v) * (dragForce / PhysicsEngine.MASS);
            const ay_drag = -(vy / v) * (dragForce / PhysicsEngine.MASS);
            const az_drag = -(vz / v) * (dragForce / PhysicsEngine.MASS);

            const totalSpin = Math.sqrt(currentBackSpin ** 2 + currentSideSpin ** 2) || 1.0;
            const liftRatioBack = currentBackSpin / totalSpin;
            const liftRatioSide = currentSideSpin / totalSpin;

            const ay_lift = (vx / v) * (liftForce / PhysicsEngine.MASS) * liftRatioBack;
            const az_lift = (vx / v) * (liftForce / PhysicsEngine.MASS) * liftRatioSide;

            vx += ax_drag * dt;
            vy += (ay_drag + ay_lift - PhysicsEngine.GRAVITY) * dt;
            vz += (az_drag + az_lift) * dt;

            x += vx * dt;
            y += vy * dt;
            z += vz * dt;

            currentBackSpin *= PhysicsEngine.SPIN_DECAY;
            currentSideSpin *= PhysicsEngine.SPIN_DECAY;
            t += dt;
        }

        if (y < 0) path.push({ x, y: 0.0, z });

        const roll = x * club.rollFactor * Math.max(0.0, Math.min(0.8, 1.0 - (maxY / 50.0)));

        return {
            path,
            clubHeadSpeedMph: input.clubSpeedMph * input.powerFactor,
            ballSpeedMph: params.ballSpeedMps / 0.44704,
            smashFactor: (params.ballSpeedMps / 0.44704) / Math.max(1.0, input.clubSpeedMph * input.powerFactor),
            launchAngle: params.launchAngleDeg,
            swingPath: input.pathDeviationDeg,
            faceToPath: input.clubFaceAngle - input.pathDeviationDeg,
            carryDistance: x,
            totalDistance: x + roll,
            rollDistance: roll,
            lateralDeviation: z,
            maxHeight: maxY,
            spinRpm: params.backSpinRpm,
            sideSpinRpm: params.sideSpinRpm,
            flightTimeSeconds: t
        };
    },

    calculatePutting: (targetDistance, slopeXDeg, slopeYDeg, aimAngleDeg = 0) => {
        const MU_STIMP_10 = 0.131;
        const DT = 0.01;
        const STOP_THRESHOLD = 0.01;
        const path = [];

        const thetaX = slopeXDeg * Math.PI / 180;
        const thetaY = slopeYDeg * Math.PI / 180;
        const phiAim = aimAngleDeg * Math.PI / 180;

        const v0 = Math.sqrt(2 * MU_STIMP_10 * PhysicsEngine.GRAVITY * targetDistance);
        let vx = v0 * Math.sin(phiAim);
        let vy = v0 * Math.cos(phiAim);

        let x = 0.0, y = 0.0, t = 0.0;
        const ax_slope = PhysicsEngine.GRAVITY * Math.sin(thetaX);
        const ay_slope = -PhysicsEngine.GRAVITY * Math.sin(thetaY);

        let totalDistTraveled = 0.0;

        while (t < 10.0) {
            path.push({ x, y, z: 0.0 });

            const v = Math.sqrt(vx * vx + vy * vy);
            if (v < STOP_THRESHOLD && t > 0.1) break;

            const cosTheta = Math.cos(Math.sqrt(thetaX ** 2 + thetaY ** 2));
            const frictionAcc = MU_STIMP_10 * PhysicsEngine.GRAVITY * cosTheta;

            const ax_fric = v > 0 ? -(vx / v) * frictionAcc : 0.0;
            const ay_fric = v > 0 ? -(vy / v) * frictionAcc : 0.0;

            const ax_total = ax_fric + ax_slope;
            const ay_total = ay_fric + ay_slope;

            vx += ax_total * DT;
            vy += ay_total * DT;

            const dx = vx * DT;
            const dy = vy * DT;
            x += dx;
            y += dy;

            totalDistTraveled += Math.sqrt(dx * dx + dy * dy);
            t += DT;

            if (Math.sqrt(vx * vx + vy * vy) < STOP_THRESHOLD && t > 0.1) break;
        }

        return {
            path,
            totalDistance: totalDistTraveled,
            finalX: x,
            finalY: y,
            residualSpeed: Math.sqrt(vx * vx + vy * vy)
        };
    }
};
