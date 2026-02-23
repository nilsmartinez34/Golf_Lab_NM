const PhysicsEngine = require('./js/physics_ultimate.js');

function formatNum(num) {
    if (num === undefined || num === null) return '-';
    return (Math.round(num * 100) / 100).toFixed(2);
}

const standardWeather = { name: 'SeaLevelNoWind', altitude: 0, temp: 20, windSpeed: 0, windDir: 0 };
const speedMap = {
    'Dr': 105, '3W': 100,
    '4i': 92, '5i': 90, '6i': 88, '7i': 85,
    '8i': 82, '9i': 80, 'PW': 78, 'SW': 75, 'LW': 72, 'Put': 5
};
const trajectories = [
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

console.log("# Detailed Test Data\n");

// --- PHYSICS ENGINE DATA ---
console.log("## 1. Physics Engine Matrix Data (Sea Level, No Wind)\n");

const clubs = Object.keys(PhysicsEngine.GOLF_BAG);

clubs.forEach(clubKey => {
    console.log(`### Club: ${clubKey} (${speedMap[clubKey]} mph)`);
    console.log("| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |");
    console.log("| :--- | :---: | :---: | :---: | :---: |");

    trajectories.forEach(shot => {
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

        console.log(`| ${shot.name} | ${formatNum(result.carryDistance)} | ${formatNum(result.totalDistance)} | ${formatNum(result.maxHeight)} | ${formatNum(result.lateralDeviation)} |`);
    });
    console.log("\n");
});

// --- CHIPPING DATA ---
console.log("## 2. Chipping Engine Matrix Data (Stimp 10)\n");

const chippingWedges = ['PW', 'SW', 'LW', '7i', 'Put'];
const chippingSpeeds = [10, 20, 30, 40];

chippingWedges.forEach(clubKey => {
    console.log(`### Short Game: ${clubKey}`);
    console.log("| Impact Speed | Carry (m) | Roll (m) | Total (m) | Max Height (m) |");
    console.log("| :--- | :---: | :---: | :---: | :---: |");

    chippingSpeeds.forEach(speed => {
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

        console.log(`| ${speed} mph | ${formatNum(result.carryDistance)} | ${formatNum(result.rollDistance)} | ${formatNum(result.totalDistance)} | ${formatNum(result.maxHeight)} |`);
    });
    console.log("\n");
});

// --- WEATHER DATA ---
console.log("## 3. Environmental Impact Data (Driver, Straight)\n");
const weatherScenarios = [
    { name: 'Sea Level (Ref)', altitude: 0, temp: 20, windSpeed: 0, windDir: 0 },
    { name: 'Tailwind 10ms', altitude: 0, temp: 20, windSpeed: 10, windDir: 0 },
    { name: 'Tailwind 20ms', altitude: 0, temp: 20, windSpeed: 20, windDir: 0 },
    { name: 'Headwind 10ms', altitude: 0, temp: 20, windSpeed: 10, windDir: 180 },
    { name: 'Headwind 20ms', altitude: 0, temp: 20, windSpeed: 20, windDir: 180 },
    { name: 'High Altitude (2500m)', altitude: 2500, temp: 0, windSpeed: 0, windDir: 0 }
];

console.log("| Scenario | Carry (m) | Total (m) | Height (m) | Effect vs Ref |");
console.log("| :--- | :---: | :---: | :---: | :---: |");

const drClub = PhysicsEngine.GOLF_BAG['Dr'];
const drInput = { clubSpeedMph: 105, powerFactor: 1, efficiency: 1, clubFaceAngle: 0, pathDeviationDeg: 0 };
const drParams = PhysicsEngine.calculateLaunchParams(drInput, drClub);
const refRes = PhysicsEngine.simulateTrajectory(drParams, weatherScenarios[0]);

weatherScenarios.forEach(w => {
    const res = PhysicsEngine.simulateTrajectory(drParams, w);
    const diff = res.carryDistance - refRes.carryDistance;
    const diffStr = diff === 0 ? "-" : (diff > 0 ? "+" : "") + formatNum(diff) + "m";
    console.log(`| ${w.name} | ${formatNum(res.carryDistance)} | ${formatNum(res.totalDistance)} | ${formatNum(res.maxHeight)} | ${diffStr} |`);
});
