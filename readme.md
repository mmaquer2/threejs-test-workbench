# Three.js Test Bench

## Description
- A three.js test bench for experimenting with three.js features
    - fireflies particle system
    - different three.js light types    
    - a simple three.js scene with a cube and a sphere with a ortho camera
    

## Reels 

### Fireflies Particle System
![](https://github.com/mmaquer2/threejs-test-workbench/blob/master/reels/fireflies-reel.gif)

## Installation and Usage 

```bash
cd <project folder>
npm i . 
npm run dev
```


### Controlling Particle Groups

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

### Updating color and material attributes

```javascript

// setting a random color HSL value on each tick
for each particle i in particles:

    particles[i].material.color.setHSL(0.5 + 0.5 * Math.sin(2 * elapsedTime), 0.75, 0.5);


```



## Code Snippets
- The code snippets are in the `src` folder


## Resources and References

- [three.js](https://threejs.org/)
- [Book of Shaders](https://thebookofshaders.com/)
- [MIT brownian motion and random walks](https://web.mit.edu/8.334/www/grades/projects/projects17/OscarMickelin/brownian.html)