var height = 1;
var r = 1.20688; // radius

function positioningAndScalingElectron(electron, n, up) {
  electron.scale.set(0.05, 0.05, 0.05);
  electron.position.x = r*Math.cos((1+4*(n-1))*Math.PI/6);
  electron.position.y = r*Math.sin((1+4*(n-1))*Math.PI/6);
  if(up == true){
    electron.position.z = height;
  } else {
    electron.position.z = -height;
  }

  scene.add(electron);
}

// Adicionar eletrons na cena
positioningAndScalingElectron(electron_up_1, 1, true);
positioningAndScalingElectron(electron_up_2, 2, true);
positioningAndScalingElectron(electron_up_3, 3, true);

positioningAndScalingElectron(electron_down_1, 1, false);
positioningAndScalingElectron(electron_down_2, 2, false);
positioningAndScalingElectron(electron_down_3, 3, false);

function updatePosition(electron, n, time, dir) {
  electron.position.x = r*Math.cos((1+4*(n-1))*Math.PI/6 + dir*parseFloat(document.getElementById("angular_translation_speed").value)*0.04*(time - startTime));
  electron.position.y = r*Math.sin((1+4*(n-1))*Math.PI/6 + dir*parseFloat(document.getElementById("angular_translation_speed").value)*0.04*(time - startTime));
}

function updateRotation(electron) {
    electron.rotation.z += parseFloat(document.getElementById("angular_rotation_speed").value)*0.002;
}

function moveElectron(electron, n, time, dir, s){
  updatePosition(electron, n, time, dir);
  updateRotation(electron, s);
}

// Desenhar animação
var can_update = false;
var showing_axis = false;

function play(){
  if(can_update == true){
    can_update = false;
    document.getElementById('play_button').value = 'Play';
    document.getElementById('play_button').style = "background-color: green;";
  } else{
    can_update = true;
    document.getElementById('play_button').value = 'Pause';
    document.getElementById('play_button').style = "background-color: red;";
  }
}

function showAxis(){
  if(showing_axis == true){
    showing_axis = false;
    document.getElementById('axis_button').value = 'Show Axis';
    scene.remove(axesHelper);
  } else{
    showing_axis = true;
    document.getElementById('axis_button').value = 'Hide Axis';
    scene.add(axesHelper);
  }
}

function animate() {
    requestAnimationFrame(animate);
    var time = Date.now( ) * 0.0005;

    if(can_update == true){
      moveElectron(electron_up_1, 1, time, 1);
      moveElectron(electron_up_2, 2, time, 1);
      moveElectron(electron_up_3, 3, time, 1);

      moveElectron(electron_down_1, 1, time, -1);
      moveElectron(electron_down_2, 2, time, -1);
      moveElectron(electron_down_3, 3, time, -1);
    }

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
