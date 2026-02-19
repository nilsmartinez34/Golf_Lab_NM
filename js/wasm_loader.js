/**
 * WASM LOADER - Bridges the Rust Core with the JavaScript UI.
 */
import init, { PhysicsEngineRust } from '../pkg/golf_physics_core.js';

let wasmEngine = null;

export async function initWasm() {
    try {
        await init();
        wasmEngine = PhysicsEngineRust;
        console.log("✅ Golf Physics Core (WASM/RK4) Loaded Successfully");
        return true;
    } catch (e) {
        console.error("❌ Failed to load WASM engine:", e);
        return false;
    }
}

/**
 * Interface compatible with the old PhysicsEngine.simulateTrajectory
 */
export function simulateTrajectoryWasm(launchParams, environment = {}) {
    if (!wasmEngine) {
        console.warn("WASM Engine not loaded, falling back to legacy JS");
        return null;
    }

    // Map JS params to Rust call
    const resultJson = wasmEngine.simulate_trajectory(
        launchParams.ballSpeedMps,
        launchParams.launchAngleDeg,
        launchParams.launchDirectionDeg,
        launchParams.totalSpinRpm,
        launchParams.spinAxisTiltDeg,
        environment.altitude || 0,
        environment.temp || 20,
        environment.windSpeed || 0,
        environment.windDir || 0
    );

    // If it returns a JSON string (depending on how you handle JsValue)
    // Here we assume serde_wasm_bindgen returns a plain object.
    return resultJson;
}

export function calculatePuttingWasm(targetDistance, slopeXDeg, slopeYDeg, aimAngleDeg = 0) {
    if (!wasmEngine) return null;
    return wasmEngine.calculate_putting(targetDistance, slopeXDeg, slopeYDeg, aimAngleDeg);
}
