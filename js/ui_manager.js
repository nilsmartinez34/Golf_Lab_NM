/**
 * UI MANAGER - Handles global state, canvas rendering, and navigation.
 */

window.uiManager = {
    showModal: function (contentHTML) {
        const modal = document.getElementById('memo-modal');
        const body = document.getElementById('memo-body');
        if (modal && body) {
            body.innerHTML = contentHTML;
            modal.style.display = 'flex';
        }
    }
};

window.appState = {
    mode: 'swing',
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

    history: JSON.parse(localStorage.getItem('golf_history')) || [],

    weather: {
        altitude: 0,
        temp: 20,
        windSpeed: 0,
        windDir: 0
    },

    chipBallPos: 0,
    chipGreenSpeed: 10,
    chipBounds: {
        maxDist: 40,
        maxHeight: 20,
        minHeight: -10
    }
};

const PIXELS_PER_METER = 50;

/**
 * INTERPOLATE COLOR BASED ON SPEED
 * Returns a color between Green (slow) and Red (fast).
 * @param {number} speed Current speed
 * @param {number} maxSpeed Max speed for normalization
 */
function getSpeedColor(speed, maxSpeed) {
    if (!maxSpeed || maxSpeed <= 0) {
        return 'rgba(255,255,255,1)'; // Fallback: white
    }
    const ratio = Math.max(0, Math.min(1, speed / maxSpeed));
    // Green (0, 255, 0) to Red (255, 0, 0)
    const r = Math.round(255 * ratio);
    const g = Math.round(255 * (1 - ratio));
    const b = 0;
    return `rgba(${r},${g},${b},1)`;
}

window.initTabs = function () {
    const tabSwing = document.getElementById('tab-swing');
    const tabChip = document.getElementById('tab-chip');
    const tabPutt = document.getElementById('tab-putt');

    if (tabSwing) tabSwing.onclick = () => { console.log("Tab Swing Clicked"); window.switchMode('swing'); };
    if (tabChip) tabChip.onclick = () => { console.log("Tab Chip Clicked"); window.switchMode('chip'); };
    if (tabPutt) tabPutt.onclick = () => { console.log("Tab Putt Clicked"); window.switchMode('putt'); };
};

window.initUI = function () {
    console.log("Initializing Shared UI Components");
    // Settings Modal
    const settingsModal = document.getElementById('settings-modal');
    const weatherHud = document.getElementById('weather-hud');
    if (weatherHud) weatherHud.onclick = () => settingsModal.style.display = 'flex';

    const btnCloseSettings = document.getElementById('btnCloseSettings');
    if (btnCloseSettings) btnCloseSettings.onclick = () => settingsModal.style.display = 'none';

    // History Modal
    const historyModal = document.getElementById('history-modal');
    const btnCloseHistory = document.getElementById('btnCloseHistory');
    if (btnCloseHistory) btnCloseHistory.onclick = () => historyModal.style.display = 'none';

    const btnCloseMemo = document.getElementById('btnCloseMemo');
    if (btnCloseMemo) btnCloseMemo.onclick = () => {
        document.getElementById('memo-modal').style.display = 'none';
    };

    // Close on backdrop click
    window.onclick = (event) => {
        if (event.target == settingsModal) settingsModal.style.display = "none";
        if (event.target == historyModal) historyModal.style.display = "none";
        if (event.target == document.getElementById('memo-modal')) {
            document.getElementById('memo-modal').style.display = "none";
        }
    };

    // Weather HUD sync
    window.updateWeatherHUD();

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

window.updateWeatherHUD = function () {
    const w = appState.weather;
    const arrow = document.getElementById('wind-arrow');
    const speed = document.getElementById('wind-speed-hud');
    if (arrow) arrow.style.transform = `rotate(${w.windDir}deg)`;
    if (speed) speed.textContent = w.windSpeed > 0 ? `${w.windSpeed} km/h` : "NUL";

    const extra = document.getElementById('alt-temp-hud');
    if (extra) extra.textContent = `${w.altitude}m · ${w.temp}°C`;
};

window.initMainCanvas = function () {
    const canvas = document.getElementById('golfCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    window.resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        window.drawBackground(ctx, canvas);
    };
    window.onresize = window.resizeCanvas;
    window.resizeCanvas();
};

window.drawBackground = function (ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (appState.mode === 'swing') {
        window.drawSwingGrid(ctx, canvas);
        if (appState.trajectoryResult && !appState.trajectoryResult.isPutt && !appState.isAnimating) {
            window.drawPersistentSwingTrajectory(ctx, canvas, appState.trajectoryResult);
        }
    } else if (appState.mode === 'chip') {
        window.drawChipProfile(ctx, canvas);
        if (appState.trajectoryResult && !appState.trajectoryResult.isPutt && !appState.isAnimating) {
            window.drawPersistentChipProfile(ctx, canvas, appState.trajectoryResult);
        }
    } else {
        window.drawPuttGrid(ctx, canvas);
        if (appState.trajectoryResult && appState.trajectoryResult.isPutt && !appState.isAnimating) {
            window.drawPersistentTrajectory(ctx, canvas, appState.trajectoryResult);
        }
    }
};

window.drawSwingGrid = function (ctx, canvas) {
    const horizonY = canvas.height * 0.38;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGradient.addColorStop(0, '#1E40AF');
    skyGradient.addColorStop(1, '#60A5FA');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, horizonY);

    const groundGradient = ctx.createLinearGradient(0, horizonY, 0, canvas.height);
    groundGradient.addColorStop(0, '#064E3B');
    groundGradient.addColorStop(1, '#10B981');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);

    const groundStartY = canvas.height * 0.88;
    const groundRange = groundStartY - horizonY;
    const k = 0.0052;

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

    for (let d = 0; d <= 300; d += 50) {
        const scale = Math.exp(-k * d);
        const y = horizonY + (groundRange * scale);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(`${d}m`, 10, y - 5);
    }
}

window.drawChipProfile = function (ctx, canvas) {
    const { maxDist, maxHeight, minHeight } = appState.chipBounds;
    const totalHeightRange = maxHeight - minHeight;

    // Ground line at Y=0, positioned proportionally
    const groundY = canvas.height * (1 - (0 - minHeight) / totalHeightRange); // ~67% from top

    // Sky gradient (above ground)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
    skyGrad.addColorStop(0, '#1E3A8A');
    skyGrad.addColorStop(1, '#3B82F6');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, groundY);

    // Ground (below Y=0)
    ctx.fillStyle = '#15803D';
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.font = '10px Inter';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'center';

    const pxPerM = canvas.width / maxDist;
    const verticalPxPerM = canvas.height / totalHeightRange;

    // Vertical grid lines (distance markers)
    for (let d = 0; d <= maxDist; d += 5) {
        const x = d * pxPerM;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        if (d % 10 === 0) {
            ctx.fillText(`${d}m`, x, groundY + 15);
        }
    }

    // Horizontal grid lines (height markers)
    for (let h = minHeight; h <= maxHeight; h += 5) {
        const y = groundY - (h * verticalPxPerM);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        // Label significant heights
        if (h % 10 === 0 || h === 0) {
            ctx.textAlign = 'left';
            ctx.fillText(`${h}m`, 5, y - 3);
            ctx.textAlign = 'center';
        }
    }
};

window.drawPuttGrid = function (ctx, canvas) {
    // 1. Bird's Eye Green Background
    const greenGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 50, canvas.width / 2, canvas.height / 2, canvas.width);
    greenGrad.addColorStop(0, '#065F46'); // Darker center
    greenGrad.addColorStop(1, '#064E3B'); // Very dark edges
    ctx.fillStyle = greenGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height - 100;
    const gridStep = 0.5 * PIXELS_PER_METER;

    ctx.strokeStyle = 'rgba(74, 222, 128, 0.15)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px Inter';

    // Vertical Lines & Lateral Labels
    ctx.textAlign = 'center';
    for (let x = cx, d = 0; x < canvas.width; x += gridStep, d += 0.5) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        if (d > 0 && Number.isInteger(d)) ctx.fillText(`${d}m R`, x, cy + 20);
    }
    for (let x = cx - gridStep, d = 0.5; x > 0; x -= gridStep, d += 0.5) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        if (Number.isInteger(d)) ctx.fillText(`${d}m L`, x, cy + 20);
    }

    // Horizontal Lines & Depth Labels
    ctx.textAlign = 'left';
    for (let y = cy, d = 0; y < canvas.height; y += gridStep, d += 0.5) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        if (d > 0 && Number.isInteger(d)) ctx.fillText(`+${d}m`, cx + 10, y - 2);
    }
    for (let y = cy - gridStep, d = 0.5; y > 0; y -= gridStep, d += 0.5) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        if (Number.isInteger(d)) {
            const label = d === appState.puttDist ? `HOLE (${d}m)` : `${d}m`;
            ctx.fillStyle = d === appState.puttDist ? '#4ADE80' : 'rgba(255, 255, 255, 0.4)';
            ctx.fillText(label, cx + 10, y - 2);
        }
    }

    // 2. Start Position (Ball)
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1; ctx.stroke();

    // 3. Aim Target (Crosshair)
    const aimAngleRad = appState.puttAim * Math.PI / 180;
    const aimDisplacement = appState.puttPlayAs * Math.sin(aimAngleRad);
    const aimDepth = appState.puttPlayAs * Math.cos(aimAngleRad);
    const aimX = cx + aimDisplacement * PIXELS_PER_METER;
    const aimY = cy - aimDepth * PIXELS_PER_METER;

    ctx.strokeStyle = '#FACC15'; // Yellow Aim
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(aimX - 10, aimY); ctx.lineTo(aimX + 10, aimY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(aimX, aimY - 10); ctx.lineTo(aimX, aimY + 10); ctx.stroke();

    // 4. Hole (The Goal)
    const holeY = cy - appState.puttDist * PIXELS_PER_METER;
    ctx.fillStyle = '#000000';
    ctx.beginPath(); ctx.arc(cx, holeY, 9, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4ADE80'; ctx.lineWidth = 2; ctx.stroke();

    // Flagstick shadow/base representation
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath(); ctx.arc(cx, holeY, 2, 0, Math.PI * 2); ctx.fill();
}

window.drawPersistentSwingTrajectory = function (ctx, canvas, result) {
    if (!result.path || result.isPutt) return;
    const hY = canvas.height * 0.38, gY = canvas.height * 0.88, gR = gY - hY, k = 0.0052, VIEW_SCALE = 20.0;
    const flightEnd = result.flightPathEndIndex || result.path.length;

    let maxSpeed = 0;
    result.path.forEach(p => { if (p.speed > maxSpeed) maxSpeed = p.speed; });

    ctx.lineWidth = 2;
    for (let i = 1; i < result.path.length; i++) {
        const p0 = result.path[i - 1];
        const p1 = result.path[i];
        const sc0 = Math.exp(-k * p0.x), sc1 = Math.exp(-k * p1.x);
        const sx0 = (canvas.width * 0.5) + (p0.y * sc0 * VIEW_SCALE);
        const sy0 = (hY + (gR * sc0)) - (p0.z * sc0 * VIEW_SCALE);
        const sx1 = (canvas.width * 0.5) + (p1.y * sc1 * VIEW_SCALE);
        const sy1 = (hY + (gR * sc1)) - (p1.z * sc1 * VIEW_SCALE);

        if (i <= flightEnd) {
            ctx.strokeStyle = getSpeedColor(p1.speed || 0, maxSpeed);
        } else {
            ctx.strokeStyle = '#FACC15'; // Roll
        }

        ctx.beginPath();
        ctx.moveTo(sx0, sy0);
        ctx.lineTo(sx1, sy1);
        ctx.stroke();
    }
};

window.drawPersistentTrajectory = function (ctx, canvas, result) {
    if (!result.isPutt) return;
    const cx = canvas.width / 2, cy = canvas.height - 100;

    let maxSpeed = 0;
    result.path.forEach(p => { if (p.speed > maxSpeed) maxSpeed = p.speed; });

    ctx.lineWidth = 2;
    for (let i = 1; i < result.path.length; i++) {
        const p0 = result.path[i - 1];
        const p1 = result.path[i];
        const px0 = cx + p0.x * PIXELS_PER_METER, py0 = cy - p0.y * PIXELS_PER_METER;
        const px1 = cx + p1.x * PIXELS_PER_METER, py1 = cy - p1.y * PIXELS_PER_METER;

        ctx.strokeStyle = getSpeedColor(p1.speed || 0, maxSpeed);
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.stroke();
    }

    if (result.apexPoint) {
        const ax = cx + result.apexPoint.x * PIXELS_PER_METER, ay = cy - result.apexPoint.y * PIXELS_PER_METER;
        ctx.fillStyle = '#FACC15'; ctx.beginPath(); ctx.arc(ax, ay, 4, 0, Math.PI * 2); ctx.fill();
    }
};

window.drawPersistentChipProfile = function (ctx, canvas, result) {
    const { maxDist, maxHeight, minHeight } = appState.chipBounds;
    const totalHeightRange = maxHeight - minHeight;

    const groundY = canvas.height * (1 - (0 - minHeight) / totalHeightRange);
    const pxPerM = canvas.width / maxDist;
    const verticalPxPerM = canvas.height / totalHeightRange;

    const flightEnd = result.flightPathEndIndex || result.path.length;

    // Determine max speed during flight for color normalization
    let maxSpeed = 0;
    for (let i = 0; i < flightEnd; i++) {
        const p = result.path[i];
        if (p && typeof p.speed === 'number' && p.speed > maxSpeed) {
            maxSpeed = p.speed;
        }
    }

    // Draw flight phase with speed-based color
    ctx.lineWidth = 2;
    for (let i = 1; i < flightEnd; i++) {
        const p0 = result.path[i - 1];
        const p1 = result.path[i];
        if (!p0 || !p1) continue;
        const speed = typeof p1.speed === 'number' ? p1.speed : 0;
        ctx.strokeStyle = getSpeedColor(speed, maxSpeed);
        ctx.beginPath();
        const x0 = p0.x * pxPerM;
        const y0 = groundY - (p0.z * verticalPxPerM);
        const x1 = p1.x * pxPerM;
        const y1 = groundY - (p1.z * verticalPxPerM);
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    }

    // Draw roll phase (yellow)
    ctx.beginPath();
    ctx.strokeStyle = '#FACC15';
    for (let i = flightEnd - 1; i < result.path.length; i++) {
        if (i < 0) continue;
        const p = result.path[i];
        const cx = p.x * pxPerM;
        const cy = groundY - (p.z * verticalPxPerM);
        if (i === flightEnd - 1) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
};

window.animate = function (result) {
    const canvas = document.getElementById('golfCanvas');
    const ctx = canvas.getContext('2d');
    let frame = 0;
    appState.isAnimating = true;
    const isPutt = result.isPutt;
    const cx = canvas.width / 2, cy = canvas.height - 100;

    function step() {
        if (frame >= result.path.length) {
            appState.isAnimating = false;
            drawBackground(ctx, canvas);
            return;
        }
        drawBackground(ctx, canvas);
        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;

        if (isPutt) {
            let maxSpeed = 0;
            result.path.forEach(p => { if (p.speed > maxSpeed) maxSpeed = p.speed; });

            for (let i = 1; i <= frame && i < result.path.length; i++) {
                const p0 = result.path[i - 1];
                const p1 = result.path[i];
                ctx.strokeStyle = getSpeedColor(p1.speed || 0, maxSpeed);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx + p0.x * PIXELS_PER_METER, cy - p0.y * PIXELS_PER_METER);
                ctx.lineTo(cx + p1.x * PIXELS_PER_METER, cy - p1.y * PIXELS_PER_METER);
                ctx.stroke();
            }
            const currentP = result.path[frame];
            if (currentP) {
                ctx.fillStyle = 'white';
                ctx.beginPath(); ctx.arc(cx + currentP.x * PIXELS_PER_METER, cy - currentP.y * PIXELS_PER_METER, 5, 0, Math.PI * 2); ctx.fill();
            }
        } else if (appState.mode === 'chip') {
            const { maxDist, minHeight: minH, maxHeight: maxH } = appState.chipBounds;
            const totalH = maxH - minH;
            const groundY = canvas.height * (1 - (0 - minH) / totalH);
            const pxPerM = canvas.width / maxDist;
            const verticalPxPerM = canvas.height / totalH;
            const flightEnd = result.flightPathEndIndex || result.path.length;

            let maxSpeed = 0;
            result.path.forEach(p => { if (p.speed > maxSpeed) maxSpeed = p.speed; });

            for (let i = 1; i <= frame && i < result.path.length; i++) {
                const p0 = result.path[i - 1];
                const p1 = result.path[i];
                if (!p0 || !p1) continue;

                if (i <= flightEnd) {
                    ctx.strokeStyle = getSpeedColor(p1.speed || 0, maxSpeed);
                } else {
                    ctx.strokeStyle = '#FACC15';
                }

                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(p0.x * pxPerM, groundY - (p0.z * verticalPxPerM));
                ctx.lineTo(p1.x * pxPerM, groundY - (p1.z * verticalPxPerM));
                ctx.stroke();
            }
            const currentP = result.path[frame];
            if (currentP) {
                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(currentP.x * pxPerM, groundY - (currentP.z * verticalPxPerM), 4, 0, Math.PI * 2); ctx.fill();
            }
        } else {
            const hY = canvas.height * 0.38, gY = canvas.height * 0.88, gR = gY - hY, k = 0.0052, VS = 20.0, flightEnd = result.flightPathEndIndex || result.path.length;

            let maxSpeed = 0;
            result.path.forEach(p => { if (p.speed > maxSpeed) maxSpeed = p.speed; });

            for (let i = 1; i <= frame && i < result.path.length; i++) {
                const p0 = result.path[i - 1];
                const p1 = result.path[i];
                if (!p0 || !p1) continue;

                const sc0 = Math.exp(-k * p0.x), sc1 = Math.exp(-k * p1.x);
                const x0 = (canvas.width * 0.5) + (p0.y * sc0 * VS), y0 = (hY + (gR * sc0)) - (p0.z * sc0 * VS);
                const x1 = (canvas.width * 0.5) + (p1.y * sc1 * VS), y1 = (hY + (gR * sc1)) - (p1.z * sc1 * VS);

                if (i <= flightEnd) {
                    ctx.strokeStyle = getSpeedColor(p1.speed || 0, maxSpeed);
                } else {
                    ctx.strokeStyle = '#FACC15';
                }

                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
            }

            const currentP = result.path[frame];
            if (currentP) {
                const sc = Math.exp(-k * currentP.x);
                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc((canvas.width * 0.5) + (currentP.y * sc * VS), (hY + (gR * sc)) - (currentP.z * sc * VS), Math.max(2, 6 * sc), 0, Math.PI * 2); ctx.fill();
            }
        }
        frame += 2;
        requestAnimationFrame(step);
    }
    step();
};

window.addHistoryItem = function (type, result) {
    const item = {
        type,
        club: appState.currentClub.name,
        mainVal: type === 'Swing' ? `${result.carryDistance.toFixed(1)} M` : `${result.totalDistance.toFixed(1)} M`,
        subVal: type === 'Swing' ? `${Math.round(result.spinRpm)} RPM` : `${result.finalX.toFixed(2)}m Error`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    appState.history.unshift(item);
    localStorage.setItem('golf_history', JSON.stringify(appState.history));
    renderHistory();
};

function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
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



const memoBtn = document.getElementById('btn-memo-trigger');
if (memoBtn) {
    memoBtn.addEventListener('click', () => {
        const memoHTML = `
            <div class="memo-content">
                <h2 style="margin-top:0; color:#4ADE80;">MÉMO STRATÉGIQUE</h2>
                
                <div class="memo-section" style="border-color: #4ADE80;">
                    <h3>🟢 PUTTING (Stimp 10)</h3>
                    <table class="memo-table">
                        <tr><td>Aim Point</td><td><b>7.5 cm</b> / degré de pente</td></tr>
                        <tr><td>Play As (Montée)</td><td><b>+12 cm</b> / degré</td></tr>
                        <tr><td>Play As (Descente)</td><td><b>-10 cm</b> / degré</td></tr>
                    </table>
                </div>

                <div class="memo-section" style="border-color: #FACC15;">
                    <h3 style="color:#FACC15;">🟡 CHIPPING (Ratio Portée:Roule)</h3>
                    <table class="memo-table">
                        <tr><th>Club</th><th>Ratio</th><th>Usage</th></tr>
                        <tr><td>7i</td><td><b>1 : 4.3</b></td><td>Bump & Run</td></tr>
                        <tr><td>PW</td><td><b>1 : 2.7</b></td><td>Standard</td></tr>
                        <tr><td>SW</td><td><b>1 : 2.0</b></td><td>Zone courte</td></tr>
                        <tr><td>LW</td><td><b>1 : 1.7</b></td><td>Lobé</td></tr>
                        <tr><td>Put</td><td><b>1 : 39</b></td><td>Bord de green</td></tr>
                    </table>
                </div>

                <div class="memo-section" style="border-color: #F87171;">
                    <h3 style="color:#F87171;">🔴 SWING : VENT (105mph)</h3>
                    <table class="memo-table">
                        <tr><th>Vent</th><th>10 km/h</th><th>20 km/h</th></tr>
                        <tr><td>Face</td><td>-2.1m (+0.8m h)</td><td>-4.5m (+1.9m h)</td></tr>
                        <tr><td>Dos</td><td>+1.6m (-0.5m h)</td><td>+3.2m (-1.1m h)</td></tr>
                        <tr><td>Latéral</td><td>1.8m dérive</td><td>3.7m dérive</td></tr>
                    </table>
                </div>
            </div>
        `;
        window.uiManager.showModal(memoHTML);
    });
}
