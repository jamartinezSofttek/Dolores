// 1. Escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Luces
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 3. Geometría del corazón
const heartShape = new THREE.Shape();
heartShape.moveTo(0, -1);
heartShape.bezierCurveTo(1.5, -1.5, 1.5, 1, 0, 1);
heartShape.bezierCurveTo(-1.5, 1, -1.5, -1.5, 0, -1);

const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 10
};

const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
heartMesh.rotation.x = Math.PI; // Rotar para que quede derecho
scene.add(heartMesh);

// 4. Texto 3D
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Te amo', {
        font: font,
        size: 0.35, // Ajustar tamaño del texto
        height: 0.1, // Ajustar grosor del texto
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
    textGeometry.center(); // Asegurarse de que el texto esté centrado
    textMesh.position.y = -0.2; // Ajustar posición para que esté dentro del corazón
    scene.add(textMesh);
});

// 5. Animación
function animate() {
    requestAnimationFrame(animate);

    // Oscilación de movimiento y cambio de color
    heartMesh.rotation.y += 0.01;
    heartMesh.position.x = Math.sin(Date.now() * 0.001) * 2;
    heartMaterial.color.setHSL((0.5 + Math.sin(Date.now() * 0.002)) % 1, 0.8, 0.5);

    renderer.render(scene, camera);
}
animate();

// 6. Ajuste de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});