// Importamos THREE.js si aún no lo has hecho
// const THREE = require('three');

// 1. Escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// 3. Texto 3D
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Fernando', {
        font: font,
        size: 1,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05
    });

    const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        specular: 0xffffff,
        shininess: 100
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
    // Centro del texto
    textGeometry.center();
    scene.add(textMesh);

    render();  // Render con fuente cargada
});

// 4. Corazones
const heartShape = new THREE.Shape();

heartShape.moveTo( 0, -0.5 );
heartShape.bezierCurveTo( 0, -0.5, -0.5, -0.7, -0.5, -1 );
heartShape.bezierCurveTo( -0.5, -1.3, 0, -1.5, 0, -1 );
heartShape.bezierCurveTo( 0, -1.5, 0.5, -1.3, 0.5, -1 );
heartShape.bezierCurveTo( 0.5, -0.7, 0, -0.5, 0, -0.5 );

const hearts = [];
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, { depth: 0.5, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 });
const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
for (let i = 0; i < 10; i++) {
    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    heartMesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    scene.add(heartMesh);
    hearts.push(heartMesh);
}

// 5. Animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar el texto
    textMesh.rotation.y += 0.01;

    // Animar los corazones girando alrededor
    hearts.forEach(heart => {
        heart.rotation.x += 0.02;
        heart.rotation.y += 0.02;
    });

    renderer.render(scene, camera);
}

function render(){
    animate();
}

render();

// 6. Ajuste de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});