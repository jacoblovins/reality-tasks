/* eslint-disable prettier/prettier */
import * as THREE from "/build/three.module.js";
import { FirstPersonControls } from "/jsm/controls/FirstPersonControls.js";
import Stats from "/jsm/libs/stats.module.js";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";
import { CSS3DRenderer, CSS3DObject } from "/jsm/renderers/CSS3DRenderer.js";
import { VRButton } from "/jsm/webxr/VRButton.js";



function startHomeRoom() {
  // --------------------------------------------------------------------------------
  // Initial scene setup and render to the HTML page
  // --------------------------------------------------------------------------------

  const clock = new THREE.Clock();
  const townScene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 2;
  camera.position.y = 1.7;
  // camera.rotation.y = 180 * Math.PI / 180;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = 0;
  document.body.appendChild(renderer.domElement);

  const renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 0;
  document.body.appendChild(renderer2.domElement);

  const domEvents2	= new THREEx.DomEvents(camera, renderer2.domElement);
  document.body.appendChild( VRButton.createButton( renderer ) );
  renderer.xr.enabled = true;
  
  // --------------------------------------------------------------------------------
  // Movement Controls
  // --------------------------------------------------------------------------------

  const controls = new FirstPersonControls( camera, renderer2.domElement );
  controls.movementSpeed = 5;
  controls.lookSpeed = 0.08;
  controls.lookVertical = false;

  const homeMaterial = new THREE.MeshBasicMaterial({ wireframe: false, transparent: true, opacity: 0 });
  const homeGeometry = new THREE.PlaneGeometry(1.2, 3, 1);
  const homeMesh = new THREE.Mesh(homeGeometry, homeMaterial);
  townScene.add(homeMesh);

  domEvents2.addEventListener(homeMesh, "mouseover", () => {
    controls.activeLook = false;
  }, false);

  domEvents2.addEventListener(homeMesh, "mouseout", () => {
    controls.activeLook = true;
  }, false);
  
  // --------------------------------------------------------------------------------
  // Load the GLTF Scene I created
  // --------------------------------------------------------------------------------

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

  // --------------------------------------------------------------------------------
  // Lighting
  // --------------------------------------------------------------------------------

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
  townScene.add(directionalLight);


  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.2);
  townScene.add(hemiLight);

  // --------------------------------------------------------------------------------
  // Clickable exit door
  // --------------------------------------------------------------------------------

  const doorMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const doorGeometry = new THREE.PlaneGeometry(2, 2.55, 1);
  const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
  doorMesh.rotation.y = 90 * Math.PI / 90;
  doorMesh.position.set(0, 1.17, 5);
  townScene.add(doorMesh);

  domEvents2.addEventListener(doorMesh, "click", () => {
    console.log("you clicked on the mesh");
    document.location.reload();
  }, false);

  // --------------------------------------------------------------------------------
  // Add a todo element
  // --------------------------------------------------------------------------------

  const officeMaterial = new THREE.MeshBasicMaterial({wireframe: false, transparent: true, opacity: 0});
  const officeGeometry = new THREE.PlaneGeometry(4, 2.5, 1);
  const officeMesh = new THREE.Mesh(officeGeometry, officeMaterial);
  officeMesh.position.set(.1, 1.4, -4.77);
  townScene.add(officeMesh);

  const moveMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
  const moveGeometry = new THREE.PlaneGeometry(9, 4, 1);
  const moveMesh = new THREE.Mesh(moveGeometry, moveMaterial);
  moveMesh.position.set(0, 1.7, -5);
  townScene.add(moveMesh);

  const element = document.createElement("div");
  const iframe = document.createElement("iframe");
  iframe.src = "../../html-tasks/homeTodo.html";
  iframe.style.width = "375px";
  iframe.style.height = "210px";
  element.appendChild(iframe);

  const domObject = new CSS3DObject(element);
  domObject.scale.set(.009, .009, .009);
  officeMesh.add(domObject);

  // --------------------------------------------------------------------------------
  // Lock controls when focused on todo list
  // --------------------------------------------------------------------------------

  domEvents2.addEventListener(officeMesh, "mouseover", () => {
    controls.activeLook = false;
  }, false);
  
  domEvents2.addEventListener(moveMesh, "mouseover", () => {
    controls.activeLook = true;
  }, false);

  // --------------------------------------------------------------------------------
  // Resize Update/ Re-render
  // --------------------------------------------------------------------------------

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer2.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
  }, false);

  // --------------------------------------------------------------------------------
  // Frame Rate (remove this later)
  // --------------------------------------------------------------------------------

  const stats = Stats();
  document.body.appendChild(stats.dom);

  // --------------------------------------------------------------------------------
  // Render all the above code every time the screen refreshes (hopefully 60fps)
  // --------------------------------------------------------------------------------

  const animate = function () {
    // requestAnimationFrame(animate);
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

  renderer.setAnimationLoop(animate);
  // animate();
  
  function render() {
    controls.update( clock.getDelta() );
    renderer.render(townScene, camera);
    renderer2.render(townScene, camera);
    homeMesh.rotation.copy( camera.rotation );
    homeMesh.position.copy( camera.position );
    homeMesh.updateMatrix();
    homeMesh.translateZ( - 2 );
  }

}
export { startHomeRoom as default };

