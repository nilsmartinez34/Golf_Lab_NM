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

