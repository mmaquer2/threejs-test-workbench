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

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)


const planeMaterial = new THREE.MeshStandardMaterial()
planeMaterial.roughness = 0.4
planeMaterial.color = 'white'
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
scene.add(plane)



// *** Particles ***

const PARTICLECOUNT = 10;
const PARTICLE_SIZE = 0.05;

const particles = []
for(let i = 0; i < PARTICLECOUNT; i++){
  
    //const temp = new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
    const temp = new THREE.Vector3(1, 1, 1)
    
    const tempGeometry = new THREE.BufferGeometry();
    tempGeometry.setFromPoints([temp]);
    const tempMaterial = new THREE.PointsMaterial({ size: PARTICLE_SIZE, color:0xccccff }); 
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


let parameters = [
    [
        [1, 1, 0.5], 5
    ],
    [
        [0.95, 1, 0.5], 4
    ],
    [
        [0.90, 1, 0.5], 3
    ],
    [
        [0.85, 1, 0.5], 2
    ],
    [
        [0.80, 1, 0.5], 1
    ]
];

const parameterCount = parameters.length;
let color = [];

for(let i = 0; i < parameterCount; i++){
    color = parameters[i][0];
}

camera.position.set(
    -0.023216948297360082,
    1.544302242717219,
    4.5147816895252655)


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // ==== update objects ====

    //console.log(particles[1].uuid)

    // move a particle back and forth
    particles[1].position.x = Math.sin(elapsedTime) * 2;

    // setting a random blinking color
    //particles[1].material.color.setHSL(0.5 + 0.5 * Math.sin(2 * elapsedTime), 0.75, 0.5);
    let color = parameters[1][0];
    //console.log(color)
    let h = (360 * (color[0] + elapsedTime) % 360) / 360;
    particles[1].material.color.setHSL(h, color[1], color[2]);

    console.log(camera.position)
    //particles[1].material.opacity -= 0.001;
    //particles[1].material.size += 0.001;

    /*
    // removing a particle once opacity is 0
    if(particles[1].material.opacity <= 0.0){
        let tempID = particles[1].uuid;
        particles[1].geometry.dispose();
        particles[1].material.dispose();
        console.log("removed paritlces 1")
        scene.remove(scene.getObjectByProperty('uuid', tempID));
    }
    */

    particles[2].position.x += 0.001;
    particles[2].position.y += 0.001;

    for(let i = 0; i < PARTICLECOUNT; i++){
        


    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()