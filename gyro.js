function startGyro() {
  window.addEventListener("deviceorientation", (event) => {
    console.log("gyro iOS:",
      event.alpha,
      event.beta,
      event.gamma
    );
  });
}

//  iOS requiere permiso SI O SI
async function initGyroIOS() {
  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {

    try {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission === "granted") {
        startGyro();
      } else {
        console.log("Permiso denegado en iOS");
      }

    } catch (err) {
      console.error("Error pidiendo permiso iOS:", err);
    }

  } else {
    // Android o navegadores que no requieren permiso
    startGyro();
  }
}