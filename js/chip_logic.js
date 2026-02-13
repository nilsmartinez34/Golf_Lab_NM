/**
 * CHIP LOGIC - Handles Chipping mode calculations and UI updates.
 */

window.initChipUI = function () {
    console.log("Initializing Chip UI");
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

    const posLabel = document.getElementById('val-ball-pos');
    const bPosMinus = document.getElementById('btn-pos-minus');
    if (bPosMinus) bPosMinus.onclick = () => {
        appState.chipBallPos = Math.max(-20, appState.chipBallPos - 1);
        if (posLabel) posLabel.textContent = `${appState.chipBallPos > 0 ? '+' : ''}${appState.chipBallPos} cm`;
    };
    const bPosPlus = document.getElementById('btn-pos-plus');
    if (bPosPlus) bPosPlus.onclick = () => {
        appState.chipBallPos = Math.min(20, appState.chipBallPos + 1);
        if (posLabel) posLabel.textContent = `${appState.chipBallPos > 0 ? '+' : ''}${appState.chipBallPos} cm`;
    };

    const powerInput = document.getElementById('chip-input-power');
    if (powerInput) {
        powerInput.oninput = (e) => {
            const label = document.getElementById('chip-speed-label');
            if (label) label.textContent = `${e.target.value} MPH`;
        };
    }

    const btnGreen = document.getElementById('btn-green-speed');
    btnGreen.onclick = () => {
        const speeds = [6, 8, 10, 12, 14];
        let currTxt = btnGreen.textContent.split(' ')[1];
        let curr = parseInt(currTxt);
        let nextIndex = (speeds.indexOf(curr) + 1) % speeds.length;
        if (nextIndex === -1) nextIndex = 0; // Fallback
        let next = speeds[nextIndex];
        btnGreen.textContent = `GRN ${next}`;
        appState.chipGreenSpeed = next;
    };

    const bChip = document.getElementById('btnChip');
    if (bChip) bChip.onclick = () => window.calculateChip();
};

window.calculateChip = function () {
    // ...
    const clubCode = document.getElementById('chip-club-select').value;
    const club = PhysicsEngine.GOLF_BAG[clubCode];
    const power = parseFloat(document.getElementById('chip-input-power').value);
    const greenSpeed = appState.chipGreenSpeed || 10;
    const pos = appState.chipBallPos;

    const input = {
        clubSpeedMph: power,
        powerFactor: 1.0,
        efficiency: 1.0,
        pathDeviationDeg: 0,
        clubFaceAngle: 0
    };

    const params = PhysicsEngine.calculateLaunchParams(input, club, club.attackAngle + (pos * 0.5));
    params.launchAngleDeg += (pos * 0.5);

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
    document.getElementById('chip-val-ratio').textContent = Math.round((res.rollDistance / res.totalDistance * 100) || 0);
    document.getElementById('chip-val-loft').textContent = res.launchAngleDeg.toFixed(1);
    document.getElementById('chip-val-spin').textContent = Math.round(res.spinRpm);
}
