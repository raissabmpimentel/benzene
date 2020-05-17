var startTime = Date.now( ) * 0.0005;
var height = 1;  // Distância default do elétron ao plano xy
var r = 1.20688; // Raio de translação

// Redimencionando o tamanho do elétron e setando sua posição inicial
function positioningAndScalingElectron(electron, id) {
  // Redimencionando o tamanho do elétron
  electron.scale.set(0.05, 0.05, 0.05);

  // Setando a posição inicial do elétron de acordo com sua identificação
  electron.position.x = r*Math.cos((1+4*((id%3)-1))*Math.PI/6);
  electron.position.y = r*Math.sin((1+4*((id%3)-1))*Math.PI/6);
  if(id <= 3){
    electron.position.z = height;
  } else {
    electron.position.z = -height;
  }

  // Adicionando elétron à cena
  scene.add(electron);
}

positioningAndScalingElectron(electron_up_1, 1);
positioningAndScalingElectron(electron_up_2, 2);
positioningAndScalingElectron(electron_up_3, 3);
positioningAndScalingElectron(electron_down_1, 4);
positioningAndScalingElectron(electron_down_2, 5);
positioningAndScalingElectron(electron_down_3, 6);


// Variáveis que armazenam o ângulo inicial de cada elétron
var initial_angle_1 = Math.PI/6;
var initial_angle_2 = 5*Math.PI/6;
var initial_angle_3 = 3*Math.PI/2;
var initial_angle_4 = Math.PI/6;
var initial_angle_5 = 5*Math.PI/6;
var initial_angle_6 = 3*Math.PI/2;

var wt = 0; // contribuição angular do movimento

// Variável que armazena a velocidade angular de rotação do elétron,
// a qual é controlada pelo usuário
var w_rot = parseFloat(document.getElementById("angular_rotation_speed").value);

// Variável que armazena a velocidade angular de translação do elétron,
// a qual é controlada pelo usuário
var w_tran = parseFloat(document.getElementById("angular_translation_speed").value);

// Atualizando a posição (x, y) do elétron de acordo com o movimento
// de translação que ocorre no tempo
function updatePosition(electron, n, time) {
  // Computando a contribuição angular no movimento de translação do elétron
  // ocasionada pelo intervalo pelo de tempo que passou desde que a animação
  // foi iniciada (desde o play)
  wt = w_tran*0.04*(time - startTime);  // dAng = w*dT

  // Se a animação for pausada, o ângulo inicial do movimento de cada
  // elétron é atualizado, portanto, é preciso computar o ângulo de
  // deslocamento de forma distinta para cada elétron
  var angle;
  if(n == 1){
    angle = initial_angle_1 + wt;
  } else if(n == 2){
    angle = initial_angle_2 + wt;
  } else if(n == 3){
    angle = initial_angle_3 + wt;
  } else if(n == 4){
    angle = initial_angle_4 - wt;
  } else if(n == 5){
    angle = initial_angle_5 - wt;
  } else{
    angle = initial_angle_6 - wt;
  }

  // Atualização da posição do elétron
  electron.position.x = r*Math.cos(angle);
  electron.position.y = r*Math.sin(angle);
}

// Atualizando a rotação do elétron em torno do seu eixo z, de acordo com a
// velocidade de rotação setada pelo usuário (w_rot); e utilizando a regra da
// mão direita (dir), isto é, elétrons com spin up giram em sentido
// anti-horário e elétrons com spin down giram em sentido horário
function updateRotation(electron, dir) {
    electron.rotation.z += dir*w_rot*0.002;
}

// Transladando e rotacionando o elétron
function updateElectron(electron, n, time){
  updatePosition(electron, n, time);

  if(n <= 3){
    updateRotation(electron, 1);
  } else{
    updateRotation(electron, -1);
  }
}

// Inicialização das variáveis de controle
var can_update = false; // responsável por pausar/rodar (false/true) a animação
var showing_axis = false; // responsável por esconder/mostrar (false/true) o eixo xyz na cena

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

      updateElectron(electron_up_1, 1, time);
      updateElectron(electron_up_2, 2, time);
      updateElectron(electron_up_3, 3, time);

      updateElectron(electron_down_1, 4, time);
      updateElectron(electron_down_2, 5, time);
      updateElectron(electron_down_3, 6, time);
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
