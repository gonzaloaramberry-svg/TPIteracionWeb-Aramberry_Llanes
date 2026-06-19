// --- CONFIGURACIÓN Y ESTADOS DEL GIROSCOPIO ---
let controlListo = true; 
const LIMITE_ANGULO = 25;   // Grados de inclinación para mover las fichas
const LIMITE_RETORNO = 10;  // Grados para volver a centrar el celular

// Función principal que debes conectar a tu botón de "Activar Giroscopio" en el HTML
async function activarGiroscopio2048() {
  // Comprobar si el navegador requiere permisos explícitos (iOS modernos)
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const permissionState = await DeviceOrientationEvent.requestPermission();
      if (permissionState === 'granted') {
        conectarEvento();
      } else {
        alert('Permiso denegado para usar el giroscopio.');
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  } else {
    // Para Android y Emuladores de PC (No necesitan permiso nativo)
    conectarEvento();
  }
}

// Escucha el movimiento del dispositivo
function conectarEvento() {
  window.addEventListener('deviceorientation', manejarMovimiento2048);
  alert('¡Giroscopio activado con éxito! Inclina tu dispositivo para jugar.');
}

// --- LÓGICA DE DETECCIÓN DE MOVIMIENTO PARA 2048 ---
function manejarMovimiento2048(event) {
  const beta = event.beta;   // Eje X: Inclinación Arriba / Abajo
  const gamma = event.gamma; // Eje Y: Inclinación Izquierda / Derecha

  // 1. Validar el "retorno al centro" para evitar movimientos infinitos
  if (!controlListo) {
    if (Math.abs(gamma) < LIMITE_RETORNO && Math.abs(beta) < LIMITE_RETORNO) {
      controlListo = true; // El jugador enderezó el teléfono, desbloqueamos el próximo movimiento
    }
    return; 
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
  // Asumimos que sostienes el teléfono cómodo a unos 45° de inclinación estándar
  if (beta > (45 + LIMITE_ANGULO)) {
    controlListo = false;
    ejecutarMovimiento2048("abajo");
  } else if (beta < (45 - LIMITE_ANGULO)) {
    controlListo = false;
    ejecutarMovimiento2048("arriba");
  }
}

// --- CONEXIÓN CON TU JUEGO ---
function ejecutarMovimiento2048(direccion) {
  console.log("Comando enviado al juego: " + direccion);
  
  // AQUÍ LLAMAS A TU FUNCIÓN PROPIA DEL 2048
  // Ejemplo ficticio (reemplázalo por el tuyo):
  // miJuego.desplazar(direccion);
}