# Three.js Test Bench

## Description
- A three.js test bench for experimenting with three.js features
    - fireflies particle system
    - different three.js light types    
    - a simple three.js scene with a cube and a sphere with a ortho camera
    

## Reels and Screenshots

## fireflies 
![]()

## Installation and Usage 

```bash

npm i . 
npm run dev
npm run build

```


## Controlling Particle Groups

```javascript

// the set up of particles can do within a single mesh or several meshes

// when using several meshes the material attributes of the particle group can be adjusted to control the appearance of the particles individually


// setting up a single mesh particle group
const points = []
points.push(new THREE.Vector3(-5, 0, 0))
points.push(new THREE.Vector3(5, 0, 0))
let particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setFromPoints(points);

const particlesMaterial = new THREE.PointsMaterial({ size: PARTICLE_SIZE}); 
particlesMaterial.color = new THREE.Color(0xFF0000);
particlesMaterial.transparent = true;
particlesMaterial.opacity = 1.0;


const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh)




// setting up a multi mesh particle group


const PARTICLECOUNT = 100;
const PARTICLE_SIZE = 0.05;
const particles = [] // container for all particle meshes in the group

for(let i = 0; i < PARTICLECOUNT; i++){
   
    const randVector = new THREE.Vector3();

    randVector.x = Math.random() * 10 - 5;
    randVector.y = Math.random() * 10 - 5;
    randVector.z = Math.random() * 10 - 5;


    const tempGeometry = new THREE.BufferGeometry();
    tempGeometry.setFromPoints([temp]);
    const tempMaterial = new THREE.PointsMaterial({ size: PARTICLE_SIZE, color:0xffdf000 }); 
    tempMaterial.transparent = true;
    tempMaterial.opacity = 1.0;
    const tempMesh = new THREE.Points(tempGeometry, tempMaterial);
    particles.push(tempMesh)
    scene.add(tempMesh)

}



// updating particles during render 

    points[0].x = Math.sin(elapsedTime) * 1.4
    points[1].y = Math.tan(elapsedTime) * 1.4
    particlesMesh.geometry.setFromPoints(points);
    particlesMesh.geometry.attributes.position.needsUpdate = true;
    console.log(particles[3].geometry.attributes.position.array[0]) // get the position of a article
    console.log(particles[3]); // get the material of a article
    particles[0].material.color.set(0xFF0000); // set the color of a particle during render
    particles[0].material.opacity = 0.5; // set the opacity of a particle during render



```


## Code Snippets
- The code snippets are in the `src` folder