import * as THREE from '/build/three.module.js';
import { PointerLockControls } from '/jsm/controls/PointerLockControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 2;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.addEventListener('mousedown', function () {
    controls.lock();
}, false);

document.addEventListener('mouseup', function () {
    controls.unlock();
}, false);

// const controls = new OrbitControls(camera, renderer.domElement);
const controls = new PointerLockControls(camera, renderer.domElement)

const onKeyDown = function (event) {
    switch (event.keyCode) {
        case 87: // w
            controls.moveForward(.25)
            break;
        case 65: // a
            controls.moveRight(-.25)
            break;
        case 83: // s
            controls.moveForward(-.25)
            break;
        case 68: // d
            controls.moveRight(.25)
            break;
    }
};
document.addEventListener('keydown', onKeyDown, false);

const loader = new GLTFLoader();
loader.load(
    '../img/town1.glb',
    (gltf) => {
        // called when the resource is loaded
        scene.add(gltf.scene);
    },
    (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    (error) => {
        // called when loading has errors
        console.error('An error happened', error);
    },
);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
scene.add(directionalLight);


const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 ); 
scene.add(hemiLight);



window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

const stats = Stats();
document.body.appendChild(stats.dom);

const animate = function () {
    requestAnimationFrame(animate);
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    // controls.update();
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
}

animate();