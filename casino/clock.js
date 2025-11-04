//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const NB_FACES = 10;
const OFFSET = 2.0*Math.PI / (2*NB_FACES);
const ROLLER_FACE = 2*Math.PI / NB_FACES;
const ROLLER_WIDTH = 64.0;
const ROLLER_PADDING = 5.0;

const ANIMATION_FRAMES = 100;
const ANIMATION_DURATION = 500; // ms

function setIntervalWithTiemout(fun, after, interval, timeout) {
    let interval_timer = setInterval(fun, interval);
    setTimeout(() => {
        clearInterval(interval_timer);
        after();
    }, timeout);
}

class Roll {
    constructor(nb_faces) {
        const geometry = new THREE.CylinderGeometry( 120, 120, 64, nb_faces, 1 );
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(`./texture.jpg`);
        const sides = textureLoader.load(`./sides.jpg`);
        const material = new THREE.MeshStandardMaterial( {map: texture} );
        var materials = [
            material,
            sides,
            sides
        ];

        this.cylinder = new THREE.Mesh( geometry, materials );
        this.cylinder.rotation.z = -Math.PI / 2.0;
        this.cylinder.rotation.x = -OFFSET;
    }

    setNumber(value) {
        this.cylinder.rotation.x = -this.getValueAngle(value);
    }

    setAngle(angle) {
        angle = angle % (Math.PI*2);
        this.cylinder.rotation.x = -angle;
    }

    getValueAngle(value) {
        return (value + 1.0) * ROLLER_FACE - OFFSET;
    }

    getAngle() {
        return this.cylinder.rotation.x;
    }

    animateRotation(to) {
        let from_angle = -this.getAngle();
        let angle = from_angle;
        let to_angle = this.getValueAngle(to);
        if (from_angle == to_angle) {
            return;
        }
        if (to_angle < from_angle) {
            to_angle = to_angle + Math.PI*2;
        }
        let delta_angle = (to_angle - from_angle) / ANIMATION_FRAMES;
        let delta_time = (ANIMATION_DURATION+1) / ANIMATION_FRAMES;

        // Set initial angle
        this.setAngle(from_angle);

        // Update the angle every frame
        setIntervalWithTiemout(
            () => {
                angle = angle + delta_angle
                this.setAngle(angle);
            },
            () => {this.setAngle(to_angle);},
            delta_time,
            ANIMATION_DURATION
        );
    }
}

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const roller1 = new Roll(10);
roller1.setNumber(0);
roller1.cylinder.translateY(-(2.5*ROLLER_WIDTH + 4.5*ROLLER_PADDING));

const roller2 = new Roll(10);
roller2.setNumber(0);
roller2.cylinder.translateY(-(1.5*ROLLER_WIDTH + 3.5*ROLLER_PADDING));

const roller3 = new Roll(10);
roller3.setNumber(0);
roller3.cylinder.translateY(-(0.5*ROLLER_WIDTH + 0.5*ROLLER_PADDING));

const roller4 = new Roll(10);
roller4.setNumber(0);
roller4.cylinder.translateY(0.5*ROLLER_WIDTH + 0.5*ROLLER_PADDING);

const roller5 = new Roll(10);
roller5.setNumber(0);
roller5.cylinder.translateY(1.5*ROLLER_WIDTH + 3.5*ROLLER_PADDING);

const roller6 = new Roll(10);
roller6.setNumber(0);
roller6.cylinder.translateY(2.5*ROLLER_WIDTH + 4.5*ROLLER_PADDING);

scene.add(roller1.cylinder);
scene.add(roller2.cylinder);
scene.add(roller3.cylinder);
scene.add(roller4.cylinder);
scene.add(roller5.cylinder);
scene.add(roller6.cylinder);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("clock").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

function updateTime() {
    const now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    let hours_tenth = Number(hours.at(0));
    let hours_digit = Number(hours.at(1));
    let minutes_tenth = Number(minutes.at(0));
    let minutes_digit = Number(minutes.at(1));
    let seconds_tenth = Number(seconds.at(0));
    let seconds_digit = Number(seconds.at(1));
    
    roller1.animateRotation(hours_tenth);
    roller2.animateRotation(hours_digit);

    roller3.animateRotation(minutes_tenth);
    roller4.animateRotation(minutes_digit);

    roller5.animateRotation(seconds_tenth);
    roller6.animateRotation(seconds_digit)

}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setInterval(() => {
    updateTime();
}, 1000)


animate();
