import './style.css'
import * as THREE from 'three'

//Scene
const scene = new THREE.Scene()

//Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(.4, -.6, -1)

mesh.scale.set(2, .5, 1)
// Half a rotation = MATH.PI
//mesh.rotation.set(Math.PI/4, Math.PI/4, Math.PI/4)

// GIMBAL LOCK -> when you rotate multiple axes, the next rotation change the object relative axes
// For an FPS you need to change Y, then X, not both at the same tile
mesh.rotation.reorder('YXZ');
mesh.rotation.set(Math.PI/4, Math.PI/4, Math.PI/4)
// This is the case in EULER System; this is why we use quaternion. Quanternion is harder but works better 



scene.add(mesh)

//Camera
const sizes = { 
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3   
scene.add(camera)

// Lookat the center of something
camera.lookAt(mesh.position)

// For complex objects, you can create groups (for exemple a car with multiple meshes)

/**
 * Objects
 */

 const group = new THREE.Group()
 scene.add(group)

 const cube1 = new THREE.Mesh(
     new THREE.BoxGeometry(1,1,1),
     new THREE.MeshBasicMaterial({color: 0x00ff00})
 )
 cube1.position.x = -2
 group.add(cube1)


 const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
cube2.position.x = 2

group.add(cube2)

group.scale.y = 2
/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)