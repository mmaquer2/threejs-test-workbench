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


//const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
//scene.add(directionalLight)

//** volumetric light */




// *** Fireflies Particles ***

let PARTICLECOUNT = 1000;
const PARTICLE_SIZE = 0.05;
// Geometry
// note the pure Geometry class is deprecated, so we use BufferGeometry
const particles = []
for(let i = 0; i < PARTICLECOUNT; i++){
  
    const temp = new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
    const tempGeometry = new THREE.BufferGeometry();
    tempGeometry.setFromPoints([temp]);
    const tempMaterial = new THREE.PointsMaterial({ size: PARTICLE_SIZE, color:0xffdf000 }); 
    tempMaterial.transparent = true;
    tempMaterial.opacity = 1.0;
    const tempMesh = new THREE.Points(tempGeometry, tempMaterial);
    particles.push(tempMesh)
    scene.add(tempMesh)

}


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

//var circleGeometry = new THREE.CircleBufferGeometry( 5, 32 );
//var circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//var circle = new THREE.Mesh( circleGeometry, circleMaterial );
//circle.scale.set(0.1, 0.1, 0.1)
//scene.add( circle );


const planeMaterial = new THREE.MeshStandardMaterial()
planeMaterial.roughness = 0.4
planeMaterial.color = 'white'
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

//scene.add(cube)
scene.add(plane)


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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update fireflies opacity value
    for(let i = 0; i < PARTICLECOUNT; i++){
        // update opacity based on a random time interval so that they don't all flash at the same time
        if(i % 2 == 0){
        
            if(elapsedTime % Math.random() * 0.5 < 0.01){
                particles[i].material.opacity = Math.sin(elapsedTime * 1.5)
            }

        } else {
            
            particles[i].material.opacity = Math.sin(elapsedTime)
            
        }

        //particles[i].material.opacity = Math.sin(elapsedTime * Math.random() * 0.5) * 0.5 + 0.5
    }
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()