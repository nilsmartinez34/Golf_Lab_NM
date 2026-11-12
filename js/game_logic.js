/**
 * GAME LOGIC - Procedural Organic Course & "Golf Dreams" Style Slingshot Mechanics
 * Features:
 * - Slingshot drag from the ball: pull down for power, down-left for Draw, down-right for Fade.
 * - Exact user uncertainty rule: 0% up to 90% power, progressing to +/-5% at 100%.
 * - Organic procedural course: non-rectangular fairway, textured rough, sand bunkers, contoured green & slopes.
 * - Uses existing PhysicsEngine (v11) for flight, roll, bounce and putting.
 */

window.gameState = {
    holeNumber: 1,
    currentHole: null,
    strokeCount: 1,
    scores: [],
    totalDiffToPar: 0,
    ballPosition: {
        forwardMeters: 0,
        lateralMeters: 0,
        lie: 'tee' // 'tee', 'fairway', 'rough', 'sand', 'green', 'in_hole'
    },
    selectedClub: 'Dr',
    isHoleFinished: false,
    viewMode: 'perspective', // 'perspective' or 'map'

    // Slingshot drag state
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    dragCurrent: { x: 0, y: 0 },
    shotPreview: {
        powerPct: 0,
        pathDeg: 0,
        faceDeg: 0,
        shapeLabel: 'DROIT',
        riskPct: 0,
        isOverSwing: false
    },

    // In-flight animation state
    isAnimatingFlight: false,
    flightPoints: [],
    flightFrame: 0,
    currentBallScreenPos: { x: 0, y: 0 }
};

const HOLE_PAR_LIST = [4, 3, 5, 4, 3];

window.initGameUI = function () {
    console.log("Initializing Game Mode (Golf Dreams Style)");

    if (!window.gameState.currentHole) {
        window.startNewHole(window.gameState.holeNumber);
    } else {
        window.updateGameHUD();
        window.renderClubBelt();
    }

    // Attach Slingshot Pointer Listeners on canvas
    window.initSlingshotControls();

    // Bind Next Hole Button
    const btnNext = document.getElementById('btn-next-hole');
    if (btnNext) btnNext.onclick = () => window.advanceToNextHole();

    // Bind View Toggle Button
    const btnView = document.getElementById('btn-toggle-view');
    if (btnView) {
        btnView.onclick = () => {
            window.gameState.viewMode = window.gameState.viewMode === 'perspective' ? 'map' : 'perspective';
            btnView.textContent = window.gameState.viewMode === 'perspective' ? '🗺️ CARTE' : '⛳ TERRAIN';
            if (window.resizeCanvas) window.resizeCanvas();
        };
    }
};

/**
 * Procedural Organic Hole Generator
 */
window.generateOrganicHole = function (holeNum) {
    const par = HOLE_PAR_LIST[(holeNum - 1) % HOLE_PAR_LIST.length] || 4;
    let totalDist = 360;
    if (par === 3) totalDist = Math.round(140 + Math.random() * 45); // 140 - 185m
    else if (par === 4) totalDist = Math.round(320 + Math.random() * 70); // 320 - 390m
    else if (par === 5) totalDist = Math.round(475 + Math.random() * 50); // 475 - 525m

    // Dogleg curvature (-1 = left, 0 = straight, 1 = right)
    const doglegDir = par === 3 ? 0 : (Math.random() > 0.5 ? 1 : -1);
    const doglegAmount = par === 3 ? 0 : (18 + Math.random() * 18); // 18m to 36m lateral shift

    // Organic Fairway Spine & Width Profile
    const segments = 20;
    const fairwayProfile = [];
    for (let i = 0; i <= segments; i++) {
        const ratio = i / segments;
        const d = ratio * totalDist;
        // Bell-curve shape for dogleg
        const lateralShift = doglegDir * doglegAmount * Math.pow(Math.sin(ratio * Math.PI), 1.6);
        // Varying organic width (wider at landing area, narrower near green)
        const width = par === 3 ? 18 : (22 + Math.sin(ratio * Math.PI * 3) * 6);
        fairwayProfile.push({ d, x: lateralShift, width });
    }

    // Sand Bunkers
    const bunkers = [];
    if (par > 3) {
        // Fairway bunker at ~60% of distance
        const fbDist = totalDist * (0.55 + Math.random() * 0.1);
        const fbSpine = fairwayProfile[Math.floor(segments * 0.6)];
        bunkers.push({
            d: fbDist,
            x: fbSpine.x + (doglegDir !== 0 ? -doglegDir * 18 : (Math.random() > 0.5 ? 20 : -20)),
            radiusX: 7 + Math.random() * 3,
            radiusY: 14 + Math.random() * 5,
            type: 'fairway'
        });
    }

    // Green-side Bunkers (Left and Right of green)
    const greenEnd = fairwayProfile[fairwayProfile.length - 1];
    bunkers.push({
        d: totalDist - 4,
        x: greenEnd.x - 14,
        radiusX: 6,
        radiusY: 10,
        type: 'greenside'
    });
    bunkers.push({
        d: totalDist + 2,
        x: greenEnd.x + 14,
        radiusX: 6,
        radiusY: 9,
        type: 'greenside'
    });

    // Green & Slopes
    const greenSlopeX = parseFloat(((Math.random() * 4.0) - 2.0).toFixed(1)); // -2.0° to +2.0°
    const greenSlopeY = parseFloat(((Math.random() * 3.0) - 1.5).toFixed(1)); // -1.5° to +1.5°
    const fairwaySlopeY = parseFloat(((Math.random() * 2.0) - 1.0).toFixed(1)); // -1.0° to +1.0°

    // Pin position on green
    const pinOffset = {
        x: (Math.random() * 8) - 4,
        y: (Math.random() * 8) - 4
    };

    const windSpeed = Math.round(6 + Math.random() * 22);
    const windDir = Math.round(Math.random() * 36) * 10;

    return {
        number: holeNum,
        par: par,
        totalDistance: totalDist,
        fairwayProfile: fairwayProfile,
        bunkers: bunkers,
        green: {
            d: totalDist,
            x: greenEnd.x,
            radiusX: 16,
            radiusY: 18,
            slopeX: greenSlopeX,
            slopeY: greenSlopeY,
            pinOffset: pinOffset
        },
        fairwaySlopeY: fairwaySlopeY,
        wind: { speed: windSpeed, dir: windDir }
    };
};

window.startNewHole = function (holeNum) {
    const hole = window.generateOrganicHole(holeNum);
    window.gameState.currentHole = hole;
    window.gameState.strokeCount = 1;
    window.gameState.isHoleFinished = false;
    window.gameState.isAnimatingFlight = false;

    window.gameState.ballPosition = {
        forwardMeters: 0,
        lateralMeters: 0,
        lie: 'tee'
    };

    // Recommended club
    window.recommendClub();

    // Sync atmospheric weather
    if (window.appState) {
        window.appState.weather.windSpeed = hole.wind.speed;
        window.appState.weather.windDir = hole.wind.dir;
        if (window.updateWeatherHUD) window.updateWeatherHUD();
    }

    const overlay = document.getElementById('game-hole-modal');
    if (overlay) overlay.style.display = 'none';

    window.updateGameHUD();
    window.renderClubBelt();
    if (window.resizeCanvas) window.resizeCanvas();
};

window.recommendClub = function () {
    const s = window.gameState;
    const hole = s.currentHole;
    const distToPin = Math.max(0, hole.totalDistance - s.ballPosition.forwardMeters);

    if (distToPin <= 15 || s.ballPosition.lie === 'green') {
        s.selectedClub = 'Put';
    } else if (distToPin <= 35) {
        s.selectedClub = 'LW';
    } else if (distToPin <= 65) {
        s.selectedClub = 'SW';
    } else if (distToPin <= 105) {
        s.selectedClub = 'PW';
    } else if (distToPin <= 130) {
        s.selectedClub = '9i';
    } else if (distToPin <= 150) {
        s.selectedClub = '7i';
    } else if (distToPin <= 175) {
        s.selectedClub = '5i';
    } else if (distToPin <= 210) {
        s.selectedClub = '3W';
    } else {
        s.selectedClub = s.ballPosition.lie === 'tee' ? 'Dr' : '3W';
    }
};

window.updateGameHUD = function () {
    const s = window.gameState;
    const hole = s.currentHole;
    if (!hole) return;

    const distToPin = Math.max(0, Math.round(hole.totalDistance - s.ballPosition.forwardMeters));

    const elHole = document.getElementById('game-val-hole');
    const elPar = document.getElementById('game-val-par');
    const elDist = document.getElementById('game-val-dist');
    const elStroke = document.getElementById('game-val-stroke');
    const elLie = document.getElementById('game-val-lie');
    const elScore = document.getElementById('game-val-score');
    const elClub = document.getElementById('game-val-club');

    if (elHole) elHole.textContent = hole.number;
    if (elPar) elPar.textContent = `PAR ${hole.par}`;
    if (elDist) elDist.textContent = distToPin;
    if (elStroke) elStroke.textContent = s.strokeCount;
    if (elLie) elLie.textContent = s.ballPosition.lie.toUpperCase();
    if (elClub) elClub.textContent = s.selectedClub.toUpperCase();

    if (elScore) {
        const diff = s.totalDiffToPar;
        elScore.textContent = diff === 0 ? 'E' : diff > 0 ? `+${diff}` : `${diff}`;
        elScore.style.color = diff < 0 ? '#F87171' : diff === 0 ? '#4ADE80' : '#FBBF24';
    }

    const stLie = document.getElementById('game-status-lie');
    if (stLie) {
        if (s.ballPosition.lie === 'tee') stLie.textContent = 'TEE (100%)';
        else if (s.ballPosition.lie === 'fairway') stLie.textContent = 'FAIRWAY (100%)';
        else if (s.ballPosition.lie === 'rough') stLie.textContent = 'ROUGH (-12%)';
        else if (s.ballPosition.lie === 'sand') stLie.textContent = 'BUNKER (-28%)';
        else if (s.ballPosition.lie === 'green') stLie.textContent = 'GREEN';
    }

    const stSlope = document.getElementById('game-status-slope');
    if (stSlope) {
        if (s.ballPosition.lie === 'green') {
            stSlope.textContent = `Brk: ${hole.green.slopeX > 0 ? '+' : ''}${hole.green.slopeX}°`;
        } else {
            stSlope.textContent = `${hole.fairwaySlopeY > 0 ? '▲ +' : '▼ '}${hole.fairwaySlopeY}°`;
        }
    }

    const stWind = document.getElementById('game-status-wind');
    if (stWind) {
        stWind.textContent = `${hole.wind.speed} km/h`;
    }
};

window.renderClubBelt = function () {
    const belt = document.getElementById('game-club-belt');
    if (!belt) return;

    const s = window.gameState;
    const clubs = ['Dr', '3W', '4i', '5i', '6i', '7i', '8i', '9i', 'PW', 'SW', 'LW', 'Put'];

    belt.innerHTML = '';
    clubs.forEach(code => {
        const item = document.createElement('div');
        item.className = `club-item ${code === s.selectedClub ? 'active' : ''}`;
        item.textContent = code;
        item.onclick = (e) => {
            e.stopPropagation();
            s.selectedClub = code;
            document.querySelectorAll('#game-club-belt .club-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            window.updateGameHUD();
            if (window.resizeCanvas) window.resizeCanvas();
        };
        belt.appendChild(item);
    });
};

/**
 * "GOLF DREAMS" SLINGSHOT INTERACTION
 * Drag backwards from the ball:
 * - Distance down = Power %
 * - Left tilt = Draw (Inside-out)
 * - Right tilt = Fade (Outside-in)
 * - Power > 90% activates the +/- 5% random uncertainty rule
 */
window.initSlingshotControls = function () {
    const canvas = document.getElementById('golfCanvas');
    if (!canvas || canvas._slingshotBound) return;
    canvas._slingshotBound = true;

    function getCanvasPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    canvas.addEventListener('pointerdown', (e) => {
        if (window.gameState.isHoleFinished || window.gameState.isAnimatingFlight) return;
        const pos = getCanvasPos(e);
        const ballPos = window.gameState.currentBallScreenPos || { x: canvas.width * 0.5, y: canvas.height * 0.84 };

        // Allow click on or anywhere within 90px of ball
        const distToBall = Math.hypot(pos.x - ballPos.x, pos.y - ballPos.y);
        if (distToBall < 110 || pos.y > canvas.height * 0.65) {
            window.gameState.isDragging = true;
            window.gameState.dragStart = { x: ballPos.x, y: ballPos.y };
            window.gameState.dragCurrent = { x: pos.x, y: pos.y };
            canvas.setPointerCapture(e.pointerId);

            // Hide the hint once player interacts
            const hint = document.getElementById('game-slingshot-hint');
            if (hint) hint.style.opacity = '0';
        }
    });

    canvas.addEventListener('pointermove', (e) => {
        if (!window.gameState.isDragging) return;
        const pos = getCanvasPos(e);
        window.gameState.dragCurrent = pos;

        const start = window.gameState.dragStart;
        const dx = pos.x - start.x; // >0 is right, <0 is left
        const dy = pos.y - start.y; // >0 is pulling down (backwards)

        if (dy > 0) {
            const dragDist = Math.hypot(dx, dy);
            // 130px drag = 100% force
            const powerPct = Math.min(110, Math.round((dragDist / 135) * 100));

            // Slingshot curvature logic:
            // Pull bottom-left (dx < 0) -> Swing inside-out -> Push/Draw to the right!
            // Pull bottom-right (dx > 0) -> Swing outside-in -> Pull/Fade to the left!
            const lateralTilt = -dx; // inverted for slingshot release
            const pathDeg = Math.max(-12, Math.min(12, lateralTilt * 0.12));
            const faceDeg = Math.max(-10, Math.min(10, lateralTilt * 0.08));

            let shapeLabel = 'DROIT';
            if (lateralTilt > 25) shapeLabel = lateralTilt > 60 ? 'HOOK' : 'DRAW';
            else if (lateralTilt < -25) shapeLabel = lateralTilt < -60 ? 'SLICE' : 'FADE';

            // Uncertainty rule: 0% from 0 to 90%, +/-5% at 100%
            let riskPct = 0;
            if (powerPct > 90) {
                const t = Math.min(1.0, (powerPct - 90) / 10);
                riskPct = parseFloat((5.0 * t).toFixed(1));
            }

            window.gameState.shotPreview = {
                powerPct,
                pathDeg,
                faceDeg,
                shapeLabel,
                riskPct,
                isOverSwing: powerPct > 90
            };
        } else {
            window.gameState.shotPreview = {
                powerPct: 0,
                pathDeg: 0,
                faceDeg: 0,
                shapeLabel: 'DROIT',
                riskPct: 0,
                isOverSwing: false
            };
        }

        if (window.resizeCanvas) window.resizeCanvas();
    });

    canvas.addEventListener('pointerup', (e) => {
        if (!window.gameState.isDragging) return;
        window.gameState.isDragging = false;
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}

        const preview = window.gameState.shotPreview;
        if (preview && preview.powerPct >= 18) {
            window.executeSlingshotShot(preview);
        } else {
            // Cancel shot
            if (window.resizeCanvas) window.resizeCanvas();
        }
    });

    canvas.addEventListener('pointercancel', () => {
        window.gameState.isDragging = false;
        if (window.resizeCanvas) window.resizeCanvas();
    });
};

/**
 * Execute Shot using the Physics Engine
 */
window.executeSlingshotShot = function (shotParams) {
    const s = window.gameState;
    const club = PhysicsEngine.GOLF_BAG[s.selectedClub] || PhysicsEngine.GOLF_BAG['Dr'];

    const speedMph = (club.standardSpeedMph || 90) * (shotParams.powerPct / 100);

    const input = {
        clubSpeedMph: speedMph,
        powerFactor: 1.0,
        efficiency: club.efficiency || 1.0,
        pathDeviationDeg: shotParams.pathDeg,
        clubFaceAngle: shotParams.faceDeg
    };

    // Calculate with user's stochastic uncertainty rule
    const params = PhysicsEngine.calculateGameLaunchParams(input, club, {
        lie: s.ballPosition.lie
    });

    const weather = window.appState ? window.appState.weather : { altitude: 0, temp: 20, windSpeed: 0, windDir: 0 };

    let trajectoryResult;
    if (s.selectedClub === 'Put') {
        const effortDist = (shotParams.powerPct / 100) * 12.0;
        const res = PhysicsEngine.calculatePutting(effortDist, s.currentHole.green.slopeX, s.currentHole.green.slopeY, shotParams.faceDeg);
        trajectoryResult = { ...res, isPutt: true };
    } else if (['SW', 'LW'].includes(s.selectedClub) && s.ballPosition.lie !== 'tee' && (s.currentHole.totalDistance - s.ballPosition.forwardMeters) < 45) {
        trajectoryResult = PhysicsEngine.simulateChipping(params, weather, 10);
    } else {
        trajectoryResult = PhysicsEngine.simulateTrajectory(params, weather);
    }

    // Launch in-flight animation on organic terrain
    window.startOrganicFlightAnimation(trajectoryResult);
};

/**
 * In-Flight Animation across the Organic Golf Course
 */
window.startOrganicFlightAnimation = function (result) {
    const s = window.gameState;
    s.isAnimatingFlight = true;
    s.flightPoints = result.path || [];
    s.flightFrame = 0;

    const canvas = document.getElementById('golfCanvas');
    const ctx = canvas.getContext('2d');

    const carriedForward = result.totalDistance || result.carryDistance || 0;
    const lateralShift = result.lateralDeviation || (result.finalX !== undefined ? result.finalX : 0);

    function step() {
        if (s.flightFrame >= s.flightPoints.length) {
            s.isAnimatingFlight = false;

            // Finalize Landing Position
            s.ballPosition.forwardMeters += carriedForward;
            s.ballPosition.lateralMeters += lateralShift;

            window.evaluateBallLie();
            s.strokeCount++;

            window.updateGameHUD();
            window.recommendClub();
            window.renderClubBelt();

            if (window.resizeCanvas) window.resizeCanvas();
            return;
        }

        s.flightFrame += 2;
        window.drawGameScene(ctx, canvas);
        requestAnimationFrame(step);
    }

    step();
};

/**
 * Evaluate Lie (Fairway, Rough, Sand Bunker, Green, In Hole)
 */
window.evaluateBallLie = function () {
    const s = window.gameState;
    const hole = s.currentHole;
    const fwd = s.ballPosition.forwardMeters;
    const lat = s.ballPosition.lateralMeters;

    const distToPin = Math.hypot(hole.totalDistance - fwd, (hole.green.x + hole.green.pinOffset.x) - lat);

    // 1. Hole-in check (<= 35cm = Gimme / In Hole!)
    if (distToPin <= 0.35) {
        s.ballPosition.lie = 'in_hole';
        s.isHoleFinished = true;
        setTimeout(() => window.showHoleCompletion(), 800);
        return;
    }

    // 2. Green check
    const distToGreenCenter = Math.hypot(hole.green.d - fwd, hole.green.x - lat);
    if (distToGreenCenter <= hole.green.radiusX) {
        s.ballPosition.lie = 'green';
        return;
    }

    // 3. Sand Bunker check
    for (const b of hole.bunkers) {
        const bDist = Math.hypot(b.d - fwd, b.x - lat);
        if (bDist <= b.radiusX) {
            s.ballPosition.lie = 'sand';
            return;
        }
    }

    // 4. Fairway check (find nearest spine segment)
    let minLatDiff = 999;
    let localFairwayWidth = 24;
    for (const pt of hole.fairwayProfile) {
        if (Math.abs(pt.d - fwd) < 15) {
            const diff = Math.abs(lat - pt.x);
            if (diff < minLatDiff) {
                minLatDiff = diff;
                localFairwayWidth = pt.width;
            }
        }
    }

    if (minLatDiff <= localFairwayWidth * 0.5) {
        s.ballPosition.lie = 'fairway';
    } else {
        s.ballPosition.lie = 'rough';
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

    let badgeText = "PAR ⛳";
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

/**
 * =========================================================================
 * DEDICATED GAME SCENE RENDERER (Perspective & Organic Course & Slingshot)
 * =========================================================================
 */
window.drawGameScene = function (ctx, canvas) {
    if (window.gameState.viewMode === 'map') {
        window.drawGameOverheadMap(ctx, canvas);
        return;
    }

    const s = window.gameState;
    const hole = s.currentHole;
    if (!hole) return;

    const horizonY = canvas.height * 0.35;
    const groundStartY = canvas.height * 0.84;
    const groundRange = groundStartY - horizonY;
    const k = 0.0055;

    // 1. SKY GRADIENT
    const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
    sky.addColorStop(0, '#0284C7');
    sky.addColorStop(0.7, '#38BDF8');
    sky.addColorStop(1, '#BAE6FD');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, horizonY);

    // Subtle clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.25, horizonY * 0.45, 60, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(canvas.width * 0.75, horizonY * 0.35, 80, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. BASE ROUGH GROUND
    const roughGrad = ctx.createLinearGradient(0, horizonY, 0, canvas.height);
    roughGrad.addColorStop(0, '#14532D');
    roughGrad.addColorStop(0.5, '#166534');
    roughGrad.addColorStop(1, '#15803D');
    ctx.fillStyle = roughGrad;
    ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);

    // Coordinate conversion helper: World (relForward, relLateral) -> Screen (X, Y)
    function worldToScreen(relFwd, relLat) {
        if (relFwd < 0) relFwd = 0;
        const sc = Math.exp(-k * relFwd);
        const scrX = (canvas.width * 0.5) + (relLat * sc * 22.0);
        const scrY = horizonY + (groundRange * sc);
        return { x: scrX, y: scrY, sc: sc };
    }

    const ballFwd = s.ballPosition.forwardMeters;
    const ballLat = s.ballPosition.lateralMeters;

    // 3. ORGANIC FAIRWAY POLYGON (Curved Spline)
    ctx.save();
    const fwdSegments = hole.fairwayProfile;

    // Draw Mowing Stripes along the curved fairway
    for (let i = 0; i < fwdSegments.length - 1; i++) {
        const seg0 = fwdSegments[i];
        const seg1 = fwdSegments[i + 1];

        const relFwd0 = seg0.d - ballFwd;
        const relFwd1 = seg1.d - ballFwd;
        if (relFwd1 < -5) continue; // Behind player

        const relLat0 = seg0.x - ballLat;
        const relLat1 = seg1.x - ballLat;

        const p0 = worldToScreen(Math.max(0, relFwd0), relLat0);
        const p1 = worldToScreen(Math.max(0, relFwd1), relLat1);

        const w0 = (seg0.width * 0.5) * p0.sc * 22.0;
        const w1 = (seg1.width * 0.5) * p1.sc * 22.0;

        // Alternating green mowing stripes
        ctx.fillStyle = i % 2 === 0 ? '#22C55E' : '#16A34A';
        ctx.beginPath();
        ctx.moveTo(p0.x - w0, p0.y);
        ctx.lineTo(p1.x - w1, p1.y);
        ctx.lineTo(p1.x + w1, p1.y);
        ctx.lineTo(p0.x + w0, p0.y);
        ctx.closePath();
        ctx.fill();

        // Semi-rough border
        ctx.strokeStyle = '#15803D';
        ctx.lineWidth = Math.max(1, 2.5 * p0.sc);
        ctx.stroke();
    }
    ctx.restore();

    // 4. SAND BUNKERS (Kidney / Bean shapes with depth lip)
    hole.bunkers.forEach(b => {
        const relFwd = b.d - ballFwd;
        if (relFwd < -5) return;
        const relLat = b.x - ballLat;
        const pt = worldToScreen(relFwd, relLat);

        const radX = b.radiusX * pt.sc * 22.0;
        const radY = b.radiusY * pt.sc * 11.0;

        // Bunker Shadow Lip
        ctx.fillStyle = '#78350F';
        ctx.beginPath();
        ctx.ellipse(pt.x, pt.y - 1.5, radX + 1.5, radY + 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sand fill
        ctx.fillStyle = '#FDE68A';
        ctx.beginPath();
        ctx.ellipse(pt.x, pt.y, radX, radY, 0, 0, Math.PI * 2);
        ctx.fill();
    });

    // 5. GREEN COMPLEX & PENTES
    const relGreenFwd = hole.green.d - ballFwd;
    const relGreenLat = hole.green.x - ballLat;
    if (relGreenFwd > -10) {
        const gPt = worldToScreen(relGreenFwd, relGreenLat);
        const gRadX = hole.green.radiusX * gPt.sc * 22.0;
        const gRadY = hole.green.radiusY * gPt.sc * 12.0;

        // Fringe border
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.ellipse(gPt.x, gPt.y, gRadX + (3 * gPt.sc * 22), gRadY + (2 * gPt.sc * 12), 0, 0, Math.PI * 2);
        ctx.fill();

        // Putting Green surface
        ctx.fillStyle = '#4ADE80';
        ctx.beginPath();
        ctx.ellipse(gPt.x, gPt.y, gRadX, gRadY, 0, 0, Math.PI * 2);
        ctx.fill();

        // Break / Slope directional indicators on green
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        const arrowDir = hole.green.slopeX >= 0 ? 1 : -1;
        ctx.font = `${Math.max(8, 12 * gPt.sc)}px Inter`;
        ctx.fillText(arrowDir > 0 ? '▶▶' : '◀◀', gPt.x - 10, gPt.y + 4);

        // FLAGPOLE & PIN
        const pinScreen = worldToScreen(relGreenFwd + hole.green.pinOffset.y, relGreenLat + hole.green.pinOffset.x);
        const poleH = Math.max(16, 55 * pinScreen.sc);

        // Hole Cup
        ctx.fillStyle = '#064E3B';
        ctx.beginPath();
        ctx.ellipse(pinScreen.x, pinScreen.y, Math.max(2, 4 * pinScreen.sc), Math.max(1, 2 * pinScreen.sc), 0, 0, Math.PI * 2);
        ctx.fill();

        // Pole
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = Math.max(1.5, 3.5 * pinScreen.sc);
        ctx.beginPath();
        ctx.moveTo(pinScreen.x, pinScreen.y);
        ctx.lineTo(pinScreen.x, pinScreen.y - poleH);
        ctx.stroke();

        // Fluttering Flag
        const flagW = Math.max(10, 24 * pinScreen.sc);
        const flagH = Math.max(6, 14 * pinScreen.sc);
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.moveTo(pinScreen.x, pinScreen.y - poleH);
        ctx.lineTo(pinScreen.x + flagW, pinScreen.y - poleH + (flagH * 0.5));
        ctx.lineTo(pinScreen.x, pinScreen.y - poleH + flagH);
        ctx.closePath();
        ctx.fill();

        // Pin Distance Marker
        const distRemaining = Math.max(0, Math.round(hole.totalDistance - s.ballPosition.forwardMeters));
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.beginPath();
        ctx.roundRect(pinScreen.x - 28, pinScreen.y - poleH - 18, 56, 16, 5);
        ctx.fill();
        ctx.fillStyle = '#4ADE80';
        ctx.font = '900 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`📍 ${distRemaining}m`, pinScreen.x, pinScreen.y - poleH - 6);
        ctx.textAlign = 'left';
    }

    // 6. BALL & SLINGSHOT CONTROLS
    const ballScreenX = canvas.width * 0.5;
    const ballScreenY = groundStartY;
    s.currentBallScreenPos = { x: ballScreenX, y: ballScreenY };

    if (!s.isAnimatingFlight) {
        // Shadow under ball
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(ballScreenX, ballScreenY + 3, 9, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ball
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ballScreenX, ballScreenY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 7. SLINGSHOT DRAG FEEDBACK (If user is currently dragging)
        if (s.isDragging && s.dragCurrent) {
            const dragX = s.dragCurrent.x;
            const dragY = s.dragCurrent.y;
            const preview = s.shotPreview;

            // Elastic Slingshot Tether
            ctx.strokeStyle = preview.isOverSwing ? '#EF4444' : '#4ADE80';
            ctx.lineWidth = 3;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(ballScreenX, ballScreenY);
            ctx.lineTo(dragX, dragY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Touch Drag Handle / Finger Target
            ctx.fillStyle = preview.isOverSwing ? 'rgba(239, 68, 68, 0.8)' : 'rgba(74, 222, 128, 0.8)';
            ctx.beginPath();
            ctx.arc(dragX, dragY, 16, 0, Math.PI * 2);
            ctx.fill();

            // Concentric Power Ring around the ball
            const ringRadius = 14 + (preview.powerPct * 0.35);
            ctx.strokeStyle = preview.isOverSwing ? '#EF4444' : (preview.powerPct > 80 ? '#FACC15' : '#4ADE80');
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(ballScreenX, ballScreenY, ringRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Projected Flight Trajectory Arc (Shows Draw / Fade curve!)
            ctx.save();
            ctx.strokeStyle = preview.isOverSwing ? 'rgba(239, 68, 68, 0.7)' : 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(ballScreenX, ballScreenY);

            const arcSteps = 15;
            for (let step = 1; step <= arcSteps; step++) {
                const t = step / arcSteps;
                const arcDist = t * (preview.powerPct * 2.2);
                const arcPt = worldToScreen(arcDist, 0);

                // Apply curve bending according to face/path (Draw vs Fade)
                const curveOffset = (preview.pathDeg * 2.5) * (t * t);
                const arcX = arcPt.x + curveOffset;
                const arcY = arcPt.y - (Math.sin(t * Math.PI) * 45);
                ctx.lineTo(arcX, arcY);
            }
            ctx.stroke();
            ctx.restore();

            // Live Slingshot HUD Pill
            ctx.save();
            const pillY = ballScreenY - 45;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = preview.isOverSwing ? '#EF4444' : '#4ADE80';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(ballScreenX - 80, pillY, 160, 30, 8);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = preview.isOverSwing ? '#EF4444' : (preview.powerPct > 80 ? '#FACC15' : '#4ADE80');
            ctx.font = '900 11px Inter, sans-serif';
            ctx.textAlign = 'center';

            let pillText = `${preview.powerPct}% · ${preview.shapeLabel}`;
            if (preview.isOverSwing) pillText += ` (±${preview.riskPct}%)`;
            ctx.fillText(pillText, ballScreenX, pillY + 18);
            ctx.restore();
        }
    } else {
        // IN-FLIGHT BALL RENDERING
        const frameIdx = Math.min(s.flightFrame, s.flightPoints.length - 1);
        if (s.flightPoints[frameIdx]) {
            const p = s.flightPoints[frameIdx];

            // Project point on screen
            const ptScreen = worldToScreen(p.x, p.y);
            const ballYWithAlt = ptScreen.y - (p.z * ptScreen.sc * 20.0);

            // Ground Shadow
            const shRad = Math.max(1.5, 6 * ptScreen.sc);
            const shAlpha = Math.max(0.08, 0.40 - (p.z * 0.015));
            ctx.fillStyle = `rgba(0, 0, 0, ${shAlpha})`;
            ctx.beginPath();
            ctx.ellipse(ptScreen.x, ptScreen.y, shRad * 1.5, shRad * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Trajectory Trail
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i <= frameIdx; i += 2) {
                const prevP = s.flightPoints[i];
                const prevPt = worldToScreen(prevP.x, prevP.y);
                const prevY = prevPt.y - (prevP.z * prevPt.sc * 20.0);
                if (i === 0) ctx.moveTo(prevPt.x, prevY); else ctx.lineTo(prevPt.x, prevY);
            }
            ctx.stroke();

            // Flying Ball
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(ptScreen.x, ballYWithAlt, Math.max(2.5, 6 * ptScreen.sc), 0, Math.PI * 2);
            ctx.fill();
        }
    }
};

/**
 * Tactical Top-Down Overhead Map View (When toggling 🗺️ CARTE)
 */
window.drawGameOverheadMap = function (ctx, canvas) {
    const s = window.gameState;
    const hole = s.currentHole;
    if (!hole) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark Map Background
    ctx.fillStyle = '#064E3B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pad = 30;
    const mapH = canvas.height - (pad * 2);
    const mapW = canvas.width - (pad * 2);
    const scaleY = mapH / hole.totalDistance;
    const cx = canvas.width * 0.5;

    // Distance Arcs (100m, 150m, 200m, 250m)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let d = 50; d < hole.totalDistance; d += 50) {
        const y = canvas.height - pad - (d * scaleY);
        ctx.beginPath();
        ctx.moveTo(pad, y);
        ctx.lineTo(canvas.width - pad, y);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px Inter';
        ctx.fillText(`${d}m`, pad + 5, y - 4);
    }

    // Curved Fairway Ribbon
    ctx.fillStyle = '#22C55E';
    ctx.beginPath();
    hole.fairwayProfile.forEach((pt, idx) => {
        const y = canvas.height - pad - (pt.d * scaleY);
        const xL = cx + pt.x - (pt.width * 0.8);
        if (idx === 0) ctx.moveTo(xL, y); else ctx.lineTo(xL, y);
    });
    for (let i = hole.fairwayProfile.length - 1; i >= 0; i--) {
        const pt = hole.fairwayProfile[i];
        const y = canvas.height - pad - (pt.d * scaleY);
        const xR = cx + pt.x + (pt.width * 0.8);
        ctx.lineTo(xR, y);
    }
    ctx.closePath();
    ctx.fill();

    // Bunkers
    hole.bunkers.forEach(b => {
        const y = canvas.height - pad - (b.d * scaleY);
        const x = cx + b.x;
        ctx.fillStyle = '#FDE68A';
        ctx.beginPath();
        ctx.ellipse(x, y, b.radiusX * 0.8, b.radiusY * scaleY * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
    });

    // Green
    const greenY = canvas.height - pad - (hole.green.d * scaleY);
    const greenX = cx + hole.green.x;
    ctx.fillStyle = '#4ADE80';
    ctx.beginPath();
    ctx.ellipse(greenX, greenY, hole.green.radiusX, hole.green.radiusY * scaleY * 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flag Pin
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(greenX + hole.green.pinOffset.x, greenY - (hole.green.pinOffset.y * scaleY), 4, 0, Math.PI * 2);
    ctx.fill();

    // Ball Position
    const ballY = canvas.height - pad - (s.ballPosition.forwardMeters * scaleY);
    const ballX = cx + s.ballPosition.lateralMeters;

    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#4ADE80';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Overlay Header on Map
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Inter';
    ctx.fillText(`TROU ${hole.number} · PAR ${hole.par} (${hole.totalDistance}m)`, pad, pad - 10);
};
