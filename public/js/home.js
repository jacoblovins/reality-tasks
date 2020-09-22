/* eslint-disable prettier/prettier */
import * as THREE from "/build/three.module.js";
import { FirstPersonControls } from "/jsm/controls/FirstPersonControls.js";
import Stats from "/jsm/libs/stats.module.js";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";
import startTown from "./app.js";
import { CSS3DRenderer, CSS3DObject } from "/jsm/renderers/CSS3DRenderer.js";



function startHomeRoom() {
  const clock = new THREE.Clock();
  const townScene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = -3;
  camera.position.y = 1.7;
  camera.rotation.y = 180 * Math.PI / 180;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = 0;
  // renderer.domElement.style.zIndex = "1";
  // renderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(renderer.domElement);

  const renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 0;
  document.body.appendChild(renderer2.domElement);

  const domEvents2	= new THREEx.DomEvents(camera, renderer2.domElement);


  const controls = new FirstPersonControls( camera, renderer2.domElement );
  controls.movementSpeed = 5;
  controls.lookSpeed = 0.08;
  controls.lookVertical = false;

  const loader = new GLTFLoader();
  loader.load(
    "../img/homeRoom.glb",
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

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
  townScene.add(directionalLight);


  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.2);
  townScene.add(hemiLight);

  const homeMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const homeGeometry = new THREE.PlaneGeometry(2, 2.55, 1);
  const homeMesh = new THREE.Mesh(homeGeometry, homeMaterial);
  homeMesh.rotation.y = 90 * Math.PI / 90;
  homeMesh.position.set(0, 1.17, 5);
  townScene.add(homeMesh);

  // --------------------------------------------------------------------------------
  // Add a todo element
  // --------------------------------------------------------------------------------

  const officeMaterial = new THREE.MeshBasicMaterial({wireframe: false, transparent: true, opacity: 0});
  const officeGeometry = new THREE.PlaneGeometry(4, 2.5, 1);
  const officeMesh = new THREE.Mesh(officeGeometry, officeMaterial);
  // officeMesh.rotation.y = Math.PI / -2;
  // officeMesh.rotation.y = 180 * Math.PI / 180;
  officeMesh.position.set(.1, 1.4, -4.77);
  // z=6.3
  townScene.add(officeMesh);

  const moveMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const moveGeometry = new THREE.PlaneGeometry(9, 4, 1);
  const moveMesh = new THREE.Mesh(moveGeometry, moveMaterial);
  // moveMesh.rotation.y = Math.PI / -2;
  // moveMesh.rotation.y = 180 * Math.PI / 180;
  moveMesh.position.set(0, 1.7, -5);
  // z=6.3
  townScene.add(moveMesh);


  const element = document.createElement("div");
  const iframe = document.createElement("iframe");
  iframe.src = "../schoolTodo.html";
  iframe.style.width = "375px";
  iframe.style.height = "210px";
  element.appendChild(iframe);


  const domObject = new CSS3DObject(element);
  domObject.scale.set(.009, .009, .009);
  officeMesh.add(domObject);

  domEvents2.addEventListener(officeMesh, "mouseover", () => {
    controls.enabled = false;
  }, false);
  
  domEvents2.addEventListener(moveMesh, "mouseover", () => {
    controls.enabled = true;
  }, false);


  // --------------------------------------------------------------------------------
  // Door click
  // --------------------------------------------------------------------------------


  domEvents2.addEventListener(homeMesh, "click", () => {
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

  const stats = Stats();
  document.body.appendChild(stats.dom);

  const animate = function () {
    requestAnimationFrame(animate);
    if(camera.position.x < -3){
      camera.position.x = -3;
    } else if(camera.position.x > 3){
      camera.position.x = 3;
    } else if(camera.position.z > 4){
      camera.position.z = 4;
    }else if(camera.position.z < -4){
      camera.position.z = -4;
    }
    render();
    stats.update();
  };

  animate();
  
  function render() {
    controls.update( clock.getDelta() );
    renderer.render(townScene, camera);
    renderer2.render(townScene, camera);
  }

}
export { startHomeRoom as default };

