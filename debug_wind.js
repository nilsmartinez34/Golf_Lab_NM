const PhysicsEngine = require('./physics_ultimate.js');
const club = PhysicsEngine.GOLF_BAG['PW'];
const params = PhysicsEngine.calculateLaunchParams({ clubSpeedMph: 25, efficiency: 1, powerFactor: 1, pathDeviationDeg: 0, clubFaceAngle: 0 }, club);

const noWind = PhysicsEngine.simulateChipping(params, { windSpeed: 0 }, 10);
const headWind = PhysicsEngine.simulateChipping(params, { windSpeed: 40, windDir: 180 }, 10);

console.log("No Wind Carry:", noWind.carryDistance);
console.log("No Wind Path Duration:", noWind.path.length * 0.01, "s");
if (noWind.path.length > 0) {
    const last = noWind.path[noWind.path.length - 1];
    console.log("No Wind Final Pos:", last.x.toFixed(4), last.y.toFixed(4), last.z.toFixed(4));
}

console.log("Headwind Carry:", headWind.carryDistance);
console.log("Headwind Path Duration:", headWind.path.length * 0.01, "s");
if (headWind.path.length > 0) {
    const last = headWind.path[headWind.path.length - 1];
    console.log("Headwind Final Pos:", last.x.toFixed(4), last.y.toFixed(4), last.z.toFixed(4));
}
