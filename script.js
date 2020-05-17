// Definição da cena, câmera (perspectiva) e renderizador
var startTime = Date.now( ) * 0.0005;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("mycanvas"),
alpha:true,
antialias:true
});

//////////////////// PARA AJUDAR VISUALIZAÇÃO, TIRAR DEPOIS ////////////////////
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
///////////////////////////////////////////////////////////////////////////////

// Posicionar camera
camera.up.set(0,0,1);
camera.position.set(0,0,5);
camera.lookAt(0,0,0);

// Controle da câmera
var controls = new THREE.OrbitControls( camera, renderer.domElement );

// Configurações do renderizador
renderer.setClearColor("#ffffff"); // Cor do fundo
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Função copiada de https://stackoverflow.com/questions/15316127/three-js-line-vector-to-cylinder
// Função que cria um cilindro entre dois pontos
var cylinderMesh = function( pointX, pointY )
{
    var direction = new THREE.Vector3().subVectors(pointY, pointX);
    var orientation = new THREE.Matrix4();
    orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1));
    var edgeGeometry = new THREE.CylinderGeometry(0.12, 0.12, direction.length(), 20, 32);
    var edge = new THREE.Mesh(edgeGeometry,  new THREE.MeshLambertMaterial( { color: 0x333333 }))
    edge.applyMatrix(orientation);
    edge.position.x = (pointY.x + pointX.x) / 2;
    edge.position.y = (pointY.y + pointX.y) / 2;
    edge.position.z = (pointY.z + pointX.z) / 2;
    return edge;
}

// Iluminação
var light = new THREE.AmbientLight(0x525252);
scene.add(light);
var light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(0, 0, 50);
scene.add(light2);

// Posicionamento dos átomos de C e H (adquiridos externamente), sua geometria e material
var C_loc = {"x": [1.39359, -1.39359, 0.69680, -0.69680,  0.69680, -0.69680], "y": [0.00000, 0.00000, -1.20688, -1.20688, 1.20688, 1.20688]}
var C_atoms = new THREE.Group();
var C_geometry = new THREE.SphereGeometry(0.4, 32, 32);
var C_material = new THREE.MeshLambertMaterial({color: 0xff0000});

var H_loc = {"x": [2.47776, -2.47776, 1.23888, -1.23888,  1.23888, -1.23888], "y": [0.00000, 0.00000, -2.14580, -2.14580, 2.14580, 2.14580]}
var H_atoms = new THREE.Group();
var H_geometry = new THREE.SphereGeometry(0.3, 32, 32);
var H_material = new THREE.MeshLambertMaterial({color: 0x0000ff});

// Grupo de ligações entre carbonos, entre carbono e hidrogênio e todos as ligações
var bondsCC = new THREE.Group();
var bondsCH = new THREE.Group();

// Adiciona os átomos nos grupos e as ligações de carbono e hidrogênio
for (i=0; i<C_loc.x.length; i++)
{
    C_mesh = new THREE.Mesh(C_geometry,C_material);
    C_mesh.position.set(C_loc.x[i],C_loc.y[i],0);
    C_atoms.add(C_mesh);

    H_mesh = new THREE.Mesh(H_geometry,H_material);
    H_mesh.position.set(H_loc.x[i],H_loc.y[i],0);
    H_atoms.add(H_mesh);

    bondCH_mesh = cylinderMesh(new THREE.Vector3( C_loc.x[i], C_loc.y[i], 0 ), new THREE.Vector3( H_loc.x[i], H_loc.y[i], 0 ));
    bondsCH.add(bondCH_mesh);
}

// Adiciona as ligações entre carbnonos
for (i=0; i<2; i++)
{
    bondCC_1_mesh = cylinderMesh(new THREE.Vector3( C_loc.x[i], C_loc.y[i], 0 ), new THREE.Vector3( C_loc.x[i+2], C_loc.y[i+2], 0 ));
    bondCC_2_mesh = cylinderMesh(new THREE.Vector3( C_loc.x[i], C_loc.y[i], 0 ), new THREE.Vector3( C_loc.x[i+4], C_loc.y[i+4], 0 ));
    bondsCC.add(bondCC_1_mesh);
    bondsCC.add(bondCC_2_mesh);
}

bondCC_1_mesh = cylinderMesh(new THREE.Vector3( C_loc.x[2], C_loc.y[2], 0 ), new THREE.Vector3( C_loc.x[3], C_loc.y[3], 0 ));
bondCC_2_mesh = cylinderMesh(new THREE.Vector3( C_loc.x[4], C_loc.y[4], 0 ), new THREE.Vector3( C_loc.x[5], C_loc.y[5], 0 ));
bondsCC.add(bondCC_1_mesh);
bondsCC.add(bondCC_2_mesh);

// Grupo de átomos, de ligações e da molécula como um todo, que é adicionada na cena
var atoms = new THREE.Group();
atoms.add(C_atoms);
atoms.add(H_atoms);

var bonds = new THREE.Group();
bonds.add(bondsCH);
bonds.add(bondsCC);

var molecule = new THREE.Group();
molecule.add(bonds);
molecule.add(atoms);
scene.add(molecule);

// Construcao dos eletrons
// Geometria e material dos eletrons
var e_geometry = new THREE.SphereGeometry(1, 32, 32);
var e_material = new THREE.MeshStandardMaterial({color: 0xd9d9d9, metalness: 0.3, roughness: 0.5});

// Definir labels dos eletrons
function createElectronLabel(e_labela, e_labelb) {
  var e_labela = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
}

var e_labela1 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb1 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela2 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb2 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela3 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb3 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela4 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb4 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela5 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb5 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela6 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb6 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela_pair = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb_pair = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var loader = new THREE.FontLoader();
loader.load( 'https://threejs.org//examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

  var geometry = new THREE.TextGeometry( "e", {
    font : font,
    size : 1.5,
    height : 0.01,
    curveSegments : 12,
    bevelEnabled : false,
    bevelThickness : 1,
    bevelSize : 0.2,
    bevelSegments: 10
  } );
  e_labela1.geometry = geometry;
  e_labela2.geometry = geometry;
  e_labela3.geometry = geometry;
  e_labela4.geometry = geometry;
  e_labela5.geometry = geometry;
  e_labela6.geometry = geometry;
  e_labela_pair.geometry = geometry;

  var geometry = new THREE.TextGeometry( "-", {
    font : font,
    size : 1.5,
    height : 0.01,
    curveSegments : 12,
    bevelEnabled : false,
    bevelThickness : 1,
    bevelSize : 0.2,
    bevelSegments: 10
  } );
  e_labelb1.geometry = geometry;
  e_labelb2.geometry = geometry;
  e_labelb3.geometry = geometry;
  e_labelb4.geometry = geometry;
  e_labelb5.geometry = geometry;
  e_labelb6.geometry = geometry;
  e_labelb_pair.geometry = geometry;
} );

// Ajustar posicao dos labels
function positioningElectronLabel(e_labela, e_labelb) {
  e_labela.position.set(0.7,0,1);
  e_labela.rotation.x = Math.PI/2;

  e_labelb.position.set(1.8,0,1.6);
  e_labelb.rotation.x = Math.PI/2;
}

positioningElectronLabel(e_labela1, e_labelb1);
positioningElectronLabel(e_labela2, e_labelb2);
positioningElectronLabel(e_labela3, e_labelb3);
positioningElectronLabel(e_labela4, e_labelb4);
positioningElectronLabel(e_labela5, e_labelb5);
positioningElectronLabel(e_labela6, e_labelb6);

e_labela_pair.position.set(2,0,1);
e_labelb_pair.position.set(3.1,0,1.6);
e_labela_pair.rotation.x = Math.PI/2;
e_labelb_pair.rotation.x = Math.PI/2;

// Definir orientacao das setas de spin
var from = new THREE.Vector3(0, 0, 0);
var to = new THREE.Vector3(0, 0, 1);
var direction = to.clone().sub(from);

// Construir spins up
var arrow_u1 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0xff0000);
arrow_u1.setLength(2.2,1,0.5);

var arrow_u2 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0xff0000);
arrow_u2.setLength(2.2,1,0.5);

var arrow_u3 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0xff0000);
arrow_u3.setLength(2.2,1,0.5);

var arrow_u_pair = new THREE.ArrowHelper(direction.normalize(), from, 1, 0xff0000);
arrow_u_pair.setLength(2.2,1,0.5);

// Construir spins down
var arrow_d1 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d1.setLength(2.2,1,0.5);

var arrow_d2 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d2.setLength(2.2,1,0.5);

var arrow_d3 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d3.setLength(2.2,1,0.5);

var arrow_d_pair = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d_pair.setLength(2.2,1,0.5);

// Construir eletron base
var electron = new THREE.Mesh(e_geometry, e_material);

// Construir eletrons com spins definidos
var electron_up1 = new THREE.Mesh();
var electron_down1 = new THREE.Mesh();

var electron_up2 = new THREE.Mesh();
var electron_down2 = new THREE.Mesh();

var electron_up3 = new THREE.Mesh();
var electron_down3 = new THREE.Mesh();

var electron_up_pair = new THREE.Mesh();
var electron_down_pair = new THREE.Mesh();

// Adicionar eletron e spin ao Mesh
function creatingElectronWithSpin(electron_with_spin, electron, arrow, down) {
  electron_with_spin.add(electron.clone());
  electron_with_spin.add(arrow);
  if(down == true){
    electron_with_spin.rotation.x = Math.PI; // Rotacionar para spin down
  }
}

creatingElectronWithSpin(electron_up1, electron, arrow_u1, false);
creatingElectronWithSpin(electron_up2, electron, arrow_u2, false);
creatingElectronWithSpin(electron_up3, electron, arrow_u3, false);

creatingElectronWithSpin(electron_down1, electron, arrow_d1, true);
creatingElectronWithSpin(electron_down2, electron, arrow_d2, true);
creatingElectronWithSpin(electron_down3, electron, arrow_d3, true);

electron_up_pair.add(electron.clone());
electron_up_pair.add(arrow_u_pair);

electron_down_pair.add(electron.clone());
electron_down_pair.add(arrow_d_pair);
electron_down_pair.rotation.x = Math.PI; // Rotacionar para spin down

// Definir posicoes relativas entre eletrons
electron_up_pair.position.set(1.3,0,0);
electron_down_pair.position.set(-1.3,0,0);

//Grupo de eletrons a serem animados
electron_up_1 = new THREE.Group();
electron_up_2 = new THREE.Group();
electron_up_3 = new THREE.Group();
electron_down_1 = new THREE.Group();
electron_down_2 = new THREE.Group();
electron_down_3 = new THREE.Group();

// Construir grupos de eletrons
function creatingElectron(electron_set, electron_with_spin, e_labela, e_labelb) {
  electron_set.add(electron_with_spin);
  electron_set.add(e_labela);
  electron_set.add(e_labelb);
}

creatingElectron(electron_up_1, electron_up1, e_labela1, e_labelb1);
creatingElectron(electron_up_2, electron_up2, e_labela2, e_labelb2);
creatingElectron(electron_up_3, electron_up3, e_labela3, e_labelb3);
creatingElectron(electron_down_1, electron_down1, e_labela4, e_labelb4);
creatingElectron(electron_down_2, electron_down2, e_labela5, e_labelb5);
creatingElectron(electron_down_3, electron_down3, e_labela6, e_labelb6);


// Grupo de par de eletrons a ser animado
var electron_pair = new THREE.Group();

// Construir grupo do par de eletrons
electron_pair.add(electron_up_pair);   // Adicionar eletron com spin up
electron_pair.add(electron_down_pair); // Adicionar eletron com spin down
electron_pair.add(e_labela_pair);      // Adicionar label 1
electron_pair.add(e_labelb_pair);      // Adicionar label 2

var height = 1;

function positioningAndScalingElectron(electron, up) {
  electron.scale.set(0.05, 0.05, 0.05);
  if(up == true){
    electron.position.z = height;
  } else {
    electron.position.z = -height;
  }

  scene.add(electron);
}


// Adicionar eletrons na cena
positioningAndScalingElectron(electron_up_1, true);
positioningAndScalingElectron(electron_up_2, true);
positioningAndScalingElectron(electron_up_3, true);
positioningAndScalingElectron(electron_down_1, false);
positioningAndScalingElectron(electron_down_2, false);
positioningAndScalingElectron(electron_down_3, false);

var w = 1; // angular speed
var r = 1.20688; // radius

function updatePosition(electron, n, time, dir) {
  electron.position.x = r*Math.cos((1+4*(n-1))*Math.PI/6 + dir*w*(time - startTime));
  electron.position.y = r*Math.sin((1+4*(n-1))*Math.PI/6 + dir*w*(time - startTime));
}

function updateRotation(electron, s) {
    electron.rotation.z += s;
}

function moveElectron(electron, n, time, dir, s){
  updatePosition(electron, n, time, dir);
  updateRotation(electron, s);
}

// Desenhar animação
var s = 0.05; // Rotação fixa para o spin dos eletrons
function animate() {
    requestAnimationFrame(animate);
    var time = Date.now( ) * 0.0005;
    moveElectron(electron_up_1, 1, time, 1, s);
    moveElectron(electron_up_2, 2, time, 1, s);
    moveElectron(electron_up_3, 3, time, 1, s);
    moveElectron(electron_down_1, 1, time, -1, s);
    moveElectron(electron_down_2, 2, time, -1, s);
    moveElectron(electron_down_3, 3, time, -1, s);

controls.update();
renderer.render(scene, camera);

}

// Reajustar proporção com a mudança do tamanho da tela
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

animate();
