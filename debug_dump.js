const PhysicsEngine = require('./physics_ultimate.js');
const club = PhysicsEngine.GOLF_BAG['PW'];
const params = PhysicsEngine.calculateLaunchParams({ clubSpeedMph: 25, efficiency: 1, powerFactor: 1, pathDeviationDeg: 0, clubFaceAngle: 0 }, club);

const noWind = PhysicsEngine.simulateChipping(params, { windSpeed: 0 }, 10);
console.log("No Wind Result Keys:", Object.keys(noWind));
console.log("noWind.carryDistance:", noWind.carryDistance);
console.log("noWind.totalDistance:", noWind.totalDistance);
console.log("noWind.maxHeight:", noWind.maxHeight);
console.log("noWind.ballSpeedMph:", noWind.ballSpeedMph);

const last = noWind.path[noWind.path.length - 1];
console.log("Path Length:", noWind.path.length);
console.log("Last X:", last.x);

// Let's also check if calculateLaunchParams returns something weird
console.log("Launch Angle:", params.launchAngleDeg);
console.log("Ball Speed Mps:", params.ballSpeedMps);
