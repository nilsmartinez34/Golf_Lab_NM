const PhysicsEngine = require('../js/physics_ultimate.js');

describe('Physics Engine Ultimate Test Suite', () => {

    const clubs = Object.keys(PhysicsEngine.GOLF_BAG);

    // --- CONFIGURATIONS ---
    const standardWeather = { name: 'SeaLevelNoWind', altitude: 0, temp: 20, windSpeed: 0, windDir: 0 };

    const weatherScenarios = [
        { name: 'SeaLevelNoWind', altitude: 0, temp: 20, windSpeed: 0, windDir: 0 },
        { name: 'SeaLevelBackWind_10ms', altitude: 0, temp: 20, windSpeed: 10, windDir: 0 },
        { name: 'SeaLevelBackWind_20ms', altitude: 0, temp: 20, windSpeed: 20, windDir: 0 },
        { name: 'SeaLevelFrontWind_10ms', altitude: 0, temp: 20, windSpeed: 10, windDir: 180 },
        { name: 'SeaLevelFrontWind_20ms', altitude: 0, temp: 20, windSpeed: 20, windDir: 180 },
        { name: 'SeaLevelSideWind_10ms', altitude: 0, temp: 20, windSpeed: 10, windDir: 90 },
        { name: 'SeaLevelSideWind_20ms', altitude: 0, temp: 20, windSpeed: 20, windDir: 270 },
        { name: 'HighAltitude_NoWind', altitude: 2500, temp: 0, windSpeed: 0, windDir: 0 }
    ];

    const trajectories = [
        { name: 'Straight', face: 0, path: 0, expectSide: 'center' },

        { name: 'Pull Straight', face: -5, path: -5, expectSide: 'left' },
        { name: 'Pull Hook', face: -10, path: -5, expectSide: 'left' }, // Fermé fort
        { name: 'Pull Slice', face: 0, path: -5, expectSide: 'variable' }, // Départ gauche, retour droite

        { name: 'Push Straight', face: 5, path: 5, expectSide: 'right' },
        { name: 'Push Hook', face: 0, path: 5, expectSide: 'variable' }, // Départ droite, retour gauche
        { name: 'Push Slice', face: 10, path: 5, expectSide: 'right' }, // Ouvert fort

        { name: 'Straight Hook', face: -5, path: 0, expectSide: 'left' },
        { name: 'Straight Slice', face: 5, path: 0, expectSide: 'right' }
    ];

    const speedMap = {
        'Dr': 105, '3W': 100,
        '4i': 92, '5i': 90, '6i': 88, '7i': 85,
        '8i': 82, '9i': 80, 'PW': 78, 'SW': 75, 'LW': 72
    };

    // --- SUITE 1 : COHÉRENCE DES TRAJECTOIRES (Conditions Idéales) ---
    describe('1. Trajectory Consistency Matrix (Sea Level / No Wind)', () => {
        clubs.forEach(clubKey => {
            describe(`Club: ${clubKey} (${speedMap[clubKey]} mph)`, () => {
                trajectories.forEach(shot => {
                    test(`Shot: ${shot.name}`, () => {
                        const club = PhysicsEngine.GOLF_BAG[clubKey];
                        const input = {
                            clubSpeedMph: speedMap[clubKey],
                            powerFactor: 1,
                            efficiency: 1,
                            clubFaceAngle: shot.face,
                            pathDeviationDeg: shot.path
                        };

                        const params = PhysicsEngine.calculateLaunchParams(input, club);
                        const result = PhysicsEngine.simulateTrajectory(params, standardWeather);

                        // 1. Validité basique
                        expect(result.carryDistance).toBeGreaterThan(10);
                        expect(result.totalDistance).toBeGreaterThanOrEqual(result.carryDistance);
                        expect(result.maxHeight).toBeGreaterThan(0);

                        // 2. Vérification Directionnelle (Simplifiée)
                        if (shot.expectSide === 'left') {
                            expect(result.lateralDeviation).toBeLessThan(0);
                        } else if (shot.expectSide === 'right') {
                            expect(result.lateralDeviation).toBeGreaterThan(0);
                        } else if (shot.expectSide === 'center') {
                            expect(Math.abs(result.lateralDeviation)).toBeLessThan(1.0); // Tolérance 1m
                        }
                    });
                });
            });
        });
    });

    // --- SUITE 2 : PHYSIQUE ATMOSPHÉRIQUE (Driver Uniquement) ---
    describe('2. Weather Physics Check (Driver - Straight Shot)', () => {
        const clubKey = 'Dr';
        const club = PhysicsEngine.GOLF_BAG[clubKey];
        const input = {
            clubSpeedMph: 105,
            powerFactor: 1,
            efficiency: 1,
            clubFaceAngle: 0,
            pathDeviationDeg: 0
        };
        const params = PhysicsEngine.calculateLaunchParams(input, club);

        // On stocke la référence sans vent pour comparer
        let baseDist = 0;

        test('Reference: No Wind', () => {
            const res = PhysicsEngine.simulateTrajectory(params, weatherScenarios[0]);
            baseDist = res.carryDistance;
            expect(baseDist).toBeGreaterThan(200);
        });

        test('Tailwind should increase carry', () => {
            const res = PhysicsEngine.simulateTrajectory(params, weatherScenarios[1]); // 5ms back
            expect(res.carryDistance).toBeGreaterThan(baseDist);
        });

        test('Strong Tailwind should increase carry significantly', () => {
            const res5 = PhysicsEngine.simulateTrajectory(params, weatherScenarios[1]);
            const res20 = PhysicsEngine.simulateTrajectory(params, weatherScenarios[2]);
            expect(res20.carryDistance).toBeGreaterThan(res5.carryDistance);
        });

        test('Headwind should decrease carry', () => {
            const res = PhysicsEngine.simulateTrajectory(params, weatherScenarios[3]); // 5ms front
            expect(res.carryDistance).toBeLessThan(baseDist);
        });

        test('Headwind penalty should be stronger than Tailwind bonus (Asymmetry)', () => {
            const tailRes = PhysicsEngine.simulateTrajectory(params, weatherScenarios[2]); // 20ms Back
            const headRes = PhysicsEngine.simulateTrajectory(params, weatherScenarios[4]); // 20ms Front

            const tailGain = tailRes.carryDistance - baseDist;
            const headLoss = baseDist - headRes.carryDistance;

            // En aérodynamique, la traînée au carré fait que le vent de face punit plus
            // que le vent de dos n'aide.
            expect(headLoss).toBeGreaterThan(tailGain);
        });

        test('High Altitude should increase distance', () => {
            const seaRes = PhysicsEngine.simulateTrajectory(params, weatherScenarios[0]);
            const highRes = PhysicsEngine.simulateTrajectory(params, weatherScenarios[7]); // 2500m
            expect(highRes.carryDistance).toBeGreaterThan(seaRes.carryDistance);
        });
    });
});