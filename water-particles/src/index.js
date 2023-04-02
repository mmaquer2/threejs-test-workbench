import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)


// *** Particles ***

const PARTICLECOUNT = 1000;
const PARTICLE_SIZE = 0.05;


const particles = []
const velocityMap = new Map();

for(let i = 0; i < PARTICLECOUNT; i++){
    

   
    const temp = new THREE.Vector3(0,0,0);

    let dX, dY, dZ;
    dY = (Math.random() * 5) + 1.5;
    dX = (Math.random() * 4) - 2;
    dZ = (Math.random() * 4) - 2;
    let velocity = new THREE.Vector3(dX, dY, dZ);
    velocityMap.set(i,velocity); // use the map to set the velocity of each particle

    const tempGeometry = new THREE.BufferGeometry();
    tempGeometry.setFromPoints([temp]);
    const color = i % 2 == 0 ? 0xccccff : 0x0000ff;

    const tempMaterial = new THREE.PointsMaterial({ size: PARTICLE_SIZE, color:color }); 
    tempMaterial.transparent = true;
    tempMaterial.opacity = 1.0;

    const tempMesh = new THREE.Points(tempGeometry, tempMaterial);
    particles.push(tempMesh)
    scene.add(tempMesh)

}



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

camera.position.set(21.1,14.1,19.09)


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // ==== update objects ====
    console.log(camera.position)
    for(let i = 0; i < particles.length; i++){
        // update element postion with its velocity
        let velocity = velocityMap.get(i);

        particles[i].position.x += velocity.x;
        particles[i].position.y += velocity.y;
        particles[i].position.z += velocity.z;

        velocity.y -= 0.05;

        // once the particle hits the ground, reset it the emitter start position and create new velocity
        if(particles[i].position.y <= 0){

           // reset the particle to the emitter start position
           particles[i].position.y = 0
           particles[i].position.x = 0
           particles[i].position.z = 0;

           // create new velocity
           velocity.x = (Math.random() * 1) 
           velocity.y = (Math.random() * 1) 
           velocity.z = (Math.random() * 1) 
        
        }

        velocityMap.set(i,velocity) // update the map with the new velocity

    }
    
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()