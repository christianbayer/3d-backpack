// Get the canvas element
const canvas = document.getElementById('360view');

// Create a scene
const scene = new THREE.Scene();

// Change the background color of the scene to white
scene.background = new THREE.Color(0xffffff);

// Create the camera and set it position
const camera = new THREE.OrthographicCamera(canvas.clientWidth / -90, canvas.clientWidth / 90, canvas.clientHeight / 90, canvas.clientHeight / -90);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
camera.lookAt(0, 0, 0);
scene.add(camera);

// Create the renderer and set the canvas size
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.shadowMap.enabled = true;
renderer.toneMappingExposure = 1;
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Create the controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = -2;
controls.screenSpacePanning = true;

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x343434, 1);
scene.add(hemisphereLight);

// Ambiente light
const ambientLight = new THREE.AmbientLight(0x343434, 1);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
directionalLight.position.set(.5, 0, 0.866);
camera.add(directionalLight);

THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    $('.canvas-wrapper').addClass('loading');
};

THREE.DefaultLoadingManager.onLoad = function () {
    $('.canvas-wrapper').removeClass('loading');
};

// Create the loader
const loader = new THREE.GLTFLoader();

let backpackBlack, backpackGrey, backpackWhite;

// Load the scene
loader.load('models/Mochila-Preta.gltf', function (gltf) {

    // Get the scene
    backpackBlack = gltf.scene;

    // Add to the ThreeJS scene
    scene.add(backpackBlack);

    // Add shadow to elements
    scene.traverse(function (element) {
        if (element.isMesh) {
            element.castShadow = true;
            element.receiveShadow = true;
            element.material.transparent = true;
        }
    });

});

// Load the scene
loader.load('models/Mochila-Cinza.gltf', function (gltf) {

    // Get the scene
    backpackGrey = gltf.scene;

    // Hide
    backpackGrey.visible = false;

    // Add to the ThreeJS scene
    scene.add(backpackGrey);

    // Add shadow to elements
    scene.traverse(function (element) {
        if (element.isMesh) {
            element.castShadow = true;
            element.receiveShadow = true;
            element.material.transparent = true;
        }
    });

});

// Load the scene
loader.load('models/Mochila-Branca.gltf', function (gltf) {

    // Get the scene
    backpackWhite = gltf.scene;

    // Hide
    backpackWhite.visible = false;

    // Add to the ThreeJS scene
    scene.add(backpackWhite);

    // Add shadow to elements
    scene.traverse(function (element) {
        if (element.isMesh) {
            element.castShadow = true;
            element.receiveShadow = true;
            element.material.transparent = true;
        }
    });

});

// Animate function
function animate() {

    // Recursive call
    requestAnimationFrame(animate);

    // Spinning
    controls.update();

    // Update the scene
    renderer.render(scene, camera);

}

function changeBackpack(color) {

    switch (color) {
        case 'black':
            backpackBlack.visible = true;
            backpackGrey.visible = false;
            backpackWhite.visible = false;
            directionalLight.intensity = 8;
            break;
        case 'grey':
            backpackBlack.visible = false;
            backpackGrey.visible = true;
            backpackWhite.visible = false;
            directionalLight.intensity = 2.5;
            break;
        case 'white':
            backpackBlack.visible = false;
            backpackGrey.visible = false;
            backpackWhite.visible = true;
            directionalLight.intensity = 0;
            break;
    }

}

animate();

$('#auto-rotate').on('change', function () {
    controls.autoRotate = $(this).prop('checked');
});

$('#lighten-background').on('change', function () {

    if ($(this).prop('checked')) {
        scene.background = new THREE.Color(0xffffff);
        $('.view-controls').removeClass('dark');
    } else {
        scene.background = new THREE.Color(0x191919);
        $('.view-controls').addClass('dark');
    }

});