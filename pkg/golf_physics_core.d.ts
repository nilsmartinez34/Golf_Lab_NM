/* tslint:disable */
/* eslint-disable */

export class PhysicsEngineRust {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static calculate_air_density(alt: number, temp: number): number;
    static calculate_coefficients(speed: number, current_rpm: number): any;
    static calculate_putting(target_dist: number, slope_x_deg: number, slope_y_deg: number, aim_angle_deg: number): any;
    static simulate_trajectory(speed_mps: number, launch_angle_deg: number, launch_dir_deg: number, total_spin_rpm: number, axis_tilt_deg: number, altitude: number, temp: number, wind_speed_kmh: number, wind_dir_deg: number): any;
}

export class Vec3 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    x: number;
    y: number;
    z: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_get_vec3_x: (a: number) => number;
    readonly __wbg_get_vec3_y: (a: number) => number;
    readonly __wbg_get_vec3_z: (a: number) => number;
    readonly __wbg_physicsenginerust_free: (a: number, b: number) => void;
    readonly __wbg_set_vec3_x: (a: number, b: number) => void;
    readonly __wbg_set_vec3_y: (a: number, b: number) => void;
    readonly __wbg_set_vec3_z: (a: number, b: number) => void;
    readonly __wbg_vec3_free: (a: number, b: number) => void;
    readonly physicsenginerust_calculate_air_density: (a: number, b: number) => number;
    readonly physicsenginerust_calculate_coefficients: (a: number, b: number) => any;
    readonly physicsenginerust_calculate_putting: (a: number, b: number, c: number, d: number) => any;
    readonly physicsenginerust_simulate_trajectory: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => any;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
