import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

export function create3DEmoji(emoji, width, height) {
    // canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        console.error('Failed to get 2D context for the canvas');
        return;
    }

    // set canvas dimensions and draw the emoji
    canvas.width = 512;
    canvas.height = 512;
    context.font = '400px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(emoji, canvas.width / 2, canvas.height / 2);

    // create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);

    // set up three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);

    // append the renderer's canvas to the DOM
    const emojiContainer = document.getElementById('3d-emoji');
    if (!emojiContainer) {
        console.error('Failed to find the element with id "3d-emoji"');
        return;
    }
    emojiContainer.appendChild(renderer.domElement);

    // create a plane geometry and apply the emoji texture
    const aspectRatio = width / height;
    const planeWidth = 4;
    const planeHeight = planeWidth / aspectRatio;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // position the camera
    const cameraDistance = 3;
    camera.position.z = cameraDistance;

    

    // variables for the back-and-forth animation
    let direction = 1;
    let rotationSpeed = 0.01;
    let maxRotation = Math.PI / 8;

    // animation loop
    function animate() {
        requestAnimationFrame(animate);

        // update rotation based on direction
        plane.rotation.y += rotationSpeed * direction;

        // reverse direction if max rotation is reached
        if (plane.rotation.y >= maxRotation || plane.rotation.y <= -maxRotation) {
            direction *= -1;
        }

        renderer.render(scene, camera);
    }

    animate();
}
