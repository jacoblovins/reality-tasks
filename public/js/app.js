/* eslint-disable prettier/prettier */
import * as THREE from "/build/three.module.js";
import { FirstPersonControls } from "/jsm/controls/FirstPersonControls.js";
import Stats from "/jsm/libs/stats.module.js";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";
import startSchoolRoom from "./roomScenes/school.js";
import startOfficeRoom from "./roomScenes/office.js";
import startStoreRoom from "./roomScenes/store.js";
import startHomeRoom from "./roomScenes/home.js";
import { VRButton } from "/jsm/webxr/VRButton.js";

function startTown() {
  // --------------------------------------------------------------------------------
  // Initial scene setup and render to the HTML page
  // --------------------------------------------------------------------------------
  
  const clock = new THREE.Clock();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 2;
  camera.position.y = 2;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  document.body.appendChild( VRButton.createButton( renderer ) );
  renderer.xr.enabled = true;

  // --------------------------------------------------------------------------------
  // Movement Controls
  // --------------------------------------------------------------------------------

  const controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 5;
  controls.lookSpeed = 0.08;
  controls.lookVertical = false;

  const mouseMaterial = new THREE.MeshBasicMaterial({ wireframe: false, transparent: true, opacity: 0 });
  const mouseGeometry = new THREE.PlaneGeometry(2.2, 3.5, 1);
  const mouseMesh = new THREE.Mesh(mouseGeometry, mouseMaterial);
  scene.add(mouseMesh);

  domEvents.addEventListener(mouseMesh, "mouseover", () => {
    controls.activeLook = false;
  }, false);

  domEvents.addEventListener(mouseMesh, "mouseout", () => {
    controls.activeLook = true;
  }, false);


  // --------------------------------------------------------------------------------
  // Load the GLTF Scene I created
  // --------------------------------------------------------------------------------

  const loader = new GLTFLoader();
  loader.load(
    "../img/town.glb",
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
    const officeText = new THREE.TextGeometry("OFFICE", {
      font: font,
      size: .5,
      height: .1,
      curveSegments: 12,
    });
    const officeMesh = new THREE.Mesh(officeText, new THREE.MeshStandardMaterial({
      color: "black",
      metalness: 0.0,
      roughness: 0.5,
      side: THREE.DoubleSide
    }));
    officeMesh.position.set(14.72, 3.51, -25.2);
    officeMesh.rotation.y = Math.PI / -2;
    scene.add(officeMesh);

    // School
    const schoolText = new THREE.TextGeometry("SCHOOL", {
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
    schoolMesh.position.set(-9.8, 4.85, -1.42);
    schoolMesh.rotation.y = Math.PI / 2;
    scene.add(schoolMesh);

    // Store
    const storeText = new THREE.TextGeometry("STORE", {
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
    storeMesh.position.set(-13, 5.375, -21.3);
    storeMesh.rotation.y = Math.PI / 2;
    scene.add(storeMesh);
    
    // RIP Kayla
    const ripText = new THREE.TextGeometry("RIP", {
      font: font,
      size: .15,
      height: .1,
      curveSegments: 12,
    });
    const ripMesh = new THREE.Mesh(ripText, new THREE.MeshStandardMaterial({
      color: "black",
      metalness: 0.0,
      roughness: 0.5,
      side: THREE.DoubleSide
    }));
    ripMesh.position.set(-7.8, .8, 10.17);
    ripMesh.rotation.y = Math.PI / 2;
    scene.add(ripMesh);

    const kaylaText = new THREE.TextGeometry("Kayla", {
      font: font,
      size: .15,
      height: .1,
      curveSegments: 12,
    });
    const kaylaMesh = new THREE.Mesh(kaylaText, new THREE.MeshStandardMaterial({
      color: "black",
      metalness: 0.0,
      roughness: 0.5,
      side: THREE.DoubleSide
    }));
    kaylaMesh.position.set(-7.8, .55, 10.25);
    kaylaMesh.rotation.y = Math.PI / 2;
    scene.add(kaylaMesh);
  });

  // --------------------------------------------------------------------------------
  // Clickable doors
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
  const storeMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const storeGeometry = new THREE.PlaneGeometry(1.6, 3.5, 1);
  const storeMesh = new THREE.Mesh(storeGeometry, storeMaterial);
  storeMesh.rotation.y = Math.PI / 2;
  storeMesh.position.set(-13, 2, -22.2);
  scene.add(storeMesh);

  // create the home door mesh
  const homeMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const homeGeometry = new THREE.PlaneGeometry(1.2, 2.5, 1);
  const homeMesh = new THREE.Mesh(homeGeometry, homeMaterial);
  homeMesh.rotation.y = Math.PI / -2;
  homeMesh.position.set(21, 1.9, 6.3);
  scene.add(homeMesh);


  // --------------------------------------------------------------------------------
  // Resize Update/ Re-render
  // --------------------------------------------------------------------------------

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
  }, false);

  // --------------------------------------------------------------------------------
  // Go to rooms when doors are clicked
  // --------------------------------------------------------------------------------

  domEvents.addEventListener(schoolMesh, "click", () => {
    console.log("you clicked on the mesh");
    document.body.innerHTML = "";
    startSchoolRoom();
  }, false);

  domEvents.addEventListener(officeMesh, "click", () => {
    console.log("you clicked on the mesh");
    document.body.innerHTML = "";
    startOfficeRoom();
  }, false);

  domEvents.addEventListener(storeMesh, "click", () => {
    console.log("you clicked on the mesh");
    document.body.innerHTML = "";
    startStoreRoom();
  }, false);

  domEvents.addEventListener(homeMesh, "click", () => {
    console.log("you clicked on the mesh");
    document.body.innerHTML = "";
    startHomeRoom();
  }, false);

  // --------------------------------------------------------------------------------
  // Frame Rate (remove this later)
  // --------------------------------------------------------------------------------

  const stats = Stats();
  document.body.appendChild(stats.dom);

  // --------------------------------------------------------------------------------
  // Render all the above code every time the screen refreshes (hopefully 60fps)
  // --------------------------------------------------------------------------------
  
  const render = function () {
    if (camera.position.x < -8) {
      camera.position.x = -8;
    } else if (camera.position.x > 15.5) {
      camera.position.x = 15.5;
    } else if (camera.position.z > 11) {
      camera.position.z = 11;
    } else if (camera.position.z < -30) {
      camera.position.z = -30;
    } else if (camera.position.y < 2 || camera.position.y > 2) {
      camera.position.y = 2;
    }

    controls.update(clock.getDelta());
    renderer.render(scene, camera);
    mouseMesh.rotation.copy( camera.rotation );
    mouseMesh.position.copy( camera.position );
    mouseMesh.updateMatrix();
    mouseMesh.translateZ( - 2 );
    stats.update();
  };
  
  renderer.setAnimationLoop(render);
  // render();
}
startTown();

export { startTown as default };