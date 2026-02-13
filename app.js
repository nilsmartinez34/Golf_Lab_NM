/**
 * APP ORCHESTRATOR - Handles dynamic fragment loading and initialization.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject name property for clubs (Legacy support if needed)
    if (window.PhysicsEngine && PhysicsEngine.GOLF_BAG) {
        Object.keys(PhysicsEngine.GOLF_BAG).forEach(key => {
            PhysicsEngine.GOLF_BAG[key].name = key;
        });
    }

    // 1. Load Modals
    loadFragment('components/modals.html', 'modal-container', () => {
        if (window.initUI) initUI();
    });

    // 2. Initialize Navigation
    if (window.initTabs) initTabs();
    if (window.initMainCanvas) initMainCanvas();

    // 3. Load initial mode (Swing)
    window.switchMode('swing');

    // 4. Service Worker
    registerServiceWorker();
});

window.switchMode = async function (mode) {
    if (!window.appState) {
        console.error("appState not found! ui_manager.js might have failed to load.");
        return;
    }
    console.log(`Switching to mode: ${mode}`);
    appState.mode = mode;

    // UI feedback for tabs
    document.querySelectorAll('.tab-link').forEach(btn => {
        btn.classList.toggle('active', btn.id === `tab-${mode}`);
    });

    const fragmentPath = `src/html/${mode}_ui.html`;

    try {
        const response = await fetch(fragmentPath);
        if (!response.ok) {
            console.error(`Fragment Load Failed: ${fragmentPath} - Status: ${response.status}`);
            return;
        }
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Target Containers in index.html index.html skeleton
        const header = document.getElementById('main-metrics');
        const modeZone = document.getElementById('mode-content');
        const footer = document.getElementById('main-footer');

        if (!header || !modeZone || !footer) {
            console.error("Main skeleton containers missing (main-metrics, mode-content, or main-footer)");
            return;
        }

        // Clean and Inject Fragments
        header.innerHTML = '';
        modeZone.innerHTML = '';
        footer.innerHTML = '';

        // Inject Metrics (.metric-container)
        const metrics = doc.querySelector('.metric-container');
        if (metrics) {
            header.innerHTML = metrics.outerHTML;
        } else {
            console.warn(`No .metric-container found in ${mode}_ui.html`);
        }

        // Inject Content (div id matches *-content)
        const content = doc.querySelector('div[id$="-content"]');
        if (content) {
            modeZone.innerHTML = content.outerHTML;
        } else {
            console.warn(`No content-div (id$="-content") found in ${mode}_ui.html`);
        }

        // Inject Footer (.footer-segment)
        const footerSegment = doc.querySelector('.footer-segment');
        if (footerSegment) {
            footer.innerHTML = footerSegment.outerHTML;
        } else {
            console.warn(`No .footer-segment found in ${mode}_ui.html`);
        }

        // --- Post-Injection Initialization ---
        console.log(`Initializing Logic for: ${mode}`);
        if (mode === 'swing' && window.initSwingUI) {
            window.initSwingUI();
        } else if (mode === 'chip' && window.initChipUI) {
            window.initChipUI();
        } else if (mode === 'putt' && window.initPuttUI) {
            window.initPuttUI();
        } else {
            console.warn(`No init function found for mode: ${mode}`);
        }

        if (window.resizeCanvas) window.resizeCanvas();

    } catch (error) {
        console.error(`ERROR in switchMode(${mode}):`, error);
    }
};

async function loadFragment(path, containerId, callback) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            if (callback) callback();
        }
    } catch (err) {
        console.error(`Error loading fragment ${path}:`, err);
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registered:', reg))
                .catch(err => console.log('Service Worker registration failed:', err));
        });
    }
}
