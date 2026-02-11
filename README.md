# Golf Lab NM ⛳

A high-performance, web-based golf simulator designed for data-driven swing analysis and precision putting. **Golf Lab NM** combines a math-heavy physics engine with a premium, "punchy" dashboard to provide real-time feedback on every shot.

## 🚀 Key Features

### ⚡ Advanced Swing Dashboard
- **Comprehensive Metrics**: Real-time tracking of Carry, Total Distance, Backspin, Side Spin, and Smash Factor.
- **Ergonomic Control Board**: Precision sliders for Club Speed, Path Angle, Face Angle, and Attack Angle.
- **Impact Visualization**: High-fidelity ball impact canvas synced with your strike parameters.
- **Persistent Trajectories**: Analyze your shot shape with persistent ball flight curves on a 3D-depth canvas.

### 🎯 Aim Point Putting
- **Predictive Physics**: Iterative solver calculates the perfect aim and effort for any green slope.
- **Calibrated Grid**: Precision-mapped grid (0.5m per square) centered on the ball.
- **Target Metrics**: Displays "Play As" distance, Aim Point displacement, and the trajectory's Apex.
- **Dynamic Simulation**: Realistic ball-rolling physics considering X and Y slopes.

## 🛠 Technology Stack
- **Frontend**: Vanilla HTML5, CSS3 (Modern Glassmorphism & Neon Aesthetics).
- **Logic**: Pure JavaScript (ES6+).
- **Physics**: Custom-built `PhysicsEngine.js` for aerodynamics (flight) and friction-based rolling (putting).
- **Rendering**: High-performance 2D Canvas API with depth-scaling for 3D representation.

## 📥 Getting Started

1.  Clone the repository or download the source files.
2.  Open `index.html` in any modern web browser.
3.  **Swing Mode**: Use the dashboard to set your parameters, choose your club, and hit **SWING**.
4.  **Putt Mode**: Adjust the target distance and slope values; the system will automatically calculate the ideal line. Hit **PUTT** to see the result.

## 📐 Implementation Details
- **Coordinate System**: Realistic metric units converted to screen pixels via a calibrated `PIXELS_PER_METER` constant.
- **Aerodynamics**: Flight simulation accounts for lift, drag, and spin-induced Magnus effect.
- **Ergonomics**: Mobile-first design with tabbed navigation and consolidated footer controls.

---
*Created by NM — Refining the science of the game.*
坐
