# Golf Lab Project: Final Test Report

**Date:** 2026-02-23
**Status:** ✅ ALL TESTS PASSED

## Executive Summary

The Golf Lab project has undergone a comprehensive validation process. All core physics and chipping engines have been tested against a wide range of scenarios, including club consistency, weather effects, and technique variations.

| Category | Total Tests | Passed | Failed | Success Rate |
| :--- | :---: | :---: | :---: | :---: |
| Physics Engine (Ultimate) | 114 | 114 | 0 | 100% |
| Chipping Engine | 26 | 26 | 0 | 100% |
| **Total** | **140** | **140** | **0** | **100%** |

---

## Technical Notes

- **Trajectory Coloring:** The physics engine now correctly outputs `t` (time) and `speed` for every point in the trajectory path, supporting the new velocity-based color visualization in the 3D and 2D views.
- **Putting Optimization:** The putting simulation captures the sliding and rolling phases accurately at relevant speeds.
- **WASM Transition Ready:** The JavaScript implementations were verified to be logically consistent with the expected WASM outputs, ensuring reliability in the web version.

---

# Detailed Test Data

## 1. Physics Engine Matrix Data (Sea Level, No Wind)

### Club: Dr (105 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 223.80 | 244.10 | 22.90 | 0.00 |
| Pull Straight | 209.20 | 232.80 | 17.10 | -18.20 |
| Pull Hook | 187.30 | 215.70 | 11.60 | -39.70 |
| Pull Slice | 221.30 | 242.00 | 22.20 | 14.50 |
| Push Straight | 234.40 | 252.20 | 29.20 | 20.40 |
| Push Hook | 221.30 | 242.00 | 22.20 | -14.50 |
| Push Slice | 239.40 | 255.60 | 34.80 | 62.90 |
| Straight Hook | 206.60 | 230.70 | 16.60 | -28.80 |
| Straight Slice | 232.20 | 250.30 | 28.40 | 38.40 |


### Club: 3W (100 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 226.10 | 242.10 | 31.30 | 0.00 |
| Pull Straight | 219.80 | 237.60 | 25.60 | -19.20 |
| Pull Hook | 207.60 | 228.20 | 19.30 | -50.70 |
| Pull Slice | 223.90 | 240.20 | 30.40 | 21.50 |
| Push Straight | 229.30 | 243.90 | 37.00 | 20.00 |
| Push Hook | 223.90 | 240.20 | 30.40 | -21.50 |
| Push Slice | 228.70 | 242.40 | 41.50 | 65.30 |
| Straight Hook | 217.60 | 235.80 | 24.70 | -37.20 |
| Straight Slice | 227.50 | 242.30 | 36.00 | 43.70 |


### Club: 4i (92 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 202.90 | 216.40 | 36.30 | 0.00 |
| Pull Straight | 201.90 | 216.50 | 31.90 | -17.60 |
| Pull Hook | 197.60 | 213.70 | 26.70 | -52.20 |
| Pull Slice | 201.40 | 215.10 | 35.50 | 21.70 |
| Push Straight | 202.20 | 214.90 | 40.50 | 17.60 |
| Push Hook | 201.40 | 215.10 | 35.50 | -21.70 |
| Push Slice | 199.80 | 211.80 | 43.60 | 57.80 |
| Straight Hook | 200.30 | 215.10 | 31.10 | -37.50 |
| Straight Slice | 201.20 | 214.00 | 39.60 | 40.30 |


### Club: 5i (90 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 190.80 | 203.30 | 38.10 | 0.00 |
| Pull Straight | 191.30 | 204.70 | 34.30 | -16.70 |
| Pull Hook | 189.30 | 203.90 | 29.60 | -51.20 |
| Pull Slice | 189.70 | 202.40 | 37.30 | 20.90 |
| Push Straight | 189.30 | 201.20 | 41.70 | 16.50 |
| Push Hook | 189.70 | 202.40 | 37.30 | -20.90 |
| Push Slice | 186.30 | 197.70 | 44.30 | 53.80 |
| Straight Hook | 190.20 | 203.80 | 33.50 | -36.40 |
| Straight Slice | 188.40 | 200.30 | 40.90 | 37.80 |


### Club: 6i (88 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 179.50 | 191.20 | 39.40 | 0.00 |
| Pull Straight | 180.90 | 193.20 | 36.10 | -15.80 |
| Pull Hook | 180.30 | 193.70 | 32.00 | -49.40 |
| Pull Slice | 178.50 | 190.30 | 38.70 | 19.80 |
| Push Straight | 177.30 | 188.50 | 42.50 | 15.50 |
| Push Hook | 178.50 | 190.30 | 38.70 | -19.80 |
| Push Slice | 174.10 | 184.80 | 44.70 | 50.00 |
| Straight Hook | 179.80 | 192.30 | 35.40 | -34.80 |
| Straight Slice | 176.60 | 187.90 | 41.80 | 35.40 |


### Club: 7i (85 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 165.00 | 176.00 | 39.40 | 0.00 |
| Pull Straight | 167.10 | 178.60 | 36.70 | -14.60 |
| Pull Hook | 167.50 | 179.80 | 33.20 | -45.80 |
| Pull Slice | 164.50 | 175.50 | 38.80 | 17.80 |
| Push Straight | 162.50 | 173.00 | 42.00 | 14.20 |
| Push Hook | 164.50 | 175.50 | 38.80 | -17.80 |
| Push Slice | 159.40 | 169.50 | 44.00 | 45.00 |
| Straight Hook | 166.30 | 177.90 | 36.10 | -31.90 |
| Straight Slice | 162.20 | 172.70 | 41.50 | 31.80 |


### Club: 8i (82 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 148.10 | 158.10 | 39.30 | 0.00 |
| Pull Straight | 150.30 | 160.80 | 37.00 | -13.10 |
| Pull Hook | 151.60 | 162.80 | 34.20 | -41.10 |
| Pull Slice | 147.70 | 157.80 | 38.80 | 15.20 |
| Push Straight | 145.40 | 154.90 | 41.40 | 12.70 |
| Push Hook | 147.70 | 157.80 | 38.80 | -15.20 |
| Push Slice | 142.30 | 151.40 | 43.00 | 39.20 |
| Straight Hook | 149.90 | 160.50 | 36.50 | -28.10 |
| Straight Slice | 145.20 | 154.80 | 40.90 | 27.60 |


### Club: 9i (80 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 133.30 | 142.30 | 39.20 | 0.00 |
| Pull Straight | 135.80 | 145.30 | 37.30 | -11.80 |
| Pull Hook | 137.70 | 147.70 | 35.00 | -36.80 |
| Pull Slice | 133.10 | 142.10 | 38.80 | 12.90 |
| Push Straight | 130.50 | 139.10 | 41.00 | 11.40 |
| Push Hook | 133.10 | 142.10 | 38.80 | -12.90 |
| Push Slice | 127.60 | 135.70 | 42.40 | 34.30 |
| Straight Hook | 135.60 | 145.10 | 36.90 | -24.80 |
| Straight Slice | 130.40 | 139.00 | 40.60 | 24.00 |


### Club: PW (78 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 117.90 | 126.00 | 37.80 | 0.00 |
| Pull Straight | 120.40 | 128.90 | 36.20 | -10.50 |
| Pull Hook | 122.50 | 131.50 | 34.20 | -31.90 |
| Pull Slice | 117.90 | 125.90 | 37.50 | 10.50 |
| Push Straight | 115.20 | 122.80 | 39.30 | 10.00 |
| Push Hook | 117.90 | 125.90 | 37.50 | -10.50 |
| Push Slice | 112.40 | 119.50 | 40.50 | 29.30 |
| Straight Hook | 120.30 | 128.80 | 35.90 | -21.10 |
| Straight Slice | 115.20 | 122.80 | 39.00 | 20.20 |


### Club: SW (75 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 87.20 | 92.80 | 34.10 | 0.00 |
| Pull Straight | 89.60 | 95.70 | 33.00 | -7.80 |
| Pull Hook | 91.90 | 98.40 | 31.70 | -22.30 |
| Pull Slice | 87.20 | 92.80 | 34.00 | 6.10 |
| Push Straight | 84.60 | 89.80 | 35.10 | 7.40 |
| Push Hook | 87.20 | 92.80 | 34.00 | -6.10 |
| Push Slice | 82.00 | 86.80 | 36.00 | 19.80 |
| Straight Hook | 89.60 | 95.60 | 32.90 | -14.10 |
| Straight Slice | 84.70 | 89.90 | 35.00 | 13.30 |


### Club: LW (72 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 71.10 | 75.80 | 28.90 | 0.00 |
| Pull Straight | 73.10 | 78.20 | 28.00 | -6.40 |
| Pull Hook | 75.10 | 80.60 | 27.00 | -17.30 |
| Pull Slice | 71.10 | 75.70 | 28.80 | 4.00 |
| Push Straight | 68.80 | 73.10 | 29.80 | 6.00 |
| Push Hook | 71.10 | 75.70 | 28.80 | -4.00 |
| Push Slice | 66.60 | 70.60 | 30.50 | 15.20 |
| Straight Hook | 73.20 | 78.20 | 27.90 | -10.50 |
| Straight Slice | 68.90 | 73.10 | 29.70 | 9.90 |


### Club: Put (5 mph)
| Shot Type | Carry (m) | Total (m) | Max Height (m) | Lateral Dev (m) |
| :--- | :---: | :---: | :---: | :---: |
| Straight | 0.00 | 2.50 | 0.00 | 0.00 |
| Pull Straight | 0.00 | 2.50 | 0.00 | 0.00 |
| Pull Hook | 0.00 | 2.50 | 0.00 | 0.00 |
| Pull Slice | 0.00 | 2.50 | 0.00 | 0.00 |
| Push Straight | 0.10 | 2.50 | 0.00 | 0.00 |
| Push Hook | 0.00 | 2.50 | 0.00 | 0.00 |
| Push Slice | 0.10 | 2.50 | 0.00 | 0.00 |
| Straight Hook | 0.00 | 2.50 | 0.00 | 0.00 |
| Straight Slice | 0.10 | 2.50 | 0.00 | 0.00 |


## 2. Chipping Engine Matrix Data (Stimp 10)

### Short Game: PW
| Impact Speed | Carry (m) | Roll (m) | Total (m) | Max Height (m) |
| :--- | :---: | :---: | :---: | :---: |
| 10 mph | 2.70 | 7.20 | 9.90 | 0.50 |
| 20 mph | 10.90 | 26.00 | 36.90 | 1.90 |
| 30 mph | 24.50 | 49.80 | 74.30 | 4.60 |
| 40 mph | 42.60 | 70.50 | 113.10 | 8.50 |


### Short Game: SW
| Impact Speed | Carry (m) | Roll (m) | Total (m) | Max Height (m) |
| :--- | :---: | :---: | :---: | :---: |
| 10 mph | 2.30 | 4.60 | 6.90 | 0.50 |
| 20 mph | 9.30 | 16.50 | 25.80 | 2.20 |
| 30 mph | 20.40 | 31.80 | 52.20 | 5.10 |
| 40 mph | 34.60 | 46.00 | 80.60 | 9.30 |


### Short Game: LW
| Impact Speed | Carry (m) | Roll (m) | Total (m) | Max Height (m) |
| :--- | :---: | :---: | :---: | :---: |
| 10 mph | 2.00 | 3.50 | 5.50 | 0.50 |
| 20 mph | 7.90 | 12.60 | 20.50 | 2.10 |
| 30 mph | 17.30 | 24.60 | 41.90 | 4.90 |
| 40 mph | 29.30 | 36.10 | 65.40 | 8.80 |


### Short Game: 7i
| Impact Speed | Carry (m) | Roll (m) | Total (m) | Max Height (m) |
| :--- | :---: | :---: | :---: | :---: |
| 10 mph | 2.60 | 11.10 | 13.70 | 0.30 |
| 20 mph | 10.90 | 40.70 | 51.60 | 1.20 |
| 30 mph | 25.20 | 78.10 | 103.30 | 3.00 |
| 40 mph | 45.90 | 105.80 | 151.70 | 5.80 |


### Short Game: Put
| Impact Speed | Carry (m) | Roll (m) | Total (m) | Max Height (m) |
| :--- | :---: | :---: | :---: | :---: |
| 10 mph | 0.20 | 7.80 | 8.00 | 0.00 |
| 20 mph | 0.80 | 30.90 | 31.70 | 0.00 |
| 30 mph | 1.90 | 68.90 | 70.80 | 0.00 |
| 40 mph | 3.50 | 111.80 | 115.30 | 0.00 |


## 3. Environmental Impact Data (Driver, Straight)

| Scenario | Carry (m) | Total (m) | Height (m) | Effect vs Ref |
| :--- | :---: | :---: | :---: | :---: |
| Sea Level (Ref) | 223.80 | 244.10 | 22.90 | - |
| Tailwind 10ms | 228.50 | 252.20 | 21.40 | +4.70m |
| Tailwind 20ms | 232.10 | 259.10 | 20.00 | +8.30m |
| Headwind 10ms | 217.70 | 234.80 | 24.50 | -6.10m |
| Headwind 20ms | 210.00 | 223.90 | 26.10 | -13.80m |
| High Altitude (2500m) | 235.20 | 263.10 | 19.00 | +11.40m |

---
*Report generated by Antigravity AI.*
