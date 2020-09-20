/* eslint-disable prettier/prettier */
import * as THREE from "/build/three.module.js";
import { FirstPersonControls } from "/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";
import startTown from "./app.js";



function startOfficeRoom() {
  const clock = new THREE.Clock();
  const townScene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;
  camera.position.y = 1.7;
  camera.rotation.y = 90 * Math.PI / 180;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const domEvents	= new THREEx.DomEvents(camera, renderer.domElement);


  const controls = new FirstPersonControls( camera, renderer.domElement );
  controls.movementSpeed = 5;
  controls.lookSpeed = 0.08;
  controls.lookVertical = false;

  const loader = new GLTFLoader();
  loader.load(
    "../img/officeroom.glb",
    (gltf) => {
    // called when the resource is loaded
      townScene.add(gltf.scene);
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

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
  // townScene.add(directionalLight);


  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.2);
  townScene.add(hemiLight);

  const light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 1.1, 0 );
  townScene.add( light );



  const homeMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const homeGeometry = new THREE.PlaneGeometry(1.8, 2.3, 1);
  const homeMesh = new THREE.Mesh(homeGeometry, homeMaterial);
  homeMesh.rotation.y = 90 * Math.PI / 90;
  homeMesh.position.set(0, 1.1, 7.5);
  townScene.add(homeMesh);

  domEvents.addEventListener(homeMesh, "click", () => {
    console.log("you clicked on the mesh");
    document.body.innerHTML = "";
    startTown();
  }, false);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
  }, false);

  const animate = function () {
    requestAnimationFrame(animate);
    if(camera.position.x < -6){
      camera.position.x = -6;
    } else if(camera.position.x > 5.8){
      camera.position.x = 5.8;
    } else if(camera.position.z > 6.5){
      camera.position.z = 6.5;
    }else if(camera.position.z < -6.5){
      camera.position.z = -6.5;
    }
    render();
  };

  animate();
  
  function render() {
    controls.update( clock.getDelta() );
    renderer.render(townScene, camera);
  }

}
export { startOfficeRoom as default };

