// Importamos THREE.js si aún no lo has hecho
// const THREE = require('three');

// 1. Escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 3. Geometría de la pelota
const ballRadius = 5;
const geometry = new THREE.SphereGeometry(ballRadius, 32, 32);
const material = new THREE.MeshPhongMaterial({ color: 0xffde59 });

const ballMesh = new THREE.Mesh(geometry, material);
scene.add(ballMesh);

// 4. Texto 3D
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Fernando', { // Cambio de texto
        font: font,
        size: 0.5,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01
    });

    const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        specular: 0xffffff,
        shininess: 100
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
    // Centrando y posicionando el texto sobre la pelota
    textGeometry.center();
    textMesh.position.set(-1.5, 0, ballRadius); // Ajusta la posición según sea necesario
    scene.add(textMesh);
});

// 5. Animación
function animate() {
    requestAnimationFrame(animate);

    // Rotate the ball
    ballMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// 6. Ajuste de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});