/**
 * UI MANAGER - Handles global state, canvas rendering, and navigation.
 */

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

function chipSpeedToColor(speed, maxSpeed) {
    if (!maxSpeed || maxSpeed <= 0) {
        return 'rgba(255,255,255,1)'; // Fallback: white
    }
    const ratio = Math.max(0, Math.min(1, speed / maxSpeed));
    // Interpolate between white (0) and a bright green (max)
    const r = Math.round(255 + (34 - 255) * ratio);  // 255 -> 34
    const g = Math.round(255 + (197 - 255) * ratio); // 255 -> 197
    const b = Math.round(255 + (94 - 255) * ratio);  // 255 -> 94
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

    // Close on backdrop click
    window.onclick = (event) => {
        if (event.target == settingsModal) settingsModal.style.display = "none";
        if (event.target == historyModal) historyModal.style.display = "none";
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
    ctx.fillStyle = '#064E3B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height - 100;
    const gridStep = 0.5 * PIXELS_PER_METER;

    ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
    ctx.lineWidth = 1;

    for (let x = cx; x < canvas.width; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let x = cx - gridStep; x > 0; x -= gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = cy; y < canvas.height; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    for (let y = cy - gridStep; y > 0; y -= gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

    const aimAngleRad = appState.puttAim * Math.PI / 180;
    const aimDisplacement = appState.puttPlayAs * Math.sin(aimAngleRad);
    const aimDepth = appState.puttPlayAs * Math.cos(aimAngleRad);

    const aimX = cx + aimDisplacement * PIXELS_PER_METER;
    const aimY = cy - aimDepth * PIXELS_PER_METER;
    ctx.strokeStyle = '#4ADE80';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(aimX - 8, aimY); ctx.lineTo(aimX + 8, aimY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(aimX, aimY - 8); ctx.lineTo(aimX, aimY + 8); ctx.stroke();

    const holeY = cy - appState.puttDist * PIXELS_PER_METER;
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.arc(cx, holeY, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4ADE80'; ctx.lineWidth = 1; ctx.stroke();
}

window.drawPersistentSwingTrajectory = function (ctx, canvas, result) {
    if (!result.path || result.isPutt) return;
    const hY = canvas.height * 0.38, gY = canvas.height * 0.88, gR = gY - hY, k = 0.0052, VIEW_SCALE = 20.0;
    ctx.beginPath(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; ctx.lineWidth = 2;
    result.path.forEach((p, i) => {
        const sc = Math.exp(-k * p.x);
        const sx = (canvas.width * 0.5) + (p.y * sc * VIEW_SCALE);
        const sy = (hY + (gR * sc)) - (p.z * sc * VIEW_SCALE);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    });
    ctx.stroke();
};

window.drawPersistentTrajectory = function (ctx, canvas, result) {
    if (!result.isPutt) return;
    const cx = canvas.width / 2, cy = canvas.height - 100;
    ctx.beginPath(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 2;
    result.path.forEach((p, i) => {
        const px = cx + p.x * PIXELS_PER_METER, py = cy - p.y * PIXELS_PER_METER;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();
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
        ctx.strokeStyle = chipSpeedToColor(speed, maxSpeed);
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
            for (let i = 0; i <= frame; i++) {
                const p = result.path[i];
                ctx.lineTo(cx + p.x * PIXELS_PER_METER, cy - p.y * PIXELS_PER_METER);
            }
            ctx.stroke();
            const p = result.path[frame];
            ctx.fillStyle = 'white';
            ctx.beginPath(); ctx.arc(cx + p.x * PIXELS_PER_METER, cy - p.y * PIXELS_PER_METER, 5, 0, Math.PI * 2); ctx.fill();
        } else if (appState.mode === 'chip') {
            const { maxDist, minHeight: minH, maxHeight: maxH } = appState.chipBounds;
            const totalH = maxH - minH;
            const groundY = canvas.height * (1 - (0 - minH) / totalH);
            const pxPerM = canvas.width / maxDist;
            const verticalPxPerM = canvas.height / totalH;
            const flightEnd = result.flightPathEndIndex || result.path.length;

            // Compute max speed during flight for color normalization
            let maxSpeed = 0;
            for (let i = 0; i < flightEnd; i++) {
                const p = result.path[i];
                if (p && typeof p.speed === 'number' && p.speed > maxSpeed) {
                    maxSpeed = p.speed;
                }
            }

            // Draw up to current frame with speed-based color on flight, yellow on roll
            for (let i = 1; i <= frame && i < result.path.length; i++) {
                const p0 = result.path[i - 1];
                const p1 = result.path[i];
                if (!p0 || !p1) continue;

                const x0 = p0.x * pxPerM;
                const y0 = groundY - (p0.z * verticalPxPerM);
                const x1 = p1.x * pxPerM;
                const y1 = groundY - (p1.z * verticalPxPerM);

                if (i <= flightEnd) {
                    const speed = typeof p1.speed === 'number' ? p1.speed : 0;
                    ctx.strokeStyle = chipSpeedToColor(speed, maxSpeed);
                } else {
                    ctx.strokeStyle = '#FACC15';
                }

                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
            }
            const p = result.path[frame];
            ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(p.x * pxPerM, groundY - (p.z * verticalPxPerM), 4, 0, Math.PI * 2); ctx.fill();
        } else {
            const hY = canvas.height * 0.38, gY = canvas.height * 0.88, gR = gY - hY, k = 0.0052, VS = 20.0, flightEnd = result.flightPathEndIndex || result.path.length;
            ctx.beginPath();
            for (let i = 0; i <= frame; i++) {
                const p = result.path[i], sc = Math.exp(-k * p.x), x = (canvas.width * 0.5) + (p.y * sc * VS), y = (hY + (gR * sc)) - (p.z * sc * VS);
                if (i === flightEnd) { ctx.stroke(); ctx.beginPath(); ctx.strokeStyle = '#FACC15'; ctx.moveTo(x, y); }
                else if (i === 0) { ctx.moveTo(x, y); ctx.strokeStyle = '#FFFFFF'; }
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            const p = result.path[frame], sc = Math.exp(-k * p.x);
            ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc((canvas.width * 0.5) + (p.y * sc * VS), (hY + (gR * sc)) - (p.z * sc * VS), Math.max(2, 6 * sc), 0, Math.PI * 2); ctx.fill();
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
