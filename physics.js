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

    // NEW: Helper to calculate air density based on altitude and temperature
    calculateAirDensity: (altitude, tempCelsius) => {
        const P0 = 101325; // Sea level pressure (Pa)
        const T0 = 288.15; // Sea level standard temperature (K)
        const g = 9.80665;
        const L = 0.0065;  // Temperature lapse rate (K/m)
        const R = 8.31447; // Universal gas constant
        const M = 0.0289644; // Molar mass of dry air (kg/mol)

        const T = (tempCelsius + 273.15); // Local temperature (K)
        // Barometric formula for pressure at altitude
        const P = P0 * Math.pow(1 - (L * altitude) / T0, (g * M) / (R * L));
        // Ideal gas law for density
        const rho = (P * M) / (R * T);
        return rho;
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


    simulateTrajectory: (params, input, club, weather = { altitude: 0, temp: 20, windSpeed: 0, windDir: 0 }) => {
        const path = [];
        const dt = 0.01; // Pas de temps en secondes
        let t = 0.0;
        let x = 0.0, y = 0.0, z = 0.0; // Position initiale

        const launchRad = params.launchAngleDeg * Math.PI / 180;
        const yawRad = params.horizontalLaunchDeg * Math.PI / 180;

        // Vecteurs vitesse initiaux
        let vx = params.ballSpeedMps * Math.cos(launchRad) * Math.cos(yawRad);
        let vy = params.ballSpeedMps * Math.sin(launchRad);
        let vz = params.ballSpeedMps * Math.cos(launchRad) * Math.sin(yawRad);

        // Paramètres Vent
        const windMpsBase = (weather.windSpeed / 3.6);
        const windRad = (weather.windDir * Math.PI / 180);
        const vWindXBase = windMpsBase * Math.cos(windRad);
        const vWindZBase = windMpsBase * Math.sin(windRad);

        // Densité de l'air locale
        const rho = PhysicsEngine.calculateAirDensity(weather.altitude, weather.temp);

        let currentBackSpin = params.backSpinRpm;
        let currentSideSpin = params.sideSpinRpm;
        let maxY = 0.0;

        // Fonction pour calculer les forces (pour la méthode de Runge-Kutta)
        const calculateAccelerations = (currVx, currVy, currVz, currY, currBackSpin, currSideSpin) => {

            // 1. Wind Shear Profile (le vent augmente avec l'altitude Y)
            // Utilisation d'une loi de puissance simple pour le profil de vent
            const windSpeedAtY = windMpsBase * Math.pow(Math.max(currY, 0.5) / 10, 0.15);
            const vWindX = windSpeedAtY * Math.cos(windRad);
            const vWindZ = windSpeedAtY * Math.sin(windRad);

            // 2. Vitesse relative
            const vRelX = currVx - vWindX;
            const vRelY = currVy;
            const vRelZ = currVz - vWindZ;
            const vRel = Math.sqrt(vRelX * vRelX + vRelY * vRelY + vRelZ * vRelZ);

            if (vRel < 0.1) return { ax: 0, ay: -PhysicsEngine.GRAVITY, az: 0 };

            // 3. Coefficients Aérodynamiques (Cd, Cl)
            const omega = Math.sqrt(currBackSpin * currBackSpin + currSideSpin * currSideSpin) * (2 * Math.PI / 60);
            const spinParameter = (PhysicsEngine.RADIUS * omega) / Math.max(vRel, 1.0);

            // Cd dépend de la vitesse (Reynolds number) et du spin
            // Amélioration: Légère modification des constantes pour mieux coller aux balles modernes
            const cd_base = 0.18 + 0.22 / (1.0 + Math.exp(0.3 * (vRel - 35.0)));
            const cd_spin = 0.35 * Math.pow(spinParameter, 1.8);
            const cd = cd_base + cd_spin;

            // Cl (Lift coefficient) - AMÉLIORATION RÉALISME
            // Réduction de la constante de base (0.06) et augmentation de la dépendance au spin
            // pour que la portance chute drastiquement quand vRel diminue (vent dans le dos)

            const cl = 0.08 + 0.40 * (1.0 - Math.exp(-2.0 * spinParameter));

            // 4. Forces
            const dragForce = 0.5 * rho * vRel * vRel * PhysicsEngine.AREA * cd;
            const liftForce = 0.5 * rho * vRel * vRel * PhysicsEngine.AREA * cl;

            // Directions
            const dragDirX = -vRelX / vRel;
            const dragDirY = -vRelY / vRel;
            const dragDirZ = -vRelZ / vRel;

            // Lift direction est complexe (perpendiculaire à vRel et à l'axe de spin)
            // Approximation par composantes
            const totalSpin = Math.sqrt(currBackSpin * currBackSpin + currSideSpin * currSideSpin) || 1.0;
            const liftDirBackX = -vRelY / Math.sqrt(vRelX * vRelX + vRelY * vRelY);
            const liftDirBackY = vRelX / Math.sqrt(vRelX * vRelX + vRelY * vRelY);

            // Calcul final accélérations
            const ax = (dragForce * dragDirX) / PhysicsEngine.MASS;
            const ay = (dragForce * dragDirY) / PhysicsEngine.MASS - PhysicsEngine.GRAVITY;
            const az = (dragForce * dragDirZ) / PhysicsEngine.MASS;

            // Ajout du Lift (Magnus effect)
            if (totalSpin > 0) {
                // Simplification: le lift agit principalement vers le haut pour le backspin
                // et latéralement pour le sidespin
                // liftDirBack: Perpendiculaire à vRel dans le plan vertical de tir
                // liftDirSide: Perpendiculaire à vRel dans le plan horizontal de tir
                return {
                    ax: ax + (liftForce * (currBackSpin / totalSpin) * liftDirBackX) / PhysicsEngine.MASS,
                    ay: ay + (liftForce * (currBackSpin / totalSpin) * liftDirBackY) / PhysicsEngine.MASS,
                    az: az + (liftForce * (currSideSpin / totalSpin) * dragDirX) / PhysicsEngine.MASS // Approximation sidespin
                };
            }

            return { ax, ay, az };
        };

        // --- Boucle de Simulation (Runge-Kutta 2nd Order) ---
        while (y >= 0.0 && t < 15.0) {
            path.push({ x, y, z });
            if (y > maxY) maxY = y;

            // Étape 1 : Calcul des accélérations au début du pas (Euler)
            let acc1 = calculateAccelerations(vx, vy, vz, y, currentBackSpin, currentSideSpin);

            // Étape 2 : Position et vitesse intermédiaires (Midpoint)
            let midVx = vx + acc1.ax * dt / 2;
            let midVy = vy + acc1.ay * dt / 2;
            let midVz = vz + acc1.az * dt / 2;
            let midY = y + vy * dt / 2;

            // Étape 3 : Accélérations au point intermédiaire
            let acc2 = calculateAccelerations(midVx, midVy, midVz, midY, currentBackSpin, currentSideSpin);

            // Étape 4 : Mise à jour finale position et vitesse
            x += midVx * dt;
            y += midVy * dt;
            z += midVz * dt;

            vx += acc2.ax * dt;
            vy += acc2.ay * dt;
            vz += acc2.az * dt;

            // Décroissance du spin (plus rapide si la traînée est forte)
            currentBackSpin *= PhysicsEngine.SPIN_DECAY;
            currentSideSpin *= PhysicsEngine.SPIN_DECAY;
            t += dt;
        }

        // ... (calcul du roll et retour identique)
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsEngine;
}
