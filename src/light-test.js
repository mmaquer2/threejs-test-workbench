import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// create the base application object containing the scene, renderer, and camera
let app = {
  el: document.getElementById("app"),
  scene: null,
  renderer: null,
  camera: null,
  controls:null,
  light:null,
}


// initialize the application and THREE.js scene renderer
const init = () => {
    app.renderer = new THREE.WebGLRenderer();
    app.renderer.setSize ( window.innerWidth, window.innerHeight);
    app.renderer.setClearColor(0x00000, 1) //0x424242
    app.renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
    document.body.appendChild(app.renderer.domElement);
  
    app.scene = new THREE.Scene();  
    //app.scene.background = new THREE.Color( 0x000000 );
  
    app.camera =  new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //app.camera.position.z = 3;
    //app.camera.position.y = 1;
    app.camera.up.set(0, 0, 1)
    app.camera.position.set(0, -2.8, 0.14);
    
    // controls 
    app.controls = new OrbitControls( app.camera, app.renderer.domElement );

  
  
  };

  function createPlane(){
    const planeGeometry = new THREE.PlaneGeometry( 10, 10, 32 );
    const planeMaterial = new THREE.MeshBasicMaterial( {color: "grey", side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.receiveShadow = true;
    plane.castShadow = false;
    app.scene.add( plane );
  
  }
  



let clock = new THREE.Clock();
let delta = 0;
// set frame rate to 30 fps
let interval = 1 / 60;

window.addEventListener('resize', () =>{
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    app.renderer.setSize( window.innerWidth, window.innerHeight );
});


function createDATGUI(){

    var gui = new GUI();
  
    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(app.camera.position, 'x', -5, 10).listen();
    cameraFolder.add(app.camera.position, 'y', -5, 10).listen();
    cameraFolder.add(app.camera.position, 'z', -5, 10).listen();
    cameraFolder.open()
  }


  const update = () => {
  
    requestAnimationFrame(update);
    
    delta += clock.getDelta();
   
    if(delta > interval) {
    
      app.controls.update();
      app.renderer.render(app.scene, app.camera);
      
    }
  };


  // main program entry point
function main(){
    init(); 

    
    createPlane();

    update();
    createDATGUI();
  }
  
  
  main();