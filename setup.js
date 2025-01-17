// Definição da cena, câmera (perspectiva) e renderizador
var scene = new THREE.Scene();
var header = document.getElementById("controllers");
var camera = new THREE.PerspectiveCamera(25, window.innerWidth / (window.innerHeight - header.offsetHeight), 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("mycanvas"),
antialias:true
});

// Posicionar camera
camera.up.set(0,0,1);
camera.position.set(0,0,15);
camera.lookAt(0,0,0);

// Controle da câmera
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Iluminação
var light = new THREE.AmbientLight(0x525252);
scene.add(light);
var light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(0, 0, 50);
scene.add(light2);

// Visualização dos eixos
var axesHelper = new THREE.AxesHelper(4);

// Configurações do renderizador
renderer.setClearColor("#ffffff"); // Cor do fundo
renderer.setSize(window.innerWidth,(window.innerHeight - header.offsetHeight));
document.body.appendChild(renderer.domElement);

// Reajustar proporção com a mudança do tamanho da tela
function onWindowResize() {
    camera.aspect = window.innerWidth / (window.innerHeight - header.offsetHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, (window.innerHeight - header.offsetHeight));
}
window.addEventListener('resize', onWindowResize, false);
