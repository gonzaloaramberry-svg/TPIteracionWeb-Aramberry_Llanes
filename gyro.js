let controls = {
  tiltLeft: "moveLeft",
  tiltRight: "moveRight",
  tiltUp: "moveUp",
  tiltDown: "moveDown"
};

let lastMove = 0;

// ==========================
// ACTIVAR GIRO (PERMISO)
// ==========================
async function enableGyro() {

  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {

    try {
      const res = await DeviceOrientationEvent.requestPermission();

      if (res !== "granted") {
        console.log("Permiso denegado");
        return;
      }
    } catch (e) {
      console.log("Error permiso:", e);
      return;
    }
  }

  console.log("✔ Giroscopio activado");
  startGyro();
}

// ==========================
// INICIAR SENSOR
// ==========================
function startGyro() {

  window.addEventListener("deviceorientation", (event) => {

    if (!event.beta || !event.gamma) return;

    const now = Date.now();
    if (now - lastMove < 400) return;

    let beta = event.beta;
    let gamma = event.gamma;

    // derecha
    if (gamma > 20) {
      keyboardInputManager.emit("move", 1);
      lastMove = now;
    }

    // izquierda
    else if (gamma < -20) {
      keyboardInputManager.emit("move", 3);
      lastMove = now;
    }

    // abajo
    else if (beta > 20) {
      keyboardInputManager.emit("move", 2);
      lastMove = now;
    }

    // arriba
    else if (beta < -20) {
      keyboardInputManager.emit("move", 0);
      lastMove = now;
    }

  });
}

// ==========================
// BOTÓN
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("enableGyro")
    .addEventListener("click", enableGyro);
});

// ==========================
// FALLBACK TECLADO (PC)
// ==========================
window.addEventListener("keydown", (e) => {

  switch (e.key) {
    case "ArrowLeft":
      keyboardInputManager.emit("move", 3);
      break;

    case "ArrowRight":
      keyboardInputManager.emit("move", 1);
      break;

    case "ArrowUp":
      keyboardInputManager.emit("move", 0);
      break;

    case "ArrowDown":
      keyboardInputManager.emit("move", 2);
      break;
  }

});