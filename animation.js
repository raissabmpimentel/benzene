var startTime = Date.now( ) * 0.0005;
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

var initial_angle_1 = Math.PI/6;
var initial_angle_2 = 5*Math.PI/6;
var initial_angle_3 = 3*Math.PI/2;

var initial_angle_4 = Math.PI/6;
var initial_angle_5 = 5*Math.PI/6;
var initial_angle_6 = 3*Math.PI/2;
var wt = 0;

function updatePosition(electron, n, time) {
  wt = w_tran*0.04*(time - startTime);
  if(n == 1){
    electron.position.x = r*Math.cos(initial_angle_1 + wt);
    electron.position.y = r*Math.sin(initial_angle_1 + wt);
  } else if(n == 2){
    electron.position.x = r*Math.cos(initial_angle_2 + wt);
    electron.position.y = r*Math.sin(initial_angle_2 + wt);
  } else if(n==3){
    electron.position.x = r*Math.cos(initial_angle_3 + wt);
    electron.position.y = r*Math.sin(initial_angle_3 + wt);
  } else if(n==4){
    electron.position.x = r*Math.cos(initial_angle_4 - wt);
    electron.position.y = r*Math.sin(initial_angle_4 - wt);
  } else if(n==5){
    electron.position.x = r*Math.cos(initial_angle_5 - wt);
    electron.position.y = r*Math.sin(initial_angle_5 - wt);
  } else{
    electron.position.x = r*Math.cos(initial_angle_6 - wt);
    electron.position.y = r*Math.sin(initial_angle_6 - wt);
  }
}

function updateRotation(electron, dir) {
    electron.rotation.z += dir*w_rot*0.002;
}

function moveElectron(electron, n, time){
  updatePosition(electron, n, time);
  if(n<= 3){
    updateRotation(electron, 1);
  } else{
    updateRotation(electron, -1);
  }
}

// Desenhar animação
var can_update = false;
var showing_axis = false;
var w_rot = parseFloat(document.getElementById("angular_rotation_speed").value);
var w_tran = parseFloat(document.getElementById("angular_translation_speed").value);

function updateInitialAngle(){
  initial_angle_1 += wt;
  initial_angle_2 += wt;
  initial_angle_3 += wt;
  initial_angle_4 -= wt;
  initial_angle_5 -= wt;
  initial_angle_6 -= wt;
}

function play(){
  if(can_update == true){
    document.getElementById('play_button').value = 'Play';
    document.getElementById('play_button').style = "background-color: green;";
    updateInitialAngle();
    can_update = false;
  } else{
    startTime = Date.now( ) * 0.0005;
    document.getElementById('play_button').value = 'Pause';
    document.getElementById('play_button').style = "background-color: red;";
    can_update = true;
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
      w_rot = parseFloat(document.getElementById("angular_rotation_speed").value);
      w_tran = parseFloat(document.getElementById("angular_translation_speed").value);

      moveElectron(electron_up_1, 1, time);
      moveElectron(electron_up_2, 2, time);
      moveElectron(electron_up_3, 3, time);

      moveElectron(electron_down_1, 4, time);
      moveElectron(electron_down_2, 5, time);
      moveElectron(electron_down_3, 6, time);
    }

    controls.update();
    renderer.render(scene, camera);
}



animate();
