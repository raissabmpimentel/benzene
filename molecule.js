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
