// Definição da cena, câmera (perspectiva) e renderizador
var startTime = Date.now( ) * 0.0005;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("mycanvas"),
alpha:true,
antialias:true
});

var axesHelper = new THREE.AxesHelper(4);

// Posicionar camera
camera.up.set(0,0,1);
camera.position.set(0,0,7);
camera.lookAt(0,0,0);

// Controle da câmera
var controls = new THREE.OrbitControls( camera, renderer.domElement );

// Configurações do renderizador
renderer.setClearColor("#ffffff"); // Cor do fundo
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
