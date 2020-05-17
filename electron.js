// Construcao dos eletrons
// Geometria e material dos eletrons
var e_geometry = new THREE.SphereGeometry(1, 32, 32);
var e_material = new THREE.MeshStandardMaterial({color: 0xd9d9d9, metalness: 0.3, roughness: 0.5});

// Definir labels dos eletrons
var e_labela1 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela2 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela3 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela4 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela5 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labela6 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));

var e_labelb1 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb2 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb3 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb4 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb5 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb6 = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));

/*var e_labela_pair = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));
var e_labelb_pair = new THREE.Mesh( new THREE.Geometry(), new THREE.MeshLambertMaterial( { color: 0000000 } ));*/

var loader = new THREE.FontLoader();
loader.load( 'https://threejs.org//examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

  var e_label_geometry = new THREE.TextGeometry( "e", {
    font : font,
    size : 1.5,
    height : 0.01,
    curveSegments : 12,
    bevelEnabled : false,
    bevelThickness : 1,
    bevelSize : 0.2,
    bevelSegments: 10
  } );
  e_labela1.geometry = e_label_geometry;
  e_labela2.geometry = e_label_geometry;
  e_labela3.geometry = e_label_geometry;
  e_labela4.geometry = e_label_geometry;
  e_labela5.geometry = e_label_geometry;
  e_labela6.geometry = e_label_geometry;

  //e_labela_pair.geometry = e_label_geometry;

  var sign_label_geometry = new THREE.TextGeometry( "-", {
    font : font,
    size : 1.5,
    height : 0.01,
    curveSegments : 12,
    bevelEnabled : false,
    bevelThickness : 1,
    bevelSize : 0.2,
    bevelSegments: 10
  } );
  e_labelb1.geometry = sign_label_geometry;
  e_labelb2.geometry = sign_label_geometry;
  e_labelb3.geometry = sign_label_geometry;
  e_labelb4.geometry = sign_label_geometry;
  e_labelb5.geometry = sign_label_geometry;
  e_labelb6.geometry = sign_label_geometry;

  //e_labelb_pair.geometry = sign_label_geometry;
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

/*e_labela_pair.position.set(2,0,1);
e_labelb_pair.position.set(3.1,0,1.6);
e_labela_pair.rotation.x = Math.PI/2;
e_labelb_pair.rotation.x = Math.PI/2;*/

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

// Construir spins down
var arrow_d1 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d1.setLength(2.2,1,0.5);
var arrow_d2 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d2.setLength(2.2,1,0.5);
var arrow_d3 = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d3.setLength(2.2,1,0.5);

/*var arrow_u_pair = new THREE.ArrowHelper(direction.normalize(), from, 1, 0xff0000);
arrow_u_pair.setLength(2.2,1,0.5);
var arrow_d_pair = new THREE.ArrowHelper(direction.normalize(), from, 1, 0x0000ff);
arrow_d_pair.setLength(2.2,1,0.5);*/

// Construir eletron base
var electron = new THREE.Mesh(e_geometry, e_material);

// Construir eletrons com spins definidos
var electron_up1 = new THREE.Mesh();
var electron_up2 = new THREE.Mesh();
var electron_up3 = new THREE.Mesh();

var electron_down1 = new THREE.Mesh();
var electron_down2 = new THREE.Mesh();
var electron_down3 = new THREE.Mesh();

/*var electron_up_pair = new THREE.Mesh();
var electron_down_pair = new THREE.Mesh();*/

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

/*electron_up_pair.add(electron.clone());
electron_up_pair.add(arrow_u_pair);
electron_down_pair.add(electron.clone());
electron_down_pair.add(arrow_d_pair);
electron_down_pair.rotation.x = Math.PI; // Rotacionar para spin down
// Definir posicoes relativas entre eletrons
electron_up_pair.position.set(1.3,0,0);
electron_down_pair.position.set(-1.3,0,0);*/

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
/*var electron_pair = new THREE.Group();
electron_pair.add(electron_up_pair);   // Adicionar eletron com spin up
electron_pair.add(electron_down_pair); // Adicionar eletron com spin down
electron_pair.add(e_labela_pair);      // Adicionar label 1
electron_pair.add(e_labelb_pair);      // Adicionar label 2*/
