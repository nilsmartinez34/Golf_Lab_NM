const PhysicsEngine = require('../physics_ultimate');

describe('PhysicsEngine Exhaustive Suite - 9 Trajectories', () => {

    const clubs = Object.keys(PhysicsEngine.GOLF_BAG);

    const weatherScenarios = [
        { name: 'SeaLevelNoWind', altitude: 0, temp: 20, windSpeed: 0, windDir: 0 },
        { name: 'SeaLevelBackWind', altitude: 0, temp: 20, windSpeed: 5, windDir: 0 },
        { name: 'SeaLevelFrontWind', altitude: 0, temp: 20, windSpeed: 5, windDir: 180 },
        { name: 'SeaLevelLeftWind', altitude: 0, temp: 20, windSpeed: 5, windDir: 90 },
        { name: 'SeaLevelRightWind', altitude: 0, temp: 20, windSpeed: 5, windDir: 270 },

        { name: 'HighAltitudeNoWind', altitude: 2500, temp: 0, windSpeed: 0, windDir: 0 },
        { name: 'HighAltitudeBackWind', altitude: 2500, temp: 0, windSpeed: 5, windDir: 0 },
        { name: 'HighAltitudeFrontWind', altitude: 2500, temp: 0, windSpeed: 5, windDir: 180 },
        { name: 'HighAltitudeLeftWind', altitude: 2500, temp: 0, windSpeed: 5, windDir: 90 },
        { name: 'HighAltitudeRightWind', altitude: 2500, temp: 0, windSpeed: 5, windDir: 270 }
    ];

    // Les 9 trajectoires possibles
    const shots = [
        { name: 'Straight', face: 0, path: 0 },

        { name: 'Pull Straight', face: -5, path: -5 },
        { name: 'Pull Hook', face: -10, path: -5 },
        { name: 'Pull Slice', face: 0, path: -5 },

        { name: 'Push Straight', face: 5, path: 5 },
        { name: 'Push Hook', face: 0, path: 5 },
        { name: 'Push Slice', face: 10, path: 5 },

        { name: 'Straight Hook', face: -5, path: 0 },
        { name: 'Straight Slice', face: 5, path: 0 }
    ];
    const speedMap = {
        'Dr': 105, '3W': 100,
        '4i': 92, '5i': 90, '6i': 88, '7i': 85,
        '8i': 82, '9i': 80, 'PW': 78, 'SW': 75, 'LW': 72
    };

    describe('9 Trajectories Matrix', () => {
        clubs.forEach(clubKey => {
            weatherScenarios.forEach(weather => {
                shots.forEach(shot => {
                    test(`Club: ${clubKey} | Weather: ${weather.name} | Shot: ${shot.name}`, () => {
                        const club = PhysicsEngine.GOLF_BAG[clubKey];
                        const input = {
                            clubSpeedMph: speedMap[clubKey] || 90,
                            powerFactor: 1,
                            efficiency: 1,
                            clubFaceAngle: shot.face,
                            pathDeviationDeg: shot.path
                        };

                        const params = PhysicsEngine.calculateLaunchParams(input, club);
                        const trajectory = PhysicsEngine.simulateTrajectory(params, weather);

                        expect(trajectory.carryDistance).toBeGreaterThan(0);
                        expect(trajectory.maxHeight).toBeGreaterThan(0);

                        // Vérification basique de la direction latérale
                        if (shot.name === 'Push Straight') {
                            expect(trajectory.lateralDeviation).toBeGreaterThan(0);
                        } else if (shot.name === 'Pull Straight') {
                            expect(trajectory.lateralDeviation).toBeLessThan(0);
                        }
                    });
                });
            });
        });
    });
});