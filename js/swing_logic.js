/**
 * SWING LOGIC - Handles Swing mode calculations and UI updates.
 */

window.calculateSwing = function () {
    const input = {
        clubSpeedMph: appState.power * appState.speedFactor,
        powerFactor: 1.0,
        efficiency: appState.currentClub.efficiency,
        pathDeviationDeg: appState.path,
        clubFaceAngle: appState.face
    };
    const params = PhysicsEngine.calculateLaunchParams(input, appState.currentClub, appState.attack);
    const result = PhysicsEngine.simulateTrajectory(params, appState.weather);
    appState.trajectoryResult = result;
    animate(result);
    updateSwingMetrics(result);
    addHistoryItem('Swing', result);
};

function updateSwingMetrics(res) {
    document.getElementById('val-m1').textContent = res.carryDistance.toFixed(1);
    document.getElementById('val-m2').textContent = res.totalDistance.toFixed(1);
    document.getElementById('val-m3').textContent = Math.abs(res.lateralDeviation).toFixed(1);
    document.getElementById('unit-m3').textContent = res.lateralDeviation < 0 ? 'L' : 'R';
    document.getElementById('val-spin-back').textContent = Math.round(res.spinRpm);
    document.getElementById('val-spin-side').textContent = Math.round(res.sideSpinRpm);
    document.getElementById('val-smash').textContent = res.smashFactor.toFixed(2);

    document.getElementById('hud-club-speed').textContent = res.clubHeadSpeedMph.toFixed(1);
    document.getElementById('hud-ball-speed').textContent = res.ballSpeedMph.toFixed(1);

    const hudPath = document.getElementById('hud-path');
    if (hudPath) hudPath.textContent = `${res.swingPath > 0 ? '+' : ''}${res.swingPath.toFixed(1)}°`;

    const hudFace = document.getElementById('hud-face');
    if (hudFace) hudFace.textContent = `${res.faceToPath > 0 ? '+' : ''}${res.faceToPath.toFixed(1)}°`;
}

window.initSwingUI = function () {
    console.log("Initializing Swing UI");
    const powerInput = document.getElementById('input-power');
    if (powerInput) {
        powerInput.oninput = (e) => {
            appState.power = parseFloat(e.target.value);
            document.getElementById('speed-label').textContent = `${appState.power} MPH`;
            const fillElement = document.getElementById('speed-fill-h');
            if (fillElement) fillElement.style.width = `${(appState.power / 150) * 100}%`;
        };
    }

    const bPathPlus = document.getElementById('btn-path-plus');
    if (bPathPlus) bPathPlus.onclick = () => {
        appState.path = Math.min(20, appState.path + 0.5);
        document.getElementById('path-label').textContent = `${appState.path > 0 ? '+' : ''}${appState.path.toFixed(1)}°`;
    };
    const bPathMinus = document.getElementById('btn-path-minus');
    if (bPathMinus) bPathMinus.onclick = () => {
        appState.path = Math.max(-20, appState.path - 0.5);
        document.getElementById('path-label').textContent = `${appState.path > 0 ? '+' : ''}${appState.path.toFixed(1)}°`;
    };

    const bFacePlus = document.getElementById('btn-face-plus');
    if (bFacePlus) bFacePlus.onclick = () => {
        appState.face = Math.min(15, appState.face + 0.5);
        document.getElementById('face-angle-label').textContent = `${appState.face > 0 ? '+' : ''}${appState.face.toFixed(1)}°`;
        appState.strikePosition.x = (appState.face / appState.angleLimit) + 0.5;
        if (window.drawImpact) window.drawImpact();
    };
    const bFaceMinus = document.getElementById('btn-face-minus');
    if (bFaceMinus) bFaceMinus.onclick = () => {
        appState.face = Math.max(-15, appState.face - 0.5);
        document.getElementById('face-angle-label').textContent = `${appState.face > 0 ? '+' : ''}${appState.face.toFixed(1)}°`;
        appState.strikePosition.x = (appState.face / appState.angleLimit) + 0.5;
        if (window.drawImpact) window.drawImpact();
    };

    const bAtkPlus = document.getElementById('btn-attack-plus');
    if (bAtkPlus) bAtkPlus.onclick = () => {
        appState.attack = Math.min(10, appState.attack + 0.5);
        document.getElementById('attack-label').textContent = `${appState.attack > 0 ? '+' : ''}${appState.attack.toFixed(1)}°`;
        appState.strikePosition.y = 0.5 - (appState.attack / 10);
        if (window.drawImpact) window.drawImpact();
    };
    const bAtkMinus = document.getElementById('btn-attack-minus');
    if (bAtkMinus) bAtkMinus.onclick = () => {
        appState.attack = Math.max(-10, appState.attack - 0.5);
        document.getElementById('attack-label').textContent = `${appState.attack > 0 ? '+' : ''}${appState.attack.toFixed(1)}°`;
        appState.strikePosition.y = 0.5 - (appState.attack / 10);
        if (window.drawImpact) window.drawImpact();
    };

    const bSwing = document.getElementById('btnSwing');
    if (bSwing) bSwing.onclick = () => window.calculateSwing();

    window.initClubBelt();
    window.initImpactBall();
};

window.initClubBelt = function () {
    const belt = document.getElementById('club-belt');
    if (!belt) return;
    belt.innerHTML = '';
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
};

window.initImpactBall = function () {
    let container = document.getElementById('impact-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'impact-container';
        container.style.position = 'absolute';
        container.style.left = '10px';
        container.style.top = '10px';
        container.innerHTML = '<canvas id="impactBallCanvas" width="80" height="80"></canvas>';
        const content = document.getElementById('swing-content');
        if (content) content.appendChild(container);
    }

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
        ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
    };
    canvas.onmousedown = canvas.ontouchstart = (e) => {
        const update = (evt) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
            const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
            appState.strikePosition.x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            appState.strikePosition.y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
            appState.face = (appState.strikePosition.x - 0.5) * appState.angleLimit;
            appState.attack = (0.5 - appState.strikePosition.y) * 10;
            document.getElementById('face-angle-label').textContent = `${appState.face > 0 ? '+' : ''}${appState.face.toFixed(1)}°`;
            document.getElementById('attack-label').textContent = `${appState.attack > 0 ? '+' : ''}${appState.attack.toFixed(1)}°`;
            drawImpact();
        };
        const stop = () => { window.removeEventListener('mousemove', update); window.removeEventListener('mouseup', stop); window.removeEventListener('touchmove', update); window.removeEventListener('touchend', stop); };
        window.addEventListener('mousemove', update); window.addEventListener('mouseup', stop); window.addEventListener('touchmove', update); window.addEventListener('touchend', stop);
        update(e);
    };
    drawImpact();
}
