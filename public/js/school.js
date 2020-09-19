/* eslint-disable prettier/prettier */
function startSchoolRoom() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 2;
  camera.position.y = 2;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const domEvents	= new THREEx.DomEvents(camera, renderer.domElement);

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

}