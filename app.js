const appState = {
    mode: 'swing', // 'swing' or 'putt'
    currentClub: PhysicsEngine.GOLF_BAG["Dr"],
    strikePosition: { x: 0.5, y: 0.5 },
    speedFactor: 1.0,
    angleLimit: 10,
    trajectoryResult: null,

    // Swing (School) Inputs
    power: 90,
    path: 0,
    face: 0,
    attack: 0,

    // Putting Inputs
    puttDist: 5,
    puttAim: 0,
    slopeX: 3.0,
    slopeY: 0.0,
    isAnimating: false,

    // NEW: History
    history: JSON.parse(localStorage.getItem('golf_history')) || [],

    // NEW: Weather
    weather: {
        altitude: 0,
        temp: 20,
        windSpeed: 0,
        windDir: 0
    },

    // Chipping specific
    chipBallPos: 0, // cm (-20 to +20)
    chipGreenSpeed: 10
};

document.addEventListener('DOMContentLoaded', () => {
    // Inject name property from keys for UI consistency
    Object.keys(PhysicsEngine.GOLF_BAG).forEach(key => {
        PhysicsEngine.GOLF_BAG[key].name = key;
    });

    initTabs();
    initUI();
    initClubBelt();
    initImpactBall();
    initMainCanvas();
    updateModeUI();
    updatePuttUI(); // Initial putt UI sync
    updateWeatherHUD(); // Initial weather HUD sync
});

function initTabs() {
    const tabSwing = document.getElementById('tab-swing');
    const tabChip = document.getElementById('tab-chip');
    const tabPutt = document.getElementById('tab-putt');

    tabSwing.onclick = () => {
        appState.mode = 'swing';
        updateModeUI();
    };
    if (tabChip) {
        tabChip.onclick = () => {
            appState.mode = 'chip';
            updateModeUI();
        };
    }
    tabPutt.onclick = () => {
        appState.mode = 'putt';
        updateModeUI();
    };
}

function updateModeUI() {
    const isSwing = appState.mode === 'swing';
    const isChip = appState.mode === 'chip';
    const isPutt = appState.mode === 'putt';

    // Tab active states
    document.getElementById('tab-swing').classList.toggle('active', isSwing);
    if (document.getElementById('tab-chip')) {
        document.getElementById('tab-chip').classList.toggle('active', isChip);
    }
    document.getElementById('tab-putt').classList.toggle('active', isPutt);

    // Content visibility
    document.getElementById('swing-content').style.display = isSwing ? 'block' : 'none';
    if (document.getElementById('chip-content')) {
        document.getElementById('chip-content').style.display = isChip ? 'block' : 'none';
    }
    document.getElementById('putt-content').style.display = isPutt ? 'block' : 'none';

    // Footer visibility
    document.getElementById('swing-footer').style.display = isSwing ? 'flex' : 'none';
    if (document.getElementById('chip-footer')) {
        document.getElementById('chip-footer').style.display = isChip ? 'flex' : 'none';
    }
    document.getElementById('putt-footer').style.display = isPutt ? 'flex' : 'none';

    // Metrics Header Swap
    document.getElementById('swing-metrics-header').style.display = isSwing ? 'flex' : 'none';
    if (document.getElementById('chip-metrics-header')) {
        document.getElementById('chip-metrics-header').style.display = isChip ? 'flex' : 'none';
    }
    document.getElementById('putt-metrics-header').style.display = isPutt ? 'flex' : 'none';

    if (isChip) {
        // Timeout to ensure DOM is ready? No, should be fine, but let's be safe
        setTimeout(() => { if (window.initChipUI) window.initChipUI(); }, 50);
    }

    if (window.resizeCanvas) window.resizeCanvas();
}

function updatePuttUI() {
    // Update Slope Displays
    document.getElementById('val-slope-x').textContent = `${appState.slopeX.toFixed(2).replace('.', ',')}°`;
    document.getElementById('val-slope-y').textContent = `${appState.slopeY.toFixed(2).replace('.', ',')}°`;

    // Update Distance Display
    document.getElementById('label-putt-dist').textContent = `${appState.puttDist.toFixed(2).replace('.', ',')}m`;

    // Automatic Re-calculation for Aim Point mode
    solvePerfectPutt();

    if (window.resizeCanvas) window.resizeCanvas();
}

/**
 * Iterative solver to find the perfect line and power (Aim Point Mode)
 * Based on the Android implementation.
 */
function solvePerfectPutt() {
    const targetY = appState.puttDist;
    const slopeX = appState.slopeX;
    const slopeY = appState.slopeY;

    let bestAim = 0.0;
    let bestPower = targetY;

    // 1. Initial guess for power (adjust for Y slope)
    if (slopeY > 0) bestPower = targetY * (1.0 + slopeY * 0.15);
    else if (slopeY < 0) bestPower = targetY * (1.0 + slopeY * 0.1);

    // 2. Converge on Aim
    for (let i = 0; i < 5; i++) {
        const res = PhysicsEngine.calculatePutting(bestPower, slopeX, slopeY, bestAim);
        const deviation = res.finalX; // Error at stop
        // Correction: if it missed 40cm Right (pos), aim more Left (neg)
        bestAim -= (Math.atan2(deviation, targetY) * 180 / Math.PI) * 0.8;
    }

    // 3. Converge on Power (to stop at targetY)
    for (let i = 0; i < 3; i++) {
        const res = PhysicsEngine.calculatePutting(bestPower, slopeX, slopeY, bestAim);
        const errorY = res.finalY - targetY;
        bestPower -= errorY * 0.7;
    }

    // Final simulation with best values
    const finalRes = PhysicsEngine.calculatePutting(bestPower, slopeX, slopeY, bestAim);

    // Calculate Apex
    let maxBreak = 0;
    let apexPoint = { x: 0, y: 0 };
    finalRes.path.forEach(p => {
        if (Math.abs(p.x) > maxBreak) {
            maxBreak = Math.abs(p.x);
            apexPoint = p;
        }
    });

    // Update state with calculated ideal values
    appState.puttAim = bestAim;
    appState.puttPlayAs = bestPower;
    appState.trajectoryResult = { ...finalRes, isPutt: true, apexPoint, isAimPoint: true };

    // Update Metrics Display
    const aimVal = Math.abs(bestAim); // Use distance for aim point display? Actually Android shows displacement.
    // Recommended Aim X (displacement at target distance)
    const aimDisplacement = bestPower * Math.sin(bestAim * Math.PI / 180);
    const aimUnit = aimDisplacement < 0 ? "m LEFT" : aimDisplacement > 0 ? "m RIGHT" : "m";

    document.getElementById('putt-val-aim').textContent = Math.abs(aimDisplacement).toFixed(2).replace('.', ',');
    document.getElementById('putt-unit-aim').textContent = aimUnit;
    document.getElementById('putt-val-playas').textContent = bestPower.toFixed(2).replace('.', ',');
    document.getElementById('putt-val-apex').textContent = `${apexPoint.x.toFixed(2).replace('.', ',')} / ${apexPoint.y.toFixed(2).replace('.', ',')}`;
}

function initUI() {
    // Settings Modal
    const settingsModal = document.getElementById('settings-modal');
    document.getElementById('weather-hud').onclick = () => settingsModal.style.display = 'flex';
    document.getElementById('btnCloseSettings').onclick = () => settingsModal.style.display = 'none';

    // History Modal
    const historyModal = document.getElementById('history-modal');
    document.getElementById('btnCloseHistory').onclick = () => historyModal.style.display = 'none';

    // Close on backdrop click
    window.onclick = (event) => {
        if (event.target == settingsModal) settingsModal.style.display = "none";
        if (event.target == historyModal) historyModal.style.display = "none";
    };

    // Swing Inputs
    const powerInput = document.getElementById('input-power');
    const pathInput = document.getElementById('input-path');
    const faceInput = document.getElementById('input-face');
    const attackInput = document.getElementById('input-attack');

    if (powerInput) {
        powerInput.oninput = (e) => {
            appState.power = parseFloat(e.target.value);
            document.getElementById('speed-label').textContent = `${appState.power} MPH`;
            const fillElement = document.getElementById('speed-fill-h');
            if (fillElement) {
                fillElement.style.width = `${(appState.power / 150) * 100}%`;
            }
        };
    }

    // Path Angle Buttons (0.5° increments)
    document.getElementById('btn-path-plus').onclick = () => {
        appState.path = Math.min(20, appState.path + 0.5);
        document.getElementById('path-label').textContent = `${appState.path > 0 ? '+' : ''}${appState.path.toFixed(1)}°`;
    };
    document.getElementById('btn-path-minus').onclick = () => {
        appState.path = Math.max(-20, appState.path - 0.5);
        document.getElementById('path-label').textContent = `${appState.path > 0 ? '+' : ''}${appState.path.toFixed(1)}°`;
    };

    // Face Angle Buttons (0.5° increments)
    document.getElementById('btn-face-plus').onclick = () => {
        appState.face = Math.min(15, appState.face + 0.5);
        document.getElementById('face-angle-label').textContent = `${appState.face > 0 ? '+' : ''}${appState.face.toFixed(1)}°`;
        appState.strikePosition.x = (appState.face / appState.angleLimit) + 0.5;
        if (window.drawImpact) window.drawImpact();
    };
    document.getElementById('btn-face-minus').onclick = () => {
        appState.face = Math.max(-15, appState.face - 0.5);
        document.getElementById('face-angle-label').textContent = `${appState.face > 0 ? '+' : ''}${appState.face.toFixed(1)}°`;
        appState.strikePosition.x = (appState.face / appState.angleLimit) + 0.5;
        if (window.drawImpact) window.drawImpact();
    };

    // Attack Angle Buttons (0.5° increments)
    document.getElementById('btn-attack-plus').onclick = () => {
        appState.attack = Math.min(10, appState.attack + 0.5);
        document.getElementById('attack-label').textContent = `${appState.attack > 0 ? '+' : ''}${appState.attack.toFixed(1)}°`;
        appState.strikePosition.y = 0.5 - (appState.attack / 10);
        if (window.drawImpact) window.drawImpact();
    };
    document.getElementById('btn-attack-minus').onclick = () => {
        appState.attack = Math.max(-10, appState.attack - 0.5);
        document.getElementById('attack-label').textContent = `${appState.attack > 0 ? '+' : ''}${appState.attack.toFixed(1)}°`;
        appState.strikePosition.y = 0.5 - (appState.attack / 10);
        if (window.drawImpact) window.drawImpact();
    };

    // Distance Buttons (0.5m increments)
    document.getElementById('btn-dist-plus').onclick = () => {
        appState.puttDist = Math.min(20, appState.puttDist + 0.5);
        updatePuttUI();
    };
    document.getElementById('btn-dist-minus').onclick = () => {
        appState.puttDist = Math.max(1, appState.puttDist - 0.5);
        updatePuttUI();
    };

    // Slope Buttons (0.5° increments)
    document.getElementById('btn-slope-x-plus').onclick = () => { appState.slopeX = Math.min(5, appState.slopeX + 0.5); updatePuttUI(); };
    document.getElementById('btn-slope-x-minus').onclick = () => { appState.slopeX = Math.max(-5, appState.slopeX - 0.5); updatePuttUI(); };
    document.getElementById('btn-slope-y-plus').onclick = () => { appState.slopeY = Math.min(10, appState.slopeY + 0.5); updatePuttUI(); };
    document.getElementById('btn-slope-y-minus').onclick = () => { appState.slopeY = Math.max(-10, appState.slopeY - 0.5); updatePuttUI(); };

    // Back Button
    document.getElementById('btnPuttBack').onclick = () => {
        appState.mode = 'swing';
        updateModeUI();
    };

    // Action Buttons
    document.getElementById('btnSwing').onclick = () => calculateSwing();
    document.getElementById('btnPutt').onclick = () => {
        if (appState.trajectoryResult && appState.trajectoryResult.isPutt) {
            animate(appState.trajectoryResult);
        }
    };
    document.getElementById('btnResetPutt').onclick = () => {
        appState.slopeX = 0;
        appState.slopeY = 0;
        appState.puttDist = 5;
        appState.trajectoryResult = null;
        updatePuttUI();
    };

    // Settings Sliders
    const boostSlider = document.getElementById('slider-speed-boost');
    const angleSlider = document.getElementById('slider-angle-limit');
    if (boostSlider) {
        boostSlider.oninput = (e) => {
            appState.speedFactor = parseFloat(e.target.value);
            document.getElementById('val-speed-boost').textContent = `x${appState.speedFactor.toFixed(1)}`;
        };
    }
    if (angleSlider) {
        angleSlider.oninput = (e) => {
            appState.angleLimit = parseInt(e.target.value);
            document.getElementById('val-angle-limit').textContent = `${appState.angleLimit}°`;
        };
    }

    // Weather Inputs
    const altSlider = document.getElementById('slider-altitude');
    const tempSlider = document.getElementById('slider-temp');
    const windSSlider = document.getElementById('slider-wind-speed');
    const windDSlider = document.getElementById('slider-wind-dir');

    if (altSlider) altSlider.oninput = (e) => {
        appState.weather.altitude = parseInt(e.target.value);
        document.getElementById('val-altitude').textContent = `${appState.weather.altitude}m`;
        updateWeatherHUD();
    };
    if (tempSlider) tempSlider.oninput = (e) => {
        appState.weather.temp = parseInt(e.target.value);
        document.getElementById('val-temp').textContent = `${appState.weather.temp}°C`;
        updateWeatherHUD();
    };
    if (windSSlider) windSSlider.oninput = (e) => {
        appState.weather.windSpeed = parseInt(e.target.value);
        document.getElementById('val-wind-speed').textContent = `${appState.weather.windSpeed} km/h`;
        updateWeatherHUD();
    };
    if (windDSlider) windDSlider.oninput = (e) => {
        appState.weather.windDir = parseInt(e.target.value);
        let dirLabel = "";
        const d = appState.weather.windDir;
        if (d >= 315 || d < 45) dirLabel = "Tail";
        else if (d >= 45 && d < 135) dirLabel = "Cross-L";
        else if (d >= 135 && d < 225) dirLabel = "Head";
        else dirLabel = "Cross-R";
        document.getElementById('val-wind-dir').textContent = `${d}° (${dirLabel})`;
        updateWeatherHUD();
    };
}

function updateWeatherHUD() {
    const w = appState.weather;

    // Wind Arrow & Speed
    const arrow = document.getElementById('wind-arrow');
    const speed = document.getElementById('wind-speed-hud');
    if (arrow) {
        // WindDir: 0 is Tailwind (Up), 180 is Headwind (Down)
        arrow.style.transform = `rotate(${w.windDir}deg)`;
    }
    if (speed) {
        speed.textContent = w.windSpeed > 0 ? `${w.windSpeed} km/h` : "NUL";
    }

    // Alt & Temp
    const extra = document.getElementById('alt-temp-hud');
    if (extra) {
        extra.textContent = `${w.altitude}m · ${w.temp}°C`;
    }
}

function initClubBelt() {
    const belt = document.getElementById('club-belt');
    if (!belt) return;
    Object.values(PhysicsEngine.GOLF_BAG).forEach(club => {
        const item = document.createElement('div');
        item.className = `club-item ${club.name === appState.currentClub.name ? 'active' : ''}`;
        item.textContent = club.name;
        item.onclick = () => {
            document.querySelectorAll('.club-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            appState.currentClub = club;
        };
        belt.appendChild(item);
    });
}

function initImpactBall() {
    const canvas = document.getElementById('impactBallCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    window.drawImpact = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const r = canvas.width / 2, cx = r, cy = r;
        ctx.beginPath(); ctx.arc(cx, cy, r - 5, 0, Math.PI * 2); ctx.fillStyle = 'white'; ctx.fill(); ctx.strokeStyle = '#CBD5E1'; ctx.stroke();
        ctx.strokeStyle = '#1D4ED8'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx - 12, 5); ctx.lineTo(cx - 12, canvas.height - 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 12, 5); ctx.lineTo(cx + 12, canvas.height - 5); ctx.stroke();
        ctx.strokeStyle = 'red'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, 5); ctx.lineTo(cx, canvas.height - 5); ctx.stroke();
        const sx = appState.strikePosition.x * canvas.width, sy = appState.strikePosition.y * canvas.height;
        ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fillStyle = 'red'; ctx.fill();
    }
    canvas.onmousedown = canvas.ontouchstart = (e) => {
        const update = (evt) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
            const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
            appState.strikePosition.x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            appState.strikePosition.y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

            // Sync with sliders
            appState.face = (appState.strikePosition.x - 0.5) * appState.angleLimit;
            appState.attack = (0.5 - appState.strikePosition.y) * 10;

            if (document.getElementById('input-face')) {
                document.getElementById('input-face').value = appState.face;
                document.getElementById('face-angle-label').textContent = `${appState.face > 0 ? '+' : ''}${appState.face.toFixed(1)}°`;
            }
            if (document.getElementById('input-attack')) {
                document.getElementById('input-attack').value = appState.attack;
                document.getElementById('attack-label').textContent = `${appState.attack > 0 ? '+' : ''}${appState.attack.toFixed(1)}°`;
            }

            drawImpact();
        };
        const stop = () => { window.removeEventListener('mousemove', update); window.removeEventListener('mouseup', stop); window.removeEventListener('touchmove', update); window.removeEventListener('touchend', stop); };
        window.addEventListener('mousemove', update); window.addEventListener('mouseup', stop); window.addEventListener('touchmove', update); window.addEventListener('touchend', stop);
        update(e);
    };
    drawImpact();
}

const PIXELS_PER_METER = 50;

function initMainCanvas() {
    const canvas = document.getElementById('golfCanvas');
    const ctx = canvas.getContext('2d');

    window.resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawBackground();
    };
    window.onresize = window.resizeCanvas;
    window.resizeCanvas();

    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (appState.mode === 'swing') {
            drawSwingGrid();
            if (appState.trajectoryResult && !appState.trajectoryResult.isPutt && !appState.isAnimating) {
                drawPersistentSwingTrajectory(appState.trajectoryResult);
            }
        } else if (appState.mode === 'chip') {
            drawChipProfile();
            if (appState.trajectoryResult && !appState.trajectoryResult.isPutt && !appState.isAnimating) {
                drawPersistentChipProfile(appState.trajectoryResult);
            }
        } else {
            drawPuttGrid();
            if (appState.trajectoryResult && appState.trajectoryResult.isPutt && !appState.isAnimating) {
                drawPersistentTrajectory(appState.trajectoryResult);
            }
        }
    }

    function drawSwingGrid() {
        const horizonY = canvas.height * 0.38;

        // 1. SKY GRADIENT (Top to Horizon)
        const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGradient.addColorStop(0, '#1E40AF'); // Deep Blue
        skyGradient.addColorStop(1, '#60A5FA'); // Light Blue near horizon
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, horizonY);

        // 2. GROUND GRADIENT (Horizon to Bottom)
        const groundGradient = ctx.createLinearGradient(0, horizonY, 0, canvas.height);
        groundGradient.addColorStop(0, '#064E3B'); // Forest Green at horizon
        groundGradient.addColorStop(1, '#10B981'); // Vibrant Green at foreground
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);

        const groundStartY = canvas.height * 0.88;
        const groundRange = groundStartY - horizonY;
        const k = 0.0052;

        // Grid lines (White with subtle transparency)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        const lateralLines = 10;
        for (let i = -lateralLines; i <= lateralLines; i++) {
            ctx.beginPath();
            for (let d = 0; d <= 400; d += 10) {
                const scale = Math.exp(-k * d);
                const x = (canvas.width * 0.5) + (i * 20 * scale);
                const y = horizonY + (groundRange * scale);
                if (d === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Horizontal distance markers
        for (let d = 0; d <= 300; d += 50) {
            const scale = Math.exp(-k * d);
            const y = horizonY + (groundRange * scale);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();

            // Visible markers markers in White
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillText(`${d}m`, 10, y - 5);
        }
    }

    function drawChipProfile() {
        const groundY = canvas.height * 0.85;

        // Sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
        skyGrad.addColorStop(0, '#1E3A8A');
        skyGrad.addColorStop(1, '#3B82F6');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, groundY);

        // Ground
        ctx.fillStyle = '#15803D';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

        // Grid Lines (Vertical - Distance)
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.font = '10px Inter';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.textAlign = 'center';

        const maxDist = 80; // Meters
        const pxPerM = canvas.width / maxDist;

        for (let d = 0; d <= maxDist; d += 10) {
            const x = d * pxPerM;
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            ctx.fillText(`${d}m`, x, groundY + 15);
        }

        // Horizontal (Height) - Optional
        for (let h = 5; h <= 20; h += 5) {
            const y = groundY - (h * pxPerM); // Aspect ratio maintained? 
            // Maybe stretch Y for better viz? Let's use 3x vertical exaggeration
            const yEx = groundY - (h * pxPerM * 3);
            ctx.beginPath(); ctx.moveTo(0, yEx); ctx.lineTo(canvas.width, yEx); ctx.stroke();
        }
    }




    function drawPuttGrid() {
        ctx.fillStyle = '#064E3B'; // Dark green
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height - 100;
        const gridStep = 0.5 * PIXELS_PER_METER; // 1 carreau = 0.5m

        ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
        ctx.lineWidth = 1;

        // Draw vertical lines aligned with cx
        for (let x = cx; x < canvas.width; x += gridStep) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let x = cx - gridStep; x > 0; x -= gridStep) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }

        // Draw horizontal lines aligned with cy
        for (let y = cy; y < canvas.height; y += gridStep) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }
        for (let y = cy - gridStep; y > 0; y -= gridStep) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Markers
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.stroke();

        // Aim Point (Green Cross)
        const aimAngleRad = appState.puttAim * Math.PI / 180;
        const aimDisplacement = appState.puttPlayAs * Math.sin(aimAngleRad);
        const aimDepth = appState.puttPlayAs * Math.cos(aimAngleRad);

        const aimX = cx + aimDisplacement * PIXELS_PER_METER;
        const aimY = cy - aimDepth * PIXELS_PER_METER;
        ctx.strokeStyle = '#4ADE80';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(aimX - 8, aimY); ctx.lineTo(aimX + 8, aimY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(aimX, aimY - 8); ctx.lineTo(aimX, aimY + 8); ctx.stroke();

        // Hole (Target Position)
        const holeY = cy - appState.puttDist * PIXELS_PER_METER;
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath(); ctx.arc(cx, holeY, 8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#4ADE80'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Dans app.js

    function drawPersistentSwingTrajectory(result) {
        if (!result.path || result.isPutt) return;

        const hY = canvas.height * 0.38; // Horizon
        const gY = canvas.height * 0.88; // Départ sol
        const gR = gY - hY;              // Ecart sol-horizon
        const k = 0.0052;                // Facteur perspective

        // Facteur de zoom visuel pour que la balle ne paraisse pas minuscule
        const VIEW_SCALE = 20.0;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // Un peu plus visible
        ctx.lineWidth = 2; // Un peu plus épais

        result.path.forEach((p, i) => {
            // Facteur d'échelle selon la distance (profondeur X)
            const sc = Math.exp(-k * p.x);

            // --- CORRECTION ICI ---
            // SX (Ecran X) = Centre + (Deviation Latérale Y * Echelle * Zoom)
            const sx = (canvas.width * 0.5) + (p.y * sc * VIEW_SCALE);

            // SY (Ecran Y) = LigneSolPerspective - (Hauteur Z * Echelle * Zoom)
            const sy = (hY + (gR * sc)) - (p.z * sc * VIEW_SCALE);
            // ---------------------

            if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        });
        ctx.stroke();
    }

    function drawPersistentTrajectory(result) {
        if (!result.isPutt) return;
        const cx = canvas.width / 2, cy = canvas.height - 100;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        result.path.forEach((p, i) => {
            const px = cx + p.x * PIXELS_PER_METER, py = cy - p.y * PIXELS_PER_METER;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Re-draw yellow apex if we have one
        if (result.apexPoint) {
            const ax = cx + result.apexPoint.x * PIXELS_PER_METER, ay = cy - result.apexPoint.y * PIXELS_PER_METER;
            ctx.fillStyle = '#FACC15';
            ctx.beginPath(); ctx.arc(ax, ay, 4, 0, Math.PI * 2); ctx.fill();
        }
    }

    function drawPersistentChipProfile(result) {
        const groundY = canvas.height * 0.85;
        const maxDist = 80;
        const pxPerM = canvas.width / maxDist;
        const verticalExaggeration = 3.0;

        const flightEnd = result.flightPathEndIndex || result.path.length;

        ctx.lineWidth = 2;
        ctx.beginPath();

        // 1. Flight (White)
        ctx.strokeStyle = 'white';
        for (let i = 0; i < flightEnd; i++) {
            const p = result.path[i];
            // X = Distance (p.x), Y = Height (p.z)
            // Note: In global coords, x is forward, z is up.
            const cx = p.x * pxPerM;
            const cy = groundY - (p.z * pxPerM * verticalExaggeration);

            if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        // 2. Roll (Yellow)
        ctx.beginPath();
        ctx.strokeStyle = '#FACC15';
        for (let i = flightEnd - 1; i < result.path.length; i++) {
            if (i < 0) continue;
            const p = result.path[i];
            const cx = p.x * pxPerM;
            const cy = groundY - (p.z * pxPerM * verticalExaggeration);
            if (i === flightEnd - 1) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
    }

    window.calculateSwing = function () {
        const input = {
            clubSpeedMph: appState.power * appState.speedFactor,
            powerFactor: 1.0,
            efficiency: appState.currentClub.efficiency,
            pathDeviationDeg: appState.path,
            clubFaceAngle: appState.face
        };
        const manualAttackAngle = appState.attack;
        const params = PhysicsEngine.calculateLaunchParams(input, appState.currentClub, manualAttackAngle);
        // Correct signature: simulateTrajectory(launchParams, environment)
        const result = PhysicsEngine.simulateTrajectory(params, appState.weather);
        appState.trajectoryResult = result;
        animate(result);
        updateSwingMetrics(result);
        addHistoryItem('Swing', result);
    };

    window.calculatePutt = function () {
        const res = PhysicsEngine.calculatePutting(appState.puttDist, appState.slopeX, appState.slopeY, appState.puttAim);

        // Calculate Apex
        let maxDev = 0;
        let apexPoint = { x: 0, y: 0 };
        res.path.forEach(p => {
            const dev = Math.abs(p.x);
            if (dev > maxDev) {
                maxDev = dev;
                apexPoint = p;
            }
        });

        const finalResult = { ...res, isPutt: true, apexPoint };
        appState.trajectoryResult = finalResult;
        animate(finalResult);
        updatePuttMetrics(res, apexPoint);
        addHistoryItem('Putt', finalResult);
    };

    window.animate = function (result) {
        let frame = 0;
        appState.isAnimating = true;
        const isPutt = result.isPutt;
        const cx = canvas.width / 2, cy = canvas.height - 100;

        function step() {
            if (frame >= result.path.length) {
                appState.isAnimating = false;
                drawBackground(); // Draw persistent trace
                return;
            }
            drawBackground();
            ctx.beginPath();
            ctx.strokeStyle = isPutt ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 1)';
            ctx.lineWidth = isPutt ? 3 : 2;

            if (isPutt) {
                // Draw path up to current frame
                for (let i = 0; i <= frame; i++) {
                    const p = result.path[i];
                    const px = cx + p.x * PIXELS_PER_METER, py = cy - p.y * PIXELS_PER_METER;
                    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                }
                ctx.stroke();

                // Draw ball at current frame
                const p = result.path[frame];
                const px = cx + p.x * PIXELS_PER_METER, py = cy - p.y * PIXELS_PER_METER;
                ctx.fillStyle = 'white';
                ctx.shadowBlur = 10; ctx.shadowColor = 'white';
                ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;

                // Draw yellow apex dot if passed
                if (result.apexPoint) {
                    const halfFrame = Math.floor(result.path.length / 2);
                    if (frame >= halfFrame) {
                        const ax = cx + result.apexPoint.x * PIXELS_PER_METER, ay = cy - result.apexPoint.y * PIXELS_PER_METER;
                        ctx.fillStyle = '#FACC15';
                        ctx.beginPath(); ctx.arc(ax, ay, 4, 0, Math.PI * 2); ctx.fill();
                    }
                }
            } else if (appState.mode === 'chip') {
                // CHIP ANIMATION (2D Profile with Exaggerated Height)
                const groundY = canvas.height * 0.85;
                const maxDist = 80;
                const pxPerM = canvas.width / maxDist;
                const verticalImg = 3.0;

                const flightEnd = result.flightPathEndIndex || result.path.length;

                // Trace
                ctx.beginPath();
                for (let i = 0; i <= frame; i++) {
                    const p = result.path[i];
                    // Global: X=Forward, Z=Up
                    const cx = p.x * pxPerM;
                    const cy = groundY - (p.z * pxPerM * verticalImg);

                    if (i === flightEnd) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.strokeStyle = '#FACC15'; // Gold for roll
                        ctx.moveTo(cx, cy);
                    } else if (i === 0) {
                        ctx.moveTo(cx, cy);
                        ctx.strokeStyle = '#FFFFFF';
                    } else {
                        ctx.lineTo(cx, cy);
                    }
                }
                ctx.stroke();

                // Ball
                const p = result.path[frame];
                const cx = p.x * pxPerM;
                const cy = groundY - (p.z * pxPerM * verticalImg);

                ctx.fillStyle = 'white';
                ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
            } else {
                const hY = canvas.height * 0.38;
                const gY = canvas.height * 0.88;
                const gR = gY - hY;
                const k = 0.0052;
                const VIEW_SCALE = 20.0;

                // Draw Trace
                ctx.beginPath();
                const flightEnd = result.flightPathEndIndex || result.path.length;

                for (let i = 0; i <= frame; i++) {
                    const p = result.path[i];
                    const sc = Math.exp(-k * p.x);
                    const sx = (canvas.width * 0.5) + (p.y * sc * VIEW_SCALE);
                    const sy = (hY + (gR * sc)) - (p.z * sc * VIEW_SCALE);

                    // Change color after flight end
                    if (i === flightEnd) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.strokeStyle = '#FACC15'; // Gold for roll
                        ctx.moveTo(sx, sy);
                    } else if (i === 0) {
                        ctx.moveTo(sx, sy);
                        ctx.strokeStyle = '#FFFFFF';
                    } else {
                        ctx.lineTo(sx, sy);
                    }
                }
                ctx.stroke();

                // Draw Ball
                const p = result.path[frame];
                const sc = Math.exp(-k * p.x);
                const sx = (canvas.width * 0.5) + (p.y * sc * VIEW_SCALE);
                const sy = (hY + (gR * sc)) - (p.z * sc * VIEW_SCALE);

                ctx.fillStyle = 'white';
                ctx.beginPath(); ctx.arc(sx, sy, Math.max(2, 6 * sc), 0, Math.PI * 2); ctx.fill();
            }
            frame += 2;
            requestAnimationFrame(step);
        }
        step();
    }

    function updateSwingMetrics(res) {
        document.getElementById('val-m1').textContent = res.carryDistance.toFixed(1);
        document.getElementById('val-m2').textContent = res.totalDistance.toFixed(1);
        document.getElementById('val-m3').textContent = Math.abs(res.lateralDeviation).toFixed(1);
        document.getElementById('unit-m3').textContent = res.lateralDeviation < 0 ? 'L' : 'R';

        // Fix: Property names from physics.js (spinRpm/sideSpinRpm)
        document.getElementById('val-spin-back').textContent = Math.round(res.spinRpm);
        document.getElementById('val-spin-side').textContent = Math.round(res.sideSpinRpm);
        document.getElementById('val-smash').textContent = res.smashFactor.toFixed(2);

        document.getElementById('hud-club-speed').textContent = res.clubHeadSpeedMph.toFixed(1);
        document.getElementById('hud-ball-speed').textContent = res.ballSpeedMph.toFixed(1);
        document.querySelectorAll('.hud-value').forEach(el => {
            if (el.id === 'hud-path') el.textContent = `${res.swingPath > 0 ? '+' : ''}${res.swingPath.toFixed(1)}°`;
            // Correction affichage (plus de signe moins)
            if (el.id === 'hud-face') el.textContent = `${res.faceToPath > 0 ? '+' : ''}${res.faceToPath.toFixed(1)}°`;
        });
    }

    function addHistoryItem(type, result) {
        const item = {
            type,
            club: appState.currentClub.name,
            mainVal: type === 'Swing' ? piece(result.carryDistance, 'M') : piece(result.totalDistance, 'M'),
            subVal: type === 'Swing' ? `${Math.round(result.spinRpm)} RPM` : `${result.finalX.toFixed(2)}m Error`,
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        appState.history.unshift(item); // Newest first
        localStorage.setItem('golf_history', JSON.stringify(appState.history));
    }

    function piece(val, unit) { return `${val.toFixed(1)} ${unit}`; }

    function renderHistory() {
        const list = document.getElementById('history-list');
        list.innerHTML = '';
        if (appState.history.length === 0) {
            list.innerHTML = '<div style="text-align:center; padding:20px; color:rgba(255,255,255,0.2)">Aucune donnée</div>';
            return;
        }

        appState.history.forEach(h => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="his-left">
                    <span class="his-club">${(h.type === 'Swing' || h.type === 'Chip') ? h.club : 'PUTTER'}</span>
                    <span class="his-date">${h.date}</span>
                </div>
                <div class="his-metrics">
                    <div class="his-main">${h.mainVal}</div>
                    <div class="his-sub">${h.subVal}</div>
                </div>
            `;
            list.appendChild(div);
        });
    }

    function updatePuttMetrics(res, apex) {
        const aimVal = Math.abs(appState.puttAim);
        const aimUnit = appState.puttAim < 0 ? "m LEFT" : appState.puttAim > 0 ? "m RIGHT" : "m";
        document.getElementById('putt-val-aim').textContent = aimVal.toFixed(2).replace('.', ',');
        document.getElementById('putt-unit-aim').textContent = aimUnit;

        // Play As: for now just the target distance, but could involve slope compensation
        const playAs = appState.puttDist;
        document.getElementById('putt-val-playas').textContent = playAs.toFixed(2).replace('.', ',');

        document.getElementById('putt-val-apex').textContent = `${apex.x.toFixed(2).replace('.', ',')} / ${apex.y.toFixed(2).replace('.', ',')}`;
    }

    // --- CHIPPING MODE LOGIC ---
    window.initChipUI = function () {
        const clubSelect = document.getElementById('chip-club-select');
        if (clubSelect && clubSelect.innerHTML === '') {
            Object.keys(PhysicsEngine.GOLF_BAG).forEach(code => {
                const opt = document.createElement('option');
                opt.value = code;
                opt.textContent = code;
                if (code === 'SW') opt.selected = true;
                clubSelect.appendChild(opt);
            });
        }

        // Ball Position Buttons
        const btnMinus = document.getElementById('btn-pos-minus');
        const btnPlus = document.getElementById('btn-pos-plus');
        const posLabel = document.getElementById('val-ball-pos');

        if (btnMinus) {
            btnMinus.onclick = () => {
                appState.chipBallPos = Math.max(-20, appState.chipBallPos - 1);
                if (posLabel) posLabel.textContent = `${appState.chipBallPos > 0 ? '+' : ''}${appState.chipBallPos} cm`;
            };
        }
        if (btnPlus) {
            btnPlus.onclick = () => {
                appState.chipBallPos = Math.min(20, appState.chipBallPos + 1);
                if (posLabel) posLabel.textContent = `${appState.chipBallPos > 0 ? '+' : ''}${appState.chipBallPos} cm`;
            };
        }

        const powerInput = document.getElementById('chip-input-power');
        if (powerInput) {
            powerInput.oninput = (e) => {
                const val = e.target.value;
                document.getElementById('chip-speed-label').textContent = `${val} MPH`;
            };
        }

        const btnGreen = document.getElementById('btn-green-speed');
        if (btnGreen) {
            btnGreen.onclick = () => {
                const speeds = [8, 10, 12];
                let curr = parseInt(btnGreen.textContent.split(' ')[1]);
                let next = speeds[(speeds.indexOf(curr) + 1) % speeds.length];
                btnGreen.textContent = `GRN ${next}`;
                appState.chipGreenSpeed = next;
            };
        }

        const btnChip = document.getElementById('btnChip');
        if (btnChip) {
            btnChip.onclick = () => window.calculateChip();
        }
    };

    window.calculateChip = function () {
        const clubCode = document.getElementById('chip-club-select').value;
        const club = PhysicsEngine.GOLF_BAG[clubCode];
        const powerStr = document.getElementById('chip-input-power').value;
        const power = parseFloat(powerStr);
        const greenSpeed = appState.chipGreenSpeed || 10;

        // Ball Position adjustment
        // 1cm back (-1) = -0.5 deg Dynamic Loft and -0.5 deg Attack Angle (Steeper)
        // 0cm = Standard
        const pos = appState.chipBallPos;
        const loftAdj = pos * 0.5;
        const attackAdj = pos * 0.5;

        const input = {
            clubSpeedMph: power,
            powerFactor: 1.0,
            efficiency: 1.0,
            pathDeviationDeg: 0,
            clubFaceAngle: 0
        };

        const params = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle + attackAdj);
        // Overwrite launchAngleDeg for true "Dynamic Loft" simulation from ball position
        params.launchAngleDeg += loftAdj;

        const result = PhysicsEngine.simulateChipping(params, appState.weather, greenSpeed);

        appState.trajectoryResult = result;
        animate(result);
        updateChipMetrics(result);
        addHistoryItem('Chip', result);
    };

    function updateChipMetrics(res) {
        document.getElementById('chip-val-carry').textContent = res.carryDistance.toFixed(1);
        document.getElementById('chip-val-roll').textContent = res.rollDistance.toFixed(1);
        document.getElementById('chip-val-total').textContent = res.totalDistance.toFixed(1);
        document.getElementById('chip-val-apex').textContent = res.maxHeight.toFixed(1);

        const ratio = (res.rollDistance / res.totalDistance * 100) || 0;
        document.getElementById('chip-val-ratio').textContent = Math.round(ratio);

        // New Metrics
        if (document.getElementById('chip-val-loft')) {
            document.getElementById('chip-val-loft').textContent = res.launchAngleDeg.toFixed(1);
        }
        if (document.getElementById('chip-val-spin')) {
            document.getElementById('chip-val-spin').textContent = Math.round(res.spinRpm);
        }
    }
}
