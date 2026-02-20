import * as THREE from 'three';

/**
 * THREE.JS PUTTING VIEW
 * Perspective view for the Putting mode.
 */
class PuttingView3D {
    constructor() {
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.ball = null;
        this.green = null;
        this.isInitialized = false;
        this.animationData = null;
        this.frameIndex = 0;
    }

    init(containerId) {
        if (this.isInitialized) return;
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#064E3B');

        // Camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0.5, 1.5); // 0.5m high behind the ball
        this.camera.lookAt(0, 0, -5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048; // Higher resolution shadows
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.left = -20;
        dirLight.shadow.camera.right = 20;
        dirLight.shadow.camera.top = 20;
        dirLight.shadow.camera.bottom = -20;
        dirLight.shadow.bias = -0.0001;
        this.scene.add(dirLight);

        // Texture Loading
        const loader = new THREE.TextureLoader();

        // Grass Textures
        const grassColor = loader.load('assets/textures/grass/Grass005_2K-JPG_Color.jpg');
        const grassNormal = loader.load('assets/textures/grass/Grass005_2K-JPG_NormalGL.jpg');
        const grassRough = loader.load('assets/textures/grass/Grass005_2K-JPG_Roughness.jpg');
        const grassAO = loader.load('assets/textures/grass/Grass005_2K-JPG_AmbientOcclusion.jpg');

        [grassColor, grassNormal, grassRough, grassAO].forEach(t => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.repeat.set(20, 80);
        });

        // Ball Texture
        const ballTex = loader.load('assets/textures/golf_texture.jpg');
        ballTex.anisotropy = 16;

        // Green (Plane)
        const greenGeo = new THREE.PlaneGeometry(50, 200);
        const greenMat = new THREE.MeshStandardMaterial({
            map: grassColor,
            normalMap: grassNormal,
            normalScale: new THREE.Vector2(0.8, 0.8),
            roughnessMap: grassRough,
            aoMap: grassAO,
            roughness: 1.0,
            metalness: 0.0
        });



        this.green = new THREE.Mesh(greenGeo, greenMat);
        this.green.rotation.x = -Math.PI / 2;
        this.green.receiveShadow = true;
        this.scene.add(this.green);

        // Ball (Sphere)
        const ballGeo = new THREE.SphereGeometry(0.02135, 64, 64); // Smoother sphere
        const ballMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: ballTex,
            roughness: 0.15, // Glossy finish for a golf ball
            metalness: 0.0,
            bumpMap: ballTex,
            bumpScale: 0.002
        });
        this.ball = new THREE.Mesh(ballGeo, ballMat);
        this.ball.position.y = 0.02135;
        this.ball.castShadow = true;
        this.scene.add(this.ball);

        const grid = new THREE.GridHelper(200, 100, 0xffffff, 0x222222);
        grid.rotation.x = -Math.PI / 2;
        grid.position.y = 0.001; // Juste au dessus du sol
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);

        // Env Map (Procedural PBR)
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();

        // Use the background as a base for environment
        this.scene.environment = pmremGenerator.fromScene(new THREE.Scene()).texture;

        this.isInitialized = true;
        this.animate();

        window.addEventListener('resize', () => this.onResize());
    }

    onResize() {
        if (!this.isInitialized) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startPuttAnimation(trajectoryData) {
        this.animationData = trajectoryData;
        this.frameIndex = 0;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.animationData && this.frameIndex < this.animationData.path.length) {
            const p = this.animationData.path[this.frameIndex];

            // Map coordinate (Physics Engine: X=Side, Y=Distance)
            // Three.js: X=Side, Z=-Distance
            this.ball.position.x = p.x;
            this.ball.position.z = -p.y;

            // Rotation simulation (Rolling)
            if (this.frameIndex > 0) {
                const prev = this.animationData.path[this.frameIndex - 1];
                const dx = p.x - prev.x;
                const dy = p.y - prev.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                this.ball.rotation.x -= dist / 0.02135;
            }

            // Camera follow (Softly)
            this.camera.position.x = p.x * 0.5;
            this.camera.position.z = -p.y + 1.5;

            this.frameIndex += 1;
        }

        this.renderer.render(this.scene, this.camera);
    }

    setVisible(visible) {
        if (this.renderer) {
            this.renderer.domElement.style.display = visible ? 'block' : 'none';
        }
        if (this.container) {
            this.container.style.display = visible ? 'block' : 'none';
            this.container.style.pointerEvents = visible ? 'auto' : 'none';
        }
    }
}

// Global instance for logic bridge
window.puttingView3D = new PuttingView3D();
