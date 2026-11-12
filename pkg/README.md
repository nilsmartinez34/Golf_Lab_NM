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

## 📐 Moteur de Swing V11 (Trackman Grade)

Le cœur de **Golf Lab NM** repose sur une simulation aérodynamique de pointe, calibrée pour offrir une précision pédagogique de niveau Trackman.

### 1. Physique du D-Plane
Contrairement aux simulateurs basiques, le moteur calcule le départ de balle via les lois du **D-Plane** :
- **Spin Loft** : Différence entre le Loft Dynamique et l'Angle d'Attaque (AoA), déterminant le taux de backspin.
- **Spin Axis** : Calculé à partir de la relation *Face-to-Path*, permettant de modéliser des Draw/Fade réalistes via l'inclinaison de l'axe de rotation.
- **Launch Direction** : Pondération (~85% Face / 15% Path) pour une direction initiale conforme à la réalité.

### 2. Aérodynamique Magnus 3D
La simulation de vol utilise l'intégration numérique par pas de 0.01s (Runge-Kutta modifiée) :
- **Force de Magnus** : Calculée par produit vectoriel 3D entre l'axe de spin et le vecteur vitesse relative.
- **Reynolds Number Approximation** : 
    - **Cd (Drag)** : Coefficient adaptatif (0.19 - 0.65) simulant la "crise de traînée" à haute vitesse et la pénétration dans le vent.
    - **Cl (Lift)** : Saturation par fonction hyperbolique (`tanh`) pour modéliser le plafonnement de la portance et éviter l'effet "ballon" sur les fers.
- **Spin Decay** : Perte de rotation de **4% par seconde** en vol, influençant la portance résiduelle en fin de trajectoire.

### 3. Modélisation Atmosphérique
- **Densité de l'air dynamique** : Calculée selon l'**altitude** (pression barométrique) et la **température** (loi des gaz parfaits), impactant directement la traînée et la portance.
- **Vitesse Relative** : Prise en compte asymétrique du vent (le vent de face augmente la traînée au carré, punissant plus que l'aide apportée par le vent arrière).

### 4. Rebond & Roulement (Ground Physics)
- **Restitution Énergétique** : Coefficient variant selon l'angle d'atterrissage (amorti sur les trajectoires verticales).
- **Backspin Brake** : Le spin résiduel est converti en force de freinage ou d'accélération lors du premier contact au sol.
- **Friction Cinétique** : Ralentissement réaliste basé sur une hauteur d'herbe simulée (Stimp meter équivalent).

---

*Created by NM — Refining the science of the game.*
坐
