const PhysicsEngine = require('../physics_ultimate');
const fs = require('fs');

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

let report = "# Rapport de Test Physique Exhaustif - V8 (Modern/Power Specs)\n\n";
report += "Ce rapport présente les résultats détaillés de la simulation pour chaque club, scénario météo et type de coup.\n\n";
report += "> [!NOTE]\n";
report += "> **Moteur Physique V2** : Tuning \"Juste Milieu\" (Lift Base 0.09) + Spin Factor 5.5.\n";
report += "> **Vitesse Club** : Variable selon le club (Dr: 105 MPH ... LW: 72 MPH).\n";
report += "> **Vent** : 5 m/s (18 km/h) pour les tests venteux.\n\n";

report += "## Index des Clubs & Vitesses\n";
clubs.forEach(k => {
    const club = PhysicsEngine.GOLF_BAG[k];
    const speed = speedMap[k] || 90;
    let info = `- **${k}**: Speed ${speed} MPH, Loft ${club.loft}°, Smash ${club.smashFactor}`;
    if (club.attackAngle !== undefined) info += `, AoA ${club.attackAngle}°`;
    report += info + "\n";
});
report += "\n---\n\n";

clubs.forEach(clubKey => {
    const club = PhysicsEngine.GOLF_BAG[clubKey];
    report += `## Club: ${clubKey}\n\n`;
    report += "| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |\n";
    report += "| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |\n";

    weatherScenarios.forEach(weather => {
        shots.forEach(shot => {
            const input = {
                clubSpeedMph: speedMap[clubKey] || 90,
                powerFactor: 1,
                efficiency: 1,
                clubFaceAngle: shot.face,
                pathDeviationDeg: shot.path
            };

            const params = PhysicsEngine.calculateLaunchParams(input, club);
            const traj = PhysicsEngine.simulateTrajectory(params, weather);

            const spinDisplay = `${params.backSpinRpm.toFixed(0)}/${params.sideSpinRpm.toFixed(0)}`;

            report += `| ${weather.name} | ${shot.name} | ${params.launchAngleDeg.toFixed(1)}° | **${traj.carryDistance.toFixed(1)}** | ${traj.totalDistance.toFixed(1)} | ${traj.maxHeight.toFixed(1)} | ${spinDisplay} | ${traj.lateralDeviation.toFixed(1)} |\n`;
        });
    });
    report += "\n---\n\n";
});

fs.writeFileSync('test_report_exhaustif.md', report);
console.log('Rapport généré avec succès dans test_report_exhaustif.md');
