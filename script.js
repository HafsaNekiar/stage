import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'https://threejs.org/examples/jsm/controls/TransformControls.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

function start() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    const loader = new GLTFLoader();
    loader.load('model.gltf', function (gltf) {
        scene.add(gltf.scene);
        transformControls.attach(gltf.scene);
    });

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        // Use data to manipulate objects in the scene
    };

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

$(window).on("load", start);

