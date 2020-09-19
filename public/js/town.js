/* eslint-disable prettier/prettier */
// --------------------------------------------------------------------------------
// Initial scene setup and render to the HTML page
// --------------------------------------------------------------------------------

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 2;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const domEvents	= new THREEx.DomEvents(camera, renderer.domElement);

// --------------------------------------------------------------------------------
// Load the GLTF Scene I created
// --------------------------------------------------------------------------------

const loader = new GLTFLoader();
loader.load(
  "../img/town2.glb",
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
    console.error("An error happened", error);
  },
);

// --------------------------------------------------------------------------------
// Lighting
// --------------------------------------------------------------------------------

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
scene.add(directionalLight);


const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.2);
scene.add(hemiLight);

// --------------------------------------------------------------------------------
// Updateable Text for Signs
// --------------------------------------------------------------------------------

const fontLoader = new THREE.FontLoader();

fontLoader.load("../fonts/Roboto_Bold.json", (font) => {

  // Office
  const officeText = new THREE.TextGeometry("OFFICE " + officeTasks, {
    font: font,
    size: .5,
    height: .5,
    curveSegments: 12,
  });
  const officeMesh = new THREE.Mesh(officeText, new THREE.MeshStandardMaterial({
    color: "black",
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide
  }));
  officeMesh.position.set(15.15, 3.51, -25.5);
  officeMesh.rotation.y = Math.PI / -2;
  scene.add(officeMesh);

  // School
  const schoolText = new THREE.TextGeometry("SCHOOL " + schoolTasks, {
    font: font,
    size: .39,
    height: .5,
    curveSegments: 12,
  });
  const schoolMesh = new THREE.Mesh(schoolText, new THREE.MeshStandardMaterial({
    color: "white",
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide
  }));
  schoolMesh.position.set(-9.8, 4.85, -1.2);
  schoolMesh.rotation.y = Math.PI / 2;
  scene.add(schoolMesh);

  // Store
  const storeText = new THREE.TextGeometry("STORE " + storeTasks, {
    font: font,
    size: .42,
    height: .5,
    curveSegments: 12,
  });
  const storeMesh = new THREE.Mesh(storeText, new THREE.MeshStandardMaterial({
    color: "black",
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide
  }));
  storeMesh.position.set(-10, 4.5, -26.5);
  storeMesh.rotation.y = Math.PI / 2;
  scene.add(storeMesh);
});

// --------------------------------------------------------------------------------
// Creating clickable doors
// --------------------------------------------------------------------------------

// create the school door mesh
const schoolMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
const schoolGeometry = new THREE.PlaneGeometry(1.8, 3, 1);
const schoolMesh = new THREE.Mesh(schoolGeometry, schoolMaterial);
schoolMesh.rotation.y = Math.PI / 2;
schoolMesh.position.set(-9.7, 2, -2.5);
scene.add(schoolMesh);

// create the office door mesh
const officeMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
const officeGeometry = new THREE.PlaneGeometry(1.6, 2.2, 1);
const officeMesh = new THREE.Mesh(officeGeometry, officeMaterial);
officeMesh.rotation.y = Math.PI / -2;
officeMesh.position.set(17.2, 1.4, -24);
scene.add(officeMesh);

// create the store door mesh
const storeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
const storeGeometry = new THREE.PlaneGeometry(1.8, 3, 1);
const storeMesh = new THREE.Mesh(storeGeometry, storeMaterial);
storeMesh.rotation.y = Math.PI / 2;
storeMesh.position.set(-9, 2, -26.5);
scene.add(storeMesh);

// create the home door mesh
const homeMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
const homeGeometry = new THREE.PlaneGeometry(1.2, 2.5, 1);
const homeMesh = new THREE.Mesh(homeGeometry, homeMaterial);
homeMesh.rotation.y = Math.PI / -2;
homeMesh.position.set(21, 1.9, 6.3);
scene.add(homeMesh);