// Control de estado para evitar que las fichas se muevan sin parar
let controlListo = true; 

function manejarMovimiento2048(event) {
  const beta = event.beta;   // Inclinación Adelante/Atrás (Arriba/Abajo)
  const gamma = event.gamma; // Inclinación Izquierda/Derecha

  // Ángulo mínimo de inclinación para activar el movimiento (sensibilidad)
  const LIMITE_ANGULO = 25; 
  // Ángulo de retorno para volver a habilitar el control
  const LIMITE_RETORNO = 10; 

  // 1. Verificamos si el teléfono regresó al "centro" para desbloquear el próximo movimiento
  if (!controlListo) {
    if (Math.abs(gamma) < LIMITE_RETORNO && Math.abs(beta) < LIMITE_RETORNO) {
      controlListo = true; // El usuario enderezó el teléfono, listo para el siguiente movimiento
    }
    return; // Si no ha centrado el teléfono, ignoramos el resto del código
  }

  // 2. Detectar Inclinación Horizontal (Izquierda / Derecha)
  if (Math.abs(gamma) > LIMITE_ANGULO) {
    controlListo = false; // Bloqueamos hasta que regrese al centro
    
    if (gamma > 0) {
      ejecutarMovimiento2048("derecha");
    } else {
      ejecutarMovimiento2048("izquierda");
    }
    return;
  }

  // 3. Detectar Inclinación Vertical (Arriba / Abajo)
  // Nota: Asumimos que el jugador sostiene el teléfono a unos 45° cómodamente. 
  // Si lo inclina más hacia adelante o hacia atrás, se toman estos rangos:
  if (beta > (45 + LIMITE_ANGULO)) {
    controlListo = false;
    ejecutarMovimiento2048("abajo");
  } else if (beta < (45 - LIMITE_ANGULO)) {
    controlListo = false;
    ejecutarMovimiento2048("arriba");
  }
}

// Conexión con tu juego actual
function ejecutarMovimiento2048(direccion) {
  console.log("Moviendo tablero hacia: " + direccion);
  
  // AQUÍ LLAMAS A LAS FUNCIONES QUE YA TIENE TU JUEGO. Por ejemplo:
  // if (direccion === "izquierda") miJuego.moverIzquierda();
  // O también puedes simular el evento de teclado si tu juego escucha el "keydown":
  // lanzarEventoTeclado(direccion);
}