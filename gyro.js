function startGyro() {
  window.addEventListener("deviceorientation", (event) => {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    if (alpha !== null && beta !== null && gamma !== null) {
      console.log(
        `Ejes -> Alpha: ${alpha.toFixed(2)}, Beta: ${beta.toFixed(2)}, Gamma: ${gamma.toFixed(2)}`
      );
    }
  });
}

//  iOS + Android compatible init
async function initGyro() {
  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {

    try {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission === "granted") {
        startGyro();
      } else {
        console.log("Permiso denegado");
      }

    } catch (e) {
      console.error("Error en permiso iOS:", e);
    }

  } else {
    startGyro();
  }
}