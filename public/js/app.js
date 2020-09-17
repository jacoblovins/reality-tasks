import * as THREE from '/build/three.module.js';
import { PointerLockControls } from '/jsm/controls/PointerLockControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
// import { Mesh, MeshStandardMaterial } from '/build/three.module';
// import { TTFLoader } from '/jsm/loaders/TTFLoader.js';

const scene = new THREE.Scene();
let officeTasks = 5;
let schoolTasks = 3;
let storeTasks = 9;

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
            controls.moveForward(.35)
            break;
        case 65: // a
            controls.moveRight(-.35)
            break;
        case 83: // s
            controls.moveForward(-.35)
            break;
        case 68: // d
            controls.moveRight(.35)
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


var fontLoader = new THREE.FontLoader();

fontLoader.load( '../fonts/Roboto_Bold.json', function ( font ) {

	const officeText = new THREE.TextGeometry( 'OFFICE ' + officeTasks, {
		font: font,
		size: .5,
		height: .5,
		curveSegments: 12,
    } );
    
    const officeMesh = new THREE.Mesh(officeText, new THREE.MeshStandardMaterial({
        color: "black",
        metalness: 0.0,
        roughness: 0.5,
        side: THREE.DoubleSide
    }))
    officeMesh.position.set(15.15, 3.51, -25.5)
    officeMesh.rotation.y = Math.PI / -2;
    scene.add(officeMesh)

    const schoolText = new THREE.TextGeometry( 'SCHOOL ' + schoolTasks, {
		font: font,
		size: .39,
		height: .5,
		curveSegments: 12,
    } );
    
    const schoolMesh = new THREE.Mesh(schoolText, new THREE.MeshStandardMaterial({
        color: "white",
        metalness: 0.0,
        roughness: 0.5,
        side: THREE.DoubleSide
    }))
    schoolMesh.position.set(-9.8, 4.85, -1.2)
    schoolMesh.rotation.y = Math.PI / 2;
    scene.add(schoolMesh)

    const storeText = new THREE.TextGeometry( 'STORE ' + storeTasks, {
		font: font,
		size: .42,
		height: .5,
		curveSegments: 12,
    } );
    
    const storeMesh = new THREE.Mesh(storeText, new THREE.MeshStandardMaterial({
        color: "black",
        metalness: 0.0,
        roughness: 0.5,
        side: THREE.DoubleSide
    }))
    storeMesh.position.set(-10, 4.5, -26.5)
    storeMesh.rotation.y = Math.PI / 2;
    scene.add(storeMesh)
} );



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
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
}

animate();