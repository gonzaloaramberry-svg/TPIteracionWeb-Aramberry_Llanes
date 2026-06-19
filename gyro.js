if (window.DeviceOrientationEvent) {

  window.addEventListener("deviceorientation", function(event) {

    let x = event.beta;   // adelante-atrás
    let y = event.gamma;  // izquierda-derecha

    console.log("Beta:", x);
    console.log("Gamma:", y);

  });

}

let ultimoMovimiento = 0;

window.addEventListener("deviceorientation", function(event) {

  if (Date.now() - ultimoMovimiento < 500)
    return;

  let beta = event.beta;
  let gamma = event.gamma;

  if (gamma > 20) {
    keyboardInputManager.emit("move", 1); // derecha
    ultimoMovimiento = Date.now();
  }

  if (gamma < -20) {
    keyboardInputManager.emit("move", 3); // izquierda
    ultimoMovimiento = Date.now();
  }

  if (beta > 20) {
    keyboardInputManager.emit("move", 2); // abajo
    ultimoMovimiento = Date.now();
  }

  if (beta < -20) {
    keyboardInputManager.emit("move", 0); // arriba
    ultimoMovimiento = Date.now();
  }

});
