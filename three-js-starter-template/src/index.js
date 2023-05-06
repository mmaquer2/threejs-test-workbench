import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/** Base **/
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** Lights **/

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)

/** Objects **/

// example sphere mesh and material
const sphereMaterial = new THREE.MeshStandardMaterial()
material.roughness = 0.4
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    sphereMaterial
)


// example plane and material mesh
const planeMaterial = new THREE.MeshStandardMaterial()
planeMaterial.roughness = 0.4
planeMaterial.color = 'white'
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    planeMaterial
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

/** Add test plane and cube to the scene*/

scene.add(cube, plane)


/** Sizes **/
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

/**  Camera **/

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/** Renderer **/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**  Animate **/
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // ==== update objects ==== //

    // rotate cube
    cube.rotation.y = 0.1 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
   
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}


function init() {
    console.log("Program Start")



}

init();
tick();