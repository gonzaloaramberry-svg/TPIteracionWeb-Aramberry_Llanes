// ==============================
// CONFIGURACIÓN GENERAL
// ==============================
let lastMove = 0;
const cooldown = 400;

// ==============================
// ACTIVAR GIROSCOPIO (BOTÓN)
// ==============================
async function enableGyro() {

  // 🔒 Permiso requerido en iOS / Safari
  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {

    try {
      const response = await DeviceOrientationEvent.requestPermission();

      if (response !== "granted") {
        console.log("❌ Permiso de giroscopio denegado");
        return;
      }

    } catch (err) {
      console.log("Error solicitando permiso:", err);
      return;
    }
  }

  console.log("✔ Giroscopio activado");

  startGyro();
}

// ==============================
// INICIAR SENSOR
// ==============================
function startGyro() {

  window.addEventListener("deviceorientation", (event) => {

    if (!event.beta || !event.gamma) return;

    const now = Date.now();
    if (now - lastMove < cooldown) return;

    const beta = event.beta;   // adelante / atrás
    const gamma = event.gamma; // izquierda / derecha

    let moved = false;

    // 👉 DERECHA
    if (gamma > 20) {
      keyboardInputManager.emit("move", 1);
      moved = true;
    }

    // 👉 IZQUIERDA
    else if (gamma < -20) {
      keyboardInputManager.emit("move", 3);
      moved = true;
    }

    // 👉 ABAJO
    else if (beta > 25) {
      keyboardInputManager.emit("move", 2);
      moved = true;
    }

    // 👉 ARRIBA
    else if (beta < -25) {
      keyboardInputManager.emit("move", 0);
      moved = true;
    }

    if (moved) {
      lastMove = now;
      console.log("MOVE:", beta, gamma);
    }

  });
}

// ==============================
// CONECTAR BOTÓN HTML
// ==============================
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("enableGyro");

  if (btn) {
    btn.addEventListener("click", enableGyro);
  } else {
    console.log("Botón enableGyro no encontrado en el DOM");
  }

});

// ==============================
// FALLBACK TECLADO (PC)
// ==============================
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