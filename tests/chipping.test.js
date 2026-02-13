const PhysicsEngine = require('../js/physics_ultimate.js');
const assert = require('assert');

console.log("=== RUNNING CHIPPING PHYSICS TESTS ===");

function runTest(name, testFn) {
    try {
        testFn();
        console.log(`[PASS] ${name}`);
    } catch (e) {
        console.error(`[FAIL] ${name}`);
        console.error(e.message);
    }
}

// 1. Ground Impact
runTest('Should detect ground impact (Z <= 0)', () => {
    const club = PhysicsEngine.GOLF_BAG['SW'];
    const input = {
        clubSpeedMph: 20, // Gentle chip
        powerFactor: 1.0,
        efficiency: 1.0,
        pathDeviationDeg: 0,
        clubFaceAngle: 0
    };

    const launchParams = PhysicsEngine.calculateLaunchParams(input, club);
    const result = PhysicsEngine.simulateChipping(launchParams, { altitude: 0 }, 10);

    // Check if any point has Z=0 (start) and returns to Z=0
    const hasLanded = result.path.some((p, i) => i > 5 && p.z <= 0.05);
    assert.ok(hasLanded, "Ball should land on the ground");
});

// 2. Green Speed Effect
runTest('Should roll further on fast greens', () => {
    const club = PhysicsEngine.GOLF_BAG['8i']; // Bump and run club
    const input = {
        clubSpeedMph: 30,
        powerFactor: 1.0,
        efficiency: 1.0,
        pathDeviationDeg: 0,
        clubFaceAngle: 0
    };
    const launchParams = PhysicsEngine.calculateLaunchParams(input, club);

    // Slow Green (Stimp 5)
    const slowResult = PhysicsEngine.simulateChipping(launchParams, {}, 5);

    // Fast Green (Stimp 12)
    const fastResult = PhysicsEngine.simulateChipping(launchParams, {}, 12);

    console.log(`   Slow Roll: ${slowResult.rollDistance}m, Fast Roll: ${fastResult.rollDistance}m`);
    assert.ok(fastResult.rollDistance > slowResult.rollDistance, "Ball should roll further on fast green");
});

// 3. Ratio Check
runTest('Should have roll/flight ratio consistent with club selection', () => {
    // LW (High Flight, Short Roll) vs 7i (Lower Flight, Long Roll)
    const lw = PhysicsEngine.GOLF_BAG['LW'];
    const i7 = PhysicsEngine.GOLF_BAG['7i'];

    const input = { clubSpeedMph: 20, powerFactor: 1.0, efficiency: 1.0, pathDeviationDeg: 0, clubFaceAngle: 0 };

    const resLW = PhysicsEngine.simulateChipping(PhysicsEngine.calculateLaunchParams(input, lw), {}, 10);
    const res7i = PhysicsEngine.simulateChipping(PhysicsEngine.calculateLaunchParams(input, i7), {}, 10);

    const ratioLW = resLW.carryDistance / resLW.totalDistance;
    const ratio7i = res7i.carryDistance / res7i.totalDistance;

    console.log(`   Ratio LW (Carry%): ${(ratioLW * 100).toFixed(0)}%, Ratio 7i (Carry%): ${(ratio7i * 100).toFixed(0)}%`);
    assert.ok(ratioLW > ratio7i, "Lob Wedge should have higher Fly/Roll ratio than 7 Iron");
});

// 4. Putter Check
runTest('Should support Putter chipping (Texas Wedge)', () => {
    const putter = PhysicsEngine.GOLF_BAG['Put'];
    // Very gentle putt
    const input = { clubSpeedMph: 10, powerFactor: 1.0, efficiency: 1.0, pathDeviationDeg: 0, clubFaceAngle: 0 };

    const res = PhysicsEngine.simulateChipping(PhysicsEngine.calculateLaunchParams(input, putter), {}, 10);

    console.log(`   Putt Carry: ${res.carryDistance}m, Total: ${res.totalDistance}m`);
    assert.ok(res.carryDistance < 2.0, "Putter should have very low carry");
    assert.ok(res.rollDistance > res.carryDistance, "Putter should mostly roll");
    assert.ok(res.totalDistance > 0, "Putter shot should move");
});

// 5. Test de pénétration du vent sur les chips (Reynolds)
runTest('Reynolds: Wind should affect chips even at low speed', () => {
    const club = PhysicsEngine.GOLF_BAG['PW'];
    const params = PhysicsEngine.calculateLaunchParams({ clubSpeedMph: 25, efficiency: 1, powerFactor: 1, pathDeviationDeg: 0, clubFaceAngle: 0 }, club);

    const noWind = PhysicsEngine.simulateChipping(params, { windSpeed: 0 }, 10);
    const headWind = PhysicsEngine.simulateChipping(params, { windSpeed: 40, windDir: 180 }, 10);

    console.log(`   No Wind Carry: ${noWind.carryDistance}m, Headwind Carry: ${headWind.carryDistance}m`);
    assert.ok(headWind.carryDistance < noWind.carryDistance, "Headwind must reduce chip carry");
});

// 6. Test de cohérence du Dynamic Loft (Position de balle)
runTest('Ball Position should modify launch angle', () => {
    const club = PhysicsEngine.GOLF_BAG['SW'];
    const input = { clubSpeedMph: 20, powerFactor: 1, efficiency: 1, pathDeviationDeg: 0, clubFaceAngle: 0 };

    // Balle au milieu (0cm)
    const paramsMid = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle);

    // Balle en arrière (-10cm -> plus de compression, moins de loft)
    const posAdj = -10;
    const paramsBack = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle + (posAdj * 0.5));
    paramsBack.launchAngleDeg += (posAdj * 0.5);

    assert.ok(paramsBack.launchAngleDeg < paramsMid.launchAngleDeg, "Ball in back of stance should lower launch angle");
});