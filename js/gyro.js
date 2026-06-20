(function () {
  var TILT_THRESHOLD = 40;
  var COOLDOWN_MS = 250;
  var CALIBRATION_SAMPLES = 50;

  var active = false;
  var neutralBeta = null;
  var neutralGamma = null;
  var calibrationCount = 0;
  var calibrationBetaSum = 0;
  var calibrationGammaSum = 0;
  var lastMoveTime = 0;
  var orientationHandler = null;

  function emitMove(direction) {
    if (!window.gameManager) {
      return;
    }

    var now = Date.now();
    if (now - lastMoveTime < COOLDOWN_MS) {
      return;
    }

    lastMoveTime = now;
    window.gameManager.inputManager.emit("move", direction);
  }

  function handleOrientation(event) {
    var beta = event.beta;
    var gamma = event.gamma;

    if (beta === null || gamma === null) {
      return;
    }

    if (neutralBeta === null) {
      calibrationBetaSum += beta;
      calibrationGammaSum += gamma;
      calibrationCount++;

      if (calibrationCount < CALIBRATION_SAMPLES) {
        return;
      }

      neutralBeta = calibrationBetaSum / CALIBRATION_SAMPLES;
      neutralGamma = calibrationGammaSum / CALIBRATION_SAMPLES;
      updateButton("Giroscopio activo — incliná para jugar");
      return;
    }

    var deltaBeta = beta - neutralBeta;
    var deltaGamma = gamma - neutralGamma;

    if (Math.abs(deltaBeta) < TILT_THRESHOLD && Math.abs(deltaGamma) < TILT_THRESHOLD) {
      return;
    }

    if (Math.abs(deltaBeta) > Math.abs(deltaGamma)) {
      emitMove(deltaBeta > 0 ? 0 : 2);
    } else {
      emitMove(deltaGamma > 0 ? 1 : 3);
    }
  }

  function updateButton(text) {
    var button = document.getElementById("gyro-button");
    if (button) {
      button.textContent = text;
    }
  }

  function startGyro() {
    if (active) {
      return;
    }

    active = true;
    neutralBeta = null;
    neutralGamma = null;
    calibrationCount = 0;
    calibrationBetaSum = 0;
    calibrationGammaSum = 0;
    lastMoveTime = 0;

    orientationHandler = handleOrientation;
    window.addEventListener("deviceorientation", orientationHandler);
    updateButton("Calibrando… mantené el celular quieto");
  }

  function stopGyro() {
    if (!active) {
      return;
    }

    active = false;
    if (orientationHandler) {
      window.removeEventListener("deviceorientation", orientationHandler);
      orientationHandler = null;
    }

    neutralBeta = null;
    updateButton("Activar giroscopio");
  }

  window.initGyro = async function initGyro() {
    if (active) {
      stopGyro();
      return;
    }

    if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {
      try {
        var permission = await DeviceOrientationEvent.requestPermission();

        if (permission === "granted") {
          startGyro();
        } else {
          updateButton("Permiso denegado");
        }
      } catch (e) {
        console.error("Error al pedir permiso del giroscopio:", e);
        updateButton("Error al activar giroscopio");
      }
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      startGyro();
    } else {
      updateButton("Giroscopio no disponible");
    }
  };
})();
