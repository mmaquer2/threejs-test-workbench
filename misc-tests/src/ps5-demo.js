import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('app')

// Scene
const scene = new THREE.Scene()

const particlesGeometry = new THREE.BufferGeometry();
const PARTICLE_COUNT = 500;
const PARTICLE_SIZE = 0.05;
const particles = new Float32Array(PARTICLE_COUNT * 3);
for(let i = 0; i < PARTICLE_COUNT * 3; i++){ 
    particles[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: PARTICLE_SIZE}); // color: 0x00AC9F

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh)

function createParticles(){
    // create particles

}


function createCornerSpotlight(){
    
        // create spotlight
    
        // add spotlight to scene
    
        // create helper
    
        // add helper to scene
    
        // add gui controls for spotlight

}


function createLogo(){

    // place logo in the center of the screen

    // place text display above the logo


}

function createTestSphere(){
  
}

const geometry = new THREE.SphereGeometry( 1 );
const material = new THREE.MeshBasicMaterial({size: 0.0005})
material.color = new THREE.Color(0x00AC9F)
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)



// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



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
camera.position.x = 0
camera.position.y = 0
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
//renderer.setSize(sizes.width, sizes.height)
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.setClearColor()

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    
    //sphere.rotation.y = .5 * elapsedTime // Mesh Animation: Rotate the sphere

    //particlesMesh.rotation.y = .4 * elapsedTime; // Particles Animation: Rotate the particles

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()