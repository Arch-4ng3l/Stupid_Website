import './style.css'

import * as THREE from 'three'; 


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene(); 

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / innerHeight, 0.1, 1000); 

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
}); 

renderer.setPixelRatio( window.devicePixelRatio ); 
renderer.setSize( window.innerWidth, window.innerHeight); 
camera.position.setZ(30); 

renderer.render( scene, camera ); 


const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('normalearth.jpg');


const earth = new THREE.Mesh(
  new THREE.SphereGeometry(9, 64, 64), 
  new THREE.MeshStandardMaterial( {
      map: earthTexture,
      normalMap: earthNormalTexture,
  })
);


scene.add(earth);

earth.position.x = 30;



const ambientLight = new THREE.AmbientLight(0xffffff); 

scene.add(ambientLight);


const controls = new OrbitControls(camera, renderer.domElement); 

function addStar() {

  const geometry = new THREE.SphereGeometry(0.25, 24, 24); 
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff})

  const star = new THREE.Mesh( geometry, material); 

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 300 ));

  star.position.set(x, y, z);
  
  scene.add(star);

}

Array(200).fill().forEach(addStar);



const spaceTexture = new THREE.TextureLoader().load('bg.jpg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); 

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32), 
  new THREE.MeshStandardMaterial( {
      map: moonTexture,
      normalMap: normalTexture,
  })
);

scene.add(moon);


moon.position.z = 35; 
moon.position.x = -15;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top; 


  camera.position.z = t * 0.05; 
  camera.position.y = t * 0.001; 
  camera.position.x = t * 0.001; 

}





document.body.onscroll = moveCamera; 
moveCamera();


function animate() {
  requestAnimationFrame( animate ); 

  moon.rotation.y += 0.02; 

  earth.rotation.y += 0.005;
  
  controls.update();
  renderer.render(scene, camera); 
}


animate()