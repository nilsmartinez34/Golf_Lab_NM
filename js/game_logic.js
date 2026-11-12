/**
 * GAME LOGIC - Procedural Course Play (Swing -> Chip -> Putt)
 * With stochastic uncertainty on high power (0% from 0-90%, up to +/-5% at 100%).
 */

window.gameState = {
    holeNumber: 1,
    totalHoles: 3,
    currentHole: null,
    strokeCount: 1,
    scores: [],
    totalDiffToPar: 0,
    ballPosition: {
        distanceToPin: 360,
        lateralOffset: 0,
        lie: 'tee' // 'tee', 'fairway', 'rough', 'sand', 'green', 'in_hole'
    },
    phase: 'swing', // 'swing', 'chip', 'putt'
    selectedClub: 'Dr',
    powerMph: 100,
    pathDeg: 0,
    faceDeg: 0,
    attackDeg: 0,
    // Putting params
    puttAimDeg: 0,
    puttEffortMeters: 5,
    isHoleFinished: false
};

const COURSE_PARS = [4, 3, 5]; // 3-hole mini-course by default

window.initGameUI = function () {
    console.log("Initializing Game UI (Course Mode)");

    if (!window.gameState.currentHole) {
        window.startNewHole(window.gameState.holeNumber);
    } else {
        window.updateGameHUD();
        window.renderPhaseControls();
    }

    const btnNextHole = document.getElementById('btn-next-hole');
    if (btnNextHole) {
        btnNextHole.onclick = () => window.advanceToNextHole();
    }
};

window.startNewHole = function (holeNum) {
    const par = COURSE_PARS[(holeNum - 1) % COURSE_PARS.length] || 4;
    let dist = 360;
    if (par === 3) dist = Math.round(135 + Math.random() * 45); // 135 - 180m
    else if (par === 4) dist = Math.round(310 + Math.random() * 80); // 310 - 390m
    else if (par === 5) dist = Math.round(470 + Math.random() * 55); // 470 - 525m

    const slopeX = parseFloat(((Math.random() * 5.0) - 2.5).toFixed(1)); // -2.5° à +2.5°
    const slopeY = parseFloat(((Math.random() * 3.0) - 1.5).toFixed(1)); // -1.5° à +1.5°
    const windSpeed = Math.round(5 + Math.random() * 25);
    const windDir = Math.round(Math.random() * 36) * 10;

    window.gameState.currentHole = {
        number: holeNum,
        par: par,
        totalDistance: dist,
        greenSlopeX: slopeX,
        greenSlopeY: slopeY,
        stimp: 10,
        greenRadius: 15,
        wind: { speed: windSpeed, dir: windDir }
    };

    // Sync atmospheric weather with appState
    if (window.appState) {
        window.appState.weather.windSpeed = windSpeed;
        window.appState.weather.windDir = windDir;
        if (window.updateWeatherHUD) window.updateWeatherHUD();
    }

    window.gameState.strokeCount = 1;
    window.gameState.isHoleFinished = false;
    window.gameState.ballPosition = {
        distanceToPin: dist,
        lateralOffset: 0,
        lie: 'tee'
    };

    // Default club recommendation
    if (par === 3) {
        window.gameState.selectedClub = dist > 165 ? '5i' : dist > 150 ? '6i' : '7i';
    } else {
        window.gameState.selectedClub = 'Dr';
    }

    const club = PhysicsEngine.GOLF_BAG[window.gameState.selectedClub];
    window.gameState.powerMph = club.standardSpeedMph || 90;
    window.gameState.pathDeg = 0;
    window.gameState.faceDeg = 0;

    window.determinePhase();
    window.updateGameHUD();
    window.renderPhaseControls();

    const overlay = document.getElementById('game-hole-modal');
    if (overlay) overlay.style.display = 'none';

    if (window.resizeCanvas) window.resizeCanvas();
};

window.determinePhase = function () {
    const pos = window.gameState.ballPosition;
    if (pos.lie === 'in_hole') return;

    if (pos.lie === 'green' || pos.distanceToPin <= 15) {
        window.gameState.phase = 'putt';
        pos.lie = 'green';
        window.gameState.puttEffortMeters = Math.max(1, pos.distanceToPin);
        window.gameState.puttAimDeg = 0;
    } else if (pos.distanceToPin <= 50) {
        window.gameState.phase = 'chip';
        if (!['PW', 'SW', 'LW', '7i'].includes(window.gameState.selectedClub)) {
            window.gameState.selectedClub = 'SW';
        }
    } else {
        window.gameState.phase = 'swing';
    }
};

window.updateGameHUD = function () {
    const s = window.gameState;
    const hole = s.currentHole;
    if (!hole) return;

    const elHole = document.getElementById('game-val-hole');
    const elPar = document.getElementById('game-val-par');
    const elDist = document.getElementById('game-val-dist');
    const elStroke = document.getElementById('game-val-stroke');
    const elLie = document.getElementById('game-val-lie');
    const elScore = document.getElementById('game-val-score');
    const elPhase = document.getElementById('game-val-phase');

    if (elHole) elHole.textContent = hole.number;
    if (elPar) elPar.textContent = `PAR ${hole.par}`;
    if (elDist) elDist.textContent = Math.round(s.ballPosition.distanceToPin);
    if (elStroke) elStroke.textContent = s.strokeCount;
    if (elLie) elLie.textContent = s.ballPosition.lie.toUpperCase();

    // Score to Par display
    if (elScore) {
        const diff = s.totalDiffToPar;
        elScore.textContent = diff === 0 ? 'E' : diff > 0 ? `+${diff}` : `${diff}`;
        elScore.style.color = diff < 0 ? '#F87171' : diff === 0 ? '#4ADE80' : '#FBBF24';
    }
    if (elPhase) elPhase.textContent = s.phase.toUpperCase();

    // Lie HUD description
    const hudLieLabel = document.getElementById('game-hud-lie-label');
    const hudDispersion = document.getElementById('game-hud-dispersion');
    if (hudLieLabel) {
        if (s.ballPosition.lie === 'tee') hudLieLabel.textContent = "TEE (100%)";
        else if (s.ballPosition.lie === 'fairway') hudLieLabel.textContent = "FAIRWAY (100%)";
        else if (s.ballPosition.lie === 'rough') hudLieLabel.textContent = "ROUGH (-12%)";
        else if (s.ballPosition.lie === 'sand') hudLieLabel.textContent = "BUNKER (-28%)";
        else if (s.ballPosition.lie === 'green') hudLieLabel.textContent = `GREEN (Pente ${hole.greenSlopeX}°X)`;
    }

    // Risk / Over-swing HUD (Rule: 0% up to 90%, +/-5% at 100%)
    const club = PhysicsEngine.GOLF_BAG[s.selectedClub] || PhysicsEngine.GOLF_BAG['Dr'];
    const risk = PhysicsEngine.calculateRiskFactor(club, s.powerMph, s.ballPosition.lie);

    const hudRiskLabel = document.getElementById('game-hud-risk-label');
    const hudRiskPct = document.getElementById('game-hud-risk-pct');
    if (hudRiskLabel && hudRiskPct) {
        const pct = (risk.maxVariationPercent * 100).toFixed(1);
        hudRiskPct.textContent = `±${pct}%`;

        if (risk.maxVariationPercent === 0) {
            hudRiskLabel.textContent = "CONTRÔLE (0%)";
            hudRiskLabel.style.color = "#4ADE80";
        } else if (risk.maxVariationPercent <= 2.5) {
            hudRiskLabel.textContent = "MODÉRÉ (±" + pct + "%)";
            hudRiskLabel.style.color = "#FACC15";
        } else {
            hudRiskLabel.textContent = "OVER-SWING (±" + pct + "%)";
            hudRiskLabel.style.color = "#EF4444";
        }
    }
};

window.renderPhaseControls = function () {
    const container = document.getElementById('game-controls-container');
    if (!container) return;

    const s = window.gameState;

    if (s.phase === 'swing') {
        const club = PhysicsEngine.GOLF_BAG[s.selectedClub] || PhysicsEngine.GOLF_BAG['Dr'];
        const maxSpeed = Math.round((club.standardSpeedMph || 90) * 1.10);
        const minSpeed = Math.round(maxSpeed * 0.5);

        container.innerHTML = `
            <div class="swing-dashboard-compact">
                <div class="control-item speed-h">
                    <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                        <span class="ctrl-label-mini">FORCE / VITESSE</span>
                        <span id="game-risk-badge" class="risk-badge">Zone Contrôle (0%)</span>
                    </div>
                    <div class="h-slider-container">
                        <input type="range" id="game-input-power" min="${minSpeed}" max="${maxSpeed}" value="${s.powerMph}" class="h-slider-input speed-slider">
                        <div id="game-speed-fill" class="speed-gauge-fill-h"></div>
                    </div>
                    <span id="game-speed-label" class="ctrl-value-mini">${s.powerMph} MPH (${Math.round((s.powerMph / maxSpeed) * 100)}%)</span>
                </div>
                <div class="h-controls-compact">
                    <div class="control-item h-item-compact">
                        <span class="ctrl-label-mini">PATH</span>
                        <div class="angle-adjust-group">
                            <div class="angle-buttons-vertical">
                                <button class="angle-btn" id="game-btn-path-plus">+</button>
                                <button class="angle-btn" id="game-btn-path-minus">−</button>
                            </div>
                            <span id="game-path-label" class="angle-value">${s.pathDeg > 0 ? '+' : ''}${s.pathDeg.toFixed(1)}°</span>
                        </div>
                    </div>
                    <div class="control-item h-item-compact">
                        <span class="ctrl-label-mini">FACE</span>
                        <div class="angle-adjust-group">
                            <div class="angle-buttons-vertical">
                                <button class="angle-btn" id="game-btn-face-plus">+</button>
                                <button class="angle-btn" id="game-btn-face-minus">−</button>
                            </div>
                            <span id="game-face-label" class="angle-value">${s.faceDeg > 0 ? '+' : ''}${s.faceDeg.toFixed(1)}°</span>
                        </div>
                    </div>
                    <button class="action-btn-punchy-compact" id="btnGameSwing">FRAPPER</button>
                </div>
            </div>
            <div class="club-belt-container">
                <div class="club-belt" id="game-club-belt"></div>
            </div>
        `;

        // Bind club belt
        const belt = document.getElementById('game-club-belt');
        if (belt) {
            belt.innerHTML = '';
            ['Dr', '3W', '4i', '5i', '6i', '7i', '8i', '9i', 'PW', 'SW', 'LW'].forEach(code => {
                const item = document.createElement('div');
                item.className = `club-item ${code === s.selectedClub ? 'active' : ''}`;
                item.textContent = code;
                item.onclick = () => {
                    document.querySelectorAll('#game-club-belt .club-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    s.selectedClub = code;
                    const c = PhysicsEngine.GOLF_BAG[code];
                    s.powerMph = c.standardSpeedMph || 85;
                    window.renderPhaseControls();
                    window.updateGameHUD();
                };
                belt.appendChild(item);
            });
        }

        // Bind Power Slider
        const powerInput = document.getElementById('game-input-power');
        if (powerInput) {
            powerInput.oninput = (e) => {
                s.powerMph = parseFloat(e.target.value);
                const pct = Math.round((s.powerMph / maxSpeed) * 100);
                document.getElementById('game-speed-label').textContent = `${s.powerMph} MPH (${pct}%)`;

                const fill = document.getElementById('game-speed-fill');
                if (fill) fill.style.width = `${pct}%`;

                // Risk badge
                const badge = document.getElementById('game-risk-badge');
                const risk = PhysicsEngine.calculateRiskFactor(club, s.powerMph, s.ballPosition.lie);
                if (badge) {
                    if (risk.maxVariationPercent === 0) {
                        badge.textContent = "Zone Contrôle (0%)";
                        badge.className = "risk-badge badge-green";
                    } else {
                        const varPct = (risk.maxVariationPercent * 100).toFixed(1);
                        badge.textContent = `Risque Décentrage (±${varPct}%)`;
                        badge.className = risk.maxVariationPercent > 0.025 ? "risk-badge badge-red" : "risk-badge badge-orange";
                    }
                }
                window.updateGameHUD();
            };
        }

        // Bind Path & Face
        const bPathP = document.getElementById('game-btn-path-plus');
        const bPathM = document.getElementById('game-btn-path-minus');
        if (bPathP) bPathP.onclick = () => { s.pathDeg = Math.min(15, s.pathDeg + 0.5); document.getElementById('game-path-label').textContent = `${s.pathDeg > 0 ? '+' : ''}${s.pathDeg.toFixed(1)}°`; };
        if (bPathM) bPathM.onclick = () => { s.pathDeg = Math.max(-15, s.pathDeg - 0.5); document.getElementById('game-path-label').textContent = `${s.pathDeg > 0 ? '+' : ''}${s.pathDeg.toFixed(1)}°`; };

        const bFaceP = document.getElementById('game-btn-face-plus');
        const bFaceM = document.getElementById('game-btn-face-minus');
        if (bFaceP) bFaceP.onclick = () => { s.faceDeg = Math.min(15, s.faceDeg + 0.5); document.getElementById('game-face-label').textContent = `${s.faceDeg > 0 ? '+' : ''}${s.faceDeg.toFixed(1)}°`; };
        if (bFaceM) bFaceM.onclick = () => { s.faceDeg = Math.max(-15, s.faceDeg - 0.5); document.getElementById('game-face-label').textContent = `${s.faceDeg > 0 ? '+' : ''}${s.faceDeg.toFixed(1)}°`; };

        const bSwing = document.getElementById('btnGameSwing');
        if (bSwing) bSwing.onclick = () => window.executeGameSwing();

    } else if (s.phase === 'chip') {
        container.innerHTML = `
            <div class="chip-dashboard">
                <div class="chip-config-group">
                    <div class="chip-item">
                        <select id="game-chip-club-select" class="club-dropdown">
                            <option value="SW" ${s.selectedClub === 'SW' ? 'selected' : ''}>SW (Sand Wedge)</option>
                            <option value="LW" ${s.selectedClub === 'LW' ? 'selected' : ''}>LW (Lob Wedge)</option>
                            <option value="PW" ${s.selectedClub === 'PW' ? 'selected' : ''}>PW (Pitching)</option>
                            <option value="7i" ${s.selectedClub === '7i' ? 'selected' : ''}>7i (Bump & Run)</option>
                        </select>
                    </div>
                    <div class="chip-item">
                        <span style="font-size: 0.75rem; color: var(--accent); font-weight:700;">DISTANCE: ${Math.round(s.ballPosition.distanceToPin)}m</span>
                    </div>
                </div>
                <div class="chip-slider-group">
                    <input type="range" id="game-chip-power" min="5" max="35" value="20" class="h-slider-input" style="width:100%">
                    <span id="game-chip-speed-label" style="font-size:0.8rem; font-weight:700; color:#fff; text-align:center; display:block;">20 MPH</span>
                </div>
                <button class="action-btn-putt-rect" id="btnGameChip">APPROCHE</button>
            </div>
        `;

        const sel = document.getElementById('game-chip-club-select');
        if (sel) sel.onchange = (e) => { s.selectedClub = e.target.value; };

        const cPow = document.getElementById('game-chip-power');
        if (cPow) cPow.oninput = (e) => {
            document.getElementById('game-chip-speed-label').textContent = `${e.target.value} MPH`;
        };

        const bChip = document.getElementById('btnGameChip');
        if (bChip) bChip.onclick = () => window.executeGameChip();

    } else if (s.phase === 'putt') {
        const dist = s.ballPosition.distanceToPin.toFixed(1);
        container.innerHTML = `
            <div class="putt-dashboard-horizontal">
                <div class="target-control-center">
                    <span class="target-label-mini">PUTT AU MÂT : ${dist}m</span>
                    <div class="distance-adjust-group">
                        <button class="adjust-btn-small" id="game-putt-aim-minus">◀</button>
                        <span class="target-value" id="game-putt-aim-val" style="min-width:70px;">0.0°</span>
                        <button class="adjust-btn-small" id="game-putt-aim-plus">▶</button>
                    </div>
                </div>
                <button class="footer-btn action-btn-putt-rect" id="btnGamePutt">PUTTER</button>
            </div>
        `;

        const bAimP = document.getElementById('game-putt-aim-plus');
        const bAimM = document.getElementById('game-putt-aim-minus');
        if (bAimP) bAimP.onclick = () => {
            s.puttAimDeg = Math.min(15, s.puttAimDeg + 0.5);
            document.getElementById('game-putt-aim-val').textContent = `${s.puttAimDeg > 0 ? '+' : ''}${s.puttAimDeg.toFixed(1)}°`;
        };
        if (bAimM) bAimM.onclick = () => {
            s.puttAimDeg = Math.max(-15, s.puttAimDeg - 0.5);
            document.getElementById('game-putt-aim-val').textContent = `${s.puttAimDeg > 0 ? '+' : ''}${s.puttAimDeg.toFixed(1)}°`;
        };

        const bPutt = document.getElementById('btnGamePutt');
        if (bPutt) bPutt.onclick = () => window.executeGamePutt();
    }
};

window.executeGameSwing = function () {
    const s = window.gameState;
    const club = PhysicsEngine.GOLF_BAG[s.selectedClub] || PhysicsEngine.GOLF_BAG['Dr'];

    const input = {
        clubSpeedMph: s.powerMph,
        powerFactor: 1.0,
        efficiency: club.efficiency || 1.0,
        pathDeviationDeg: s.pathDeg,
        clubFaceAngle: s.faceDeg
    };

    // Calculate with stochastic uncertainty based on user rule (0% up to 90%, +/-5% at 100%)
    const params = PhysicsEngine.calculateGameLaunchParams(input, club, {
        lie: s.ballPosition.lie,
        manualAttackAngle: s.attackDeg
    });

    const weather = window.appState ? window.appState.weather : { altitude: 0, temp: 20, windSpeed: 0, windDir: 0 };
    const result = PhysicsEngine.simulateTrajectory(params, weather);

    window.appState.trajectoryResult = result;
    if (window.animate) window.animate(result);

    // Apply movement
    const carriedY = result.totalDistance || result.carryDistance;
    const lateralX = result.lateralDeviation || 0;

    s.ballPosition.distanceToPin = Math.max(0, s.ballPosition.distanceToPin - carriedY);
    s.ballPosition.lateralOffset += lateralX;

    // Determine new Lie
    if (s.ballPosition.distanceToPin <= s.currentHole.greenRadius && Math.abs(s.ballPosition.lateralOffset) <= s.currentHole.greenRadius) {
        s.ballPosition.lie = 'green';
    } else if (Math.abs(s.ballPosition.lateralOffset) > 18) {
        s.ballPosition.lie = 'rough';
    } else {
        s.ballPosition.lie = 'fairway';
    }

    s.strokeCount++;
    window.addHistoryItem(`Jeu T${s.currentHole.number}`, result);

    setTimeout(() => {
        window.determinePhase();
        window.updateGameHUD();
        window.renderPhaseControls();
        if (window.resizeCanvas) window.resizeCanvas();
    }, 1200);
};

window.executeGameChip = function () {
    const s = window.gameState;
    const club = PhysicsEngine.GOLF_BAG[s.selectedClub] || PhysicsEngine.GOLF_BAG['SW'];
    const power = parseFloat(document.getElementById('game-chip-power').value) || 20;

    const input = {
        clubSpeedMph: power,
        powerFactor: 1.0,
        efficiency: 1.0,
        pathDeviationDeg: 0,
        clubFaceAngle: 0
    };

    const params = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle);
    const weather = window.appState ? window.appState.weather : { windSpeed: 0 };
    const result = PhysicsEngine.simulateChipping(params, weather, 10);

    window.appState.trajectoryResult = result;
    if (window.animate) window.animate(result);

    const dist = result.totalDistance || 15;
    s.ballPosition.distanceToPin = Math.max(0, s.ballPosition.distanceToPin - dist);

    if (s.ballPosition.distanceToPin <= s.currentHole.greenRadius) {
        s.ballPosition.lie = 'green';
    }

    s.strokeCount++;
    window.addHistoryItem(`Jeu T${s.currentHole.number} Chip`, result);

    setTimeout(() => {
        window.determinePhase();
        window.updateGameHUD();
        window.renderPhaseControls();
        if (window.resizeCanvas) window.resizeCanvas();
    }, 1200);
};

window.executeGamePutt = function () {
    const s = window.gameState;
    const hole = s.currentHole;
    const targetDist = Math.max(0.5, s.ballPosition.distanceToPin);

    // Effort based on distance and slope
    const powerEffort = targetDist * (1.0 + (hole.greenSlopeY > 0 ? hole.greenSlopeY * 0.12 : hole.greenSlopeY * 0.08));

    const result = PhysicsEngine.calculatePutting(powerEffort, hole.greenSlopeX, hole.greenSlopeY, s.puttAimDeg);
    const puttTrajectory = { ...result, isPutt: true };

    window.appState.trajectoryResult = puttTrajectory;
    if (window.animate) window.animate(puttTrajectory);

    // Final distance to hole
    const finalDx = result.finalX;
    const finalDy = result.finalY - targetDist;
    const remainingDist = Math.sqrt(finalDx * finalDx + finalDy * finalDy);

    s.ballPosition.distanceToPin = remainingDist;

    // Check if in hole (<= 0.35m = Gimme / Boîte)
    if (remainingDist <= 0.35) {
        s.ballPosition.distanceToPin = 0;
        s.ballPosition.lie = 'in_hole';
        s.isHoleFinished = true;
        setTimeout(() => window.showHoleCompletion(), 1000);
    } else {
        s.strokeCount++;
        setTimeout(() => {
            window.updateGameHUD();
            window.renderPhaseControls();
            if (window.resizeCanvas) window.resizeCanvas();
        }, 1200);
    }
};

window.showHoleCompletion = function () {
    const s = window.gameState;
    const hole = s.currentHole;
    const strokes = s.strokeCount;
    const diff = strokes - hole.par;

    s.scores.push({
        hole: hole.number,
        par: hole.par,
        strokes: strokes,
        diff: diff
    });
    s.totalDiffToPar += diff;

    let badgeText = "PAR";
    let badgeClass = "badge-par";

    if (strokes === 1) { badgeText = "HOLE IN ONE ! 🎯"; badgeClass = "badge-eagle"; }
    else if (diff <= -2) { badgeText = "EAGLE 🦅"; badgeClass = "badge-eagle"; }
    else if (diff === -1) { badgeText = "BIRDIE 🐦"; badgeClass = "badge-birdie"; }
    else if (diff === 0) { badgeText = "PAR ⛳"; badgeClass = "badge-par"; }
    else if (diff === 1) { badgeText = "BOGEY ⚠️"; badgeClass = "badge-bogey"; }
    else { badgeText = `+${diff} DBL BOGEY`; badgeClass = "badge-double"; }

    const overlay = document.getElementById('game-hole-modal');
    const badge = document.getElementById('hole-result-badge');
    const title = document.getElementById('hole-result-title');
    const desc = document.getElementById('hole-result-desc');
    const cardScore = document.getElementById('card-hole-score');
    const cardDiff = document.getElementById('card-hole-diff');
    const cardTotal = document.getElementById('card-total-score');

    if (badge) { badge.textContent = badgeText; badge.className = `hole-card-badge ${badgeClass}`; }
    if (title) title.textContent = strokes === 1 ? "EXPLOIT INCROYABLE !" : "TROU TERMINÉ !";
    if (desc) desc.textContent = `${strokes} coups sur ce Par ${hole.par}`;
    if (cardScore) cardScore.textContent = strokes;
    if (cardDiff) cardDiff.textContent = diff === 0 ? "E" : diff > 0 ? `+${diff}` : `${diff}`;
    if (cardTotal) {
        const tot = s.totalDiffToPar;
        cardTotal.textContent = tot === 0 ? "E" : tot > 0 ? `+${tot}` : `${tot}`;
    }

    if (overlay) overlay.style.display = 'flex';
};

window.advanceToNextHole = function () {
    const nextHoleNum = window.gameState.holeNumber + 1;
    window.gameState.holeNumber = nextHoleNum;
    window.startNewHole(nextHoleNum);
};
