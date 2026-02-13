const PhysicsEngine = require('../js/physics_ultimate.js');

describe('Chipping Engine Matrix Analysis', () => {

    // --- CONFIGURATIONS DE TEST ---
    const standardWeather = { altitude: 0, temp: 20, windSpeed: 0, windDir: 0 };
    const clubSpeeds = [10, 20, 30, 40]; // mph (Vitesse typique petit jeu)
    const greenSpeeds = [8, 10, 12];     // Stimp (Lent, Standard, Rapide)

    // Clubs spécifiques au chipping
    const chippingWedges = ['PW', 'SW', 'LW', '7i', 'Put'];

    // --- SUITE 1 : MATRICE DE GRADUATION DU SAC (LOFT vs DISTANCE) ---
    describe('1. Bag Graduation Matrix (Stimp 10 / Center Ball)', () => {
        chippingWedges.forEach(clubKey => {
            describe(`Club: ${clubKey}`, () => {
                clubSpeeds.forEach(speed => {
                    test(`Speed: ${speed} mph`, () => {
                        const club = PhysicsEngine.GOLF_BAG[clubKey];
                        const input = {
                            clubSpeedMph: speed,
                            powerFactor: 1,
                            efficiency: 1,
                            clubFaceAngle: 0,
                            pathDeviationDeg: 0
                        };

                        const params = PhysicsEngine.calculateLaunchParams(input, club);
                        const result = PhysicsEngine.simulateChipping(params, standardWeather, 10);

                        // Vérification de la cohérence physique
                        expect(result.totalDistance).toBeGreaterThan(result.carryDistance);
                        expect(result.maxHeight).toBeGreaterThan(0);

                        // Logique de sac : Le LW doit toujours voler plus haut que le PW à vitesse égale
                        if (clubKey === 'LW') {
                            const pwParams = PhysicsEngine.calculateLaunchParams(input, PhysicsEngine.GOLF_BAG['PW']);
                            const pwRes = PhysicsEngine.simulateChipping(pwParams, standardWeather, 10);
                            expect(result.maxHeight).toBeGreaterThan(pwRes.maxHeight);
                        }
                    });
                });
            });
        });
    });

    // --- SUITE 2 : SENSIBILITÉ AUX SURFACES (STIMP METER) ---
    describe('2. Green Speed Sensitivity (SW @ 20mph)', () => {
        const club = PhysicsEngine.GOLF_BAG['SW'];
        const input = { clubSpeedMph: 20, powerFactor: 1, efficiency: 1, clubFaceAngle: 0, pathDeviationDeg: 0 };
        const params = PhysicsEngine.calculateLaunchParams(input, club);

        test('Roll distance must increase with Stimp', () => {
            const slow = PhysicsEngine.simulateChipping(params, standardWeather, 8);
            const med = PhysicsEngine.simulateChipping(params, standardWeather, 10);
            const fast = PhysicsEngine.simulateChipping(params, standardWeather, 12);

            expect(med.rollDistance).toBeGreaterThan(slow.rollDistance);
            expect(fast.rollDistance).toBeGreaterThan(med.rollDistance);
        });

        test('Carry should remain identical regardless of green speed', () => {
            const slow = PhysicsEngine.simulateChipping(params, standardWeather, 6);
            const fast = PhysicsEngine.simulateChipping(params, standardWeather, 14);
            expect(slow.carryDistance).toBe(fast.carryDistance);
        });
    });

    // --- SUITE 3 : INFLUENCE DE LA TECHNIQUE (BALL POSITION) ---
    describe('3. Technique Impact: Ball Position (PW @ 25mph)', () => {
        const club = PhysicsEngine.GOLF_BAG['PW'];
        const input = { clubSpeedMph: 25, powerFactor: 1, efficiency: 1, clubFaceAngle: 0, pathDeviationDeg: 0 };

        test('Balle arrière (-15cm) : Trajectoire basse / Plus de roule', () => {
            const posBack = -15;
            const paramsBack = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle + (posBack * 0.5));
            paramsBack.launchAngleDeg += (posBack * 0.5);
            const resBack = PhysicsEngine.simulateChipping(paramsBack, standardWeather, 10);

            const paramsMid = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle);
            const resMid = PhysicsEngine.simulateChipping(paramsMid, standardWeather, 10);

            // La balle arrière réduit le loft -> Trajectoire plus tendue
            expect(resBack.maxHeight).toBeLessThan(resMid.maxHeight);
            expect(resBack.rollDistance).toBeGreaterThan(resMid.rollDistance);
        });

        test('Balle avant (+15cm) : Trajectoire haute / Stop plus rapide', () => {
            const posFront = 15;
            const paramsFront = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle + (posFront * 0.5));
            paramsFront.launchAngleDeg += (posFront * 0.5);
            const resFront = PhysicsEngine.simulateChipping(paramsFront, standardWeather, 10);

            const paramsMid = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle);
            const resMid = PhysicsEngine.simulateChipping(paramsMid, standardWeather, 10);

            expect(resFront.maxHeight).toBeGreaterThan(resMid.maxHeight);
            // Plus de hauteur et de spin (théorique) = moins de roule
            expect(resFront.rollDistance).toBeLessThan(resMid.rollDistance);
        });
    });

    // --- SUITE 4 : CAS LIMITES (EDGE CASES) ---
    describe('4. Edge Cases and Safety', () => {
        test('Very low power (5mph) should still register a shot', () => {
            const club = PhysicsEngine.GOLF_BAG['SW'];
            const params = PhysicsEngine.calculateLaunchParams({ clubSpeedMph: 5, efficiency: 1, powerFactor: 1, clubFaceAngle: 0, pathDeviationDeg: 0 }, club);
            const res = PhysicsEngine.simulateChipping(params, standardWeather, 10);
            expect(res.totalDistance).toBeGreaterThan(0);
        });

        test('Extreme wind on a chip should have minimal but non-zero effect', () => {
            const club = PhysicsEngine.GOLF_BAG['PW'];
            const params = PhysicsEngine.calculateLaunchParams({ clubSpeedMph: 20, efficiency: 1, powerFactor: 1, clubFaceAngle: 0, pathDeviationDeg: 0 }, club);

            const noWind = PhysicsEngine.simulateChipping(params, { windSpeed: 0 }, 10);
            const hurricane = PhysicsEngine.simulateChipping(params, { windSpeed: 100, windDir: 180 }, 10); // 100km/h face

            expect(hurricane.carryDistance).toBeLessThan(noWind.carryDistance);
        });
    });
});