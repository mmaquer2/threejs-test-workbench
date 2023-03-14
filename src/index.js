import * as THREE from 'three';

// create the base application object containing the scene, renderer, and camera
let app = {
  el: document.getElementById("app"),
  scene: null,
  renderer: null,
  camera: null
}

// initialize the application and THREE.js scene renderer
const init = () => {
  app.renderer = new THREE.WebGLRenderer({alpha: true});
  app.renderer.setSize ( window.innerWidth, window.innerHeight);
  app.renderer.setClearColor(0x424242, 1)
  app.el.appendChild (app.renderer.domElement);
  app.scene = new THREE.Scene();  
  app.scene.background = new THREE.Color( 0x424242 );
  app.camera =  new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
  app.camera.position.z = 3;
  app.camera.position.y = 1;

};


const createBox = () => {
  
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x212529 } );
  const cube = new THREE.Mesh( geometry, material );
  app.scene.add( cube );
}

const updateCube = () => {
  //cube.rotation.y += 0.005;
  //cube.position.x += 0.005;
  
}

const particles = []
const particleGoalMap = new Map();
const PARTICLE_COUNT = 1;
const PARTICLE_SPEED = 0.01;


function getRandomNumberFromRange(min, max) {
  return Math.random() * (max - min) + min;
}


const createParticle = () => { 
  
  for(let i = 0 ; i < PARTICLE_COUNT; i++) {  
    const positions = new Float32Array( [
      -1.0, 1.0,  1.0,
        // x , y , z
    ] );


    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial( { color: 0x00AC9F, size: 0.05 } );
    particleGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    
    
    const particle = new THREE.Points( particleGeometry, particleMaterial );

    //console.log(particle.geometry.attributes.position.array[0])
    particleGeometry.attributes.position.array[0] = Math.random() * 2 - 1;
    particleGeometry.attributes.position.array[1] = Math.random() * 2 - 1;
    
    app.scene.add( particle );  
    particles.push( particle );

    // select movement goal
    const goal = chooseStartGoal(particleGeometry.attributes.position.array);
    particleGoalMap.set(particle, goal); // add particle and goal to particle goals map
    

  }
  
};

function isParticleGoalReached(pos, goal){
  // check if the particle has reached its goal position
  // return true if the particle has reached its goal position
  // return false if the particle has not reached its goal position
  console.log("Distance to goal: " + pos.distanceTo(goal));
  return pos.distanceTo(goal) < 0.5;


}

function moveParticleToGoal(particle){
  // get the current position of the particle
  const currentPos = particle.position;
  const goal = particleGoalMap.get(particle); // get the goal position of the particle
 
 

  console.log("Distance to goal: " + currentPos.distanceTo(goal));

  
  if(!isParticleGoalReached(currentPos,goal)){

    // update the particle's position by adding the vector to the current position
    //let step = PARTICLE_SPEED * delta;
    
    //const movementVector = new THREE.Vector3(goal.x, goal.y, goal.z) * step;
   
    //particle.position.add(movementVector);


  } else {

    // select a new goal position for the particle
    console.log("setting new goal")
    //const newGoal = chooseGoal(currentPos);
    //particleGoalMap.set(particle, newGoal);

  }
  


}

const GOAL_DISTANCE_LENGTH = 2.5;

function chooseStartGoal(currentPos) {
  const vectorPostion = new THREE.Vector3(currentPos[0], currentPos[1], currentPos[2])
  
  //TODO: vector math for random goal

  const goal = vectorPostion;
  
  console.log(goal)


  //const goal = new THREE.Vector3(1,1,1)

  return goal; //  return the goal position


}


function chooseGoal(currentPos) {

  //const goal = new THREE.Vector3(1,1,1)

  return goal; //  return the goal position


}

// Jitter particles all over the screen
function moveParticleInRamdomDirection(particle) {
  particle.position.x += getRandomNumberFromRange(-0.01, 0.01);
  particle.position.y += getRandomNumberFromRange(-0.01, 0.01);

}




// iterate through every particle and update its location randomly
function updateParticles() { 
	for(let i = 0; i < particles.length; i++) {
   
     moveParticleToGoal(particles[i]);
    // moveParticleInRamdomDirection(particles[i])
	}
}

function createCricle(){

  const circleGeometry = new THREE.CircleGeometry( 5, 32 );
  const circleMaterial = new THREE.PointsMaterial( { color: 0xffff00, size: 0.0001 } );
  const circle = new THREE.Mesh( circleGeometry, circleMaterial );
  app.scene.add( circle );

}

let clock = new THREE.Clock();
let delta = 0;
// set frame rate to 30 fps
let interval = 1 / 60;

const update = () => {
  
  requestAnimationFrame(update);
  
  delta += clock.getDelta();
 
  if(delta > interval) {
    
    app.renderer.setClearColor( 0x000000, 1 );

    //updateParticles();
    
    app.renderer.render(app.scene, app.camera);
    
  }
};



function main(){
  init();
  //createBox();
  createParticle();
  //createCricle();
  update();

}

main();