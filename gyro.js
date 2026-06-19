let ultimoMovimiento = 0;

window.addEventListener("deviceorientation", function(event) {

  if (!event.beta || !event.gamma) return;

  console.log("Beta:", event.beta);
  console.log("Gamma:", event.gamma);

  if (Date.now() - ultimoMovimiento < 500) return;

  let beta = event.beta;
  let gamma = event.gamma;

  if (gamma > 20) {
    keyboardInputManager.emit("move", 1); // derecha
    ultimoMovimiento = Date.now();
  }

  else if (gamma < -20) {
    keyboardInputManager.emit("move", 3); // izquierda
    ultimoMovimiento = Date.now();
  }

  else if (beta > 20) {
    keyboardInputManager.emit("move", 2); // abajo
    ultimoMovimiento = Date.now();
  }

  else if (beta < -20) {
    keyboardInputManager.emit("move", 0); // arriba
    ultimoMovimiento = Date.now();
  }

});