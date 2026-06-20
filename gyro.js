function startGyro() {
  window.addEventListener("deviceorientation", (e) => {
    console.log("gyro activo:", e.alpha, e.beta, e.gamma);
  });
}

// 🔐 PERMISO (OBLIGATORIO en muchos celulares modernos)
if (typeof DeviceOrientationEvent.requestPermission === "function") {
  const btn = document.createElement("button");
  btn.innerText = "Activar giroscopio";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    DeviceOrientationEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          startGyro();
        } else {
          console.log("Permiso denegado");
        }
      })
      .catch(console.error);
  });
} else {
  // celulares que no piden permiso
  startGyro();
}