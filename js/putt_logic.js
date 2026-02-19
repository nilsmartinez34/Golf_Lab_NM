/**
 * PUTT LOGIC - Handles Putting mode calculations, Aim Point solver, and UI updates.
 */

window.initPuttUI = function () {
    console.log("Initializing Putt UI");
    const bDistPlus = document.getElementById('btn-dist-plus');
    if (bDistPlus) bDistPlus.onclick = () => {
        appState.puttDist = Math.min(20, appState.puttDist + 0.5);
        window.updatePuttUI();
    };
    const bDistMinus = document.getElementById('btn-dist-minus');
    if (bDistMinus) bDistMinus.onclick = () => {
        appState.puttDist = Math.max(1, appState.puttDist - 0.5);
        window.updatePuttUI();
    };

    const bsxPlus = document.getElementById('btn-slope-x-plus');
    if (bsxPlus) bsxPlus.onclick = () => { appState.slopeX = Math.min(5, appState.slopeX + 0.5); window.updatePuttUI(); };
    const bsxMinus = document.getElementById('btn-slope-x-minus');
    if (bsxMinus) bsxMinus.onclick = () => { appState.slopeX = Math.max(-5, appState.slopeX - 0.5); window.updatePuttUI(); };
    const bsyPlus = document.getElementById('btn-slope-y-plus');
    if (bsyPlus) bsyPlus.onclick = () => { appState.slopeY = Math.min(10, appState.slopeY + 0.5); window.updatePuttUI(); };
    const bsyMinus = document.getElementById('btn-slope-y-minus');
    if (bsyMinus) bsyMinus.onclick = () => { appState.slopeY = Math.max(-10, appState.slopeY - 0.5); window.updatePuttUI(); };

    const bPuttBack = document.getElementById('btnPuttBack');
    if (bPuttBack) bPuttBack.onclick = () => window.switchMode('swing');

    const bPutt = document.getElementById('btnPutt');
    if (bPutt) bPutt.onclick = () => {
        if (appState.trajectoryResult && appState.trajectoryResult.isPutt) {
            if (window.puttingView3D && appState.mode === 'putt') {
                window.puttingView3D.startPuttAnimation(appState.trajectoryResult);
            }
            animate(appState.trajectoryResult);
        }
    };
    const bReset = document.getElementById('btnResetPutt');
    if (bReset) bReset.onclick = () => {
        appState.slopeX = 0; appState.slopeY = 0; appState.puttDist = 5;
        appState.trajectoryResult = null;
        window.updatePuttUI();
    };

    window.updatePuttUI();
};

window.updatePuttUI = function () {
    console.log("Updating Putt UI");
    const sx = document.getElementById('val-slope-x');
    if (sx) sx.textContent = `${appState.slopeX.toFixed(2).replace('.', ',')}°`;
    const sy = document.getElementById('val-slope-y');
    if (sy) sy.textContent = `${appState.slopeY.toFixed(2).replace('.', ',')}°`;
    const dist = document.getElementById('label-putt-dist');
    if (dist) dist.textContent = `${appState.puttDist.toFixed(2).replace('.', ',')}m`;

    window.solvePerfectPutt();
    if (window.resizeCanvas) window.resizeCanvas();
};

window.solvePerfectPutt = function () {
    const targetY = appState.puttDist, sx = appState.slopeX, sy = appState.slopeY;
    let bAim = 0.0, bPow = targetY * (1.0 + (sy > 0 ? sy * 0.15 : sy * 0.1));

    for (let i = 0; i < 5; i++) {
        const res = PhysicsEngine.calculatePutting(bPow, sx, sy, bAim);
        bAim -= (Math.atan2(res.finalX, targetY) * 180 / Math.PI) * 0.8;
    }
    for (let i = 0; i < 3; i++) {
        const res = PhysicsEngine.calculatePutting(bPow, sx, sy, bAim);
        bPow -= (res.finalY - targetY) * 0.7;
    }

    const finalRes = PhysicsEngine.calculatePutting(bPow, sx, sy, bAim);
    let maxB = 0, apex = { x: 0, y: 0 };
    finalRes.path.forEach(p => { if (Math.abs(p.x) > maxB) { maxB = Math.abs(p.x); apex = p; } });

    appState.puttAim = bAim;
    appState.puttPlayAs = bPow;
    appState.trajectoryResult = { ...finalRes, isPutt: true, apexPoint: apex, isAimPoint: true };

    const disp = bPow * Math.sin(bAim * Math.PI / 180);
    document.getElementById('putt-val-aim').textContent = Math.abs(disp).toFixed(2).replace('.', ',');
    document.getElementById('putt-unit-aim').textContent = disp < 0 ? "m LEFT" : disp > 0 ? "m RIGHT" : "m";
    document.getElementById('putt-val-playas').textContent = bPow.toFixed(2).replace('.', ',');
    document.getElementById('putt-val-apex').textContent = `${apex.x.toFixed(2).replace('.', ',')} / ${apex.y.toFixed(2).replace('.', ',')}`;
}
