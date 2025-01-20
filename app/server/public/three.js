const maxWidth = 500; // pixels

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;

new THREE.TextureLoader().load('/3d/textures/environment.png', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture; 
  scene.background = null;
});

// Attach renderer to container
const container = document.getElementById('phone3d');
container.style.width = `${maxWidth}px`;
container.style.height = `${maxWidth}px`;
container.appendChild(renderer.domElement);

function resizeRenderer() {
  const width = container.clientWidth;
  const height = width / camera.aspect;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

resizeRenderer();

// Load and position the 3D model
const loader = new THREE.GLTFLoader();
loader.load(
  '/3d/scene.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(72, 72, 72);
    scene.add(model);

    model.rotation.y = Math.PI / 8;

    function animate() {
      requestAnimationFrame(animate);
      updateLightPosition();
      model.rotation.y += 0.005; 
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the model:", error);
  }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);
function updateLightPosition() {
  directionalLight.position.copy(camera.position);
  directionalLight.target.position.copy(camera.position).add(camera.getWorldDirection(new THREE.Vector3())); 
  directionalLight.target.updateMatrixWorld();
}

camera.position.set(0, 1, 12);

window.addEventListener('resize', resizeRenderer);
