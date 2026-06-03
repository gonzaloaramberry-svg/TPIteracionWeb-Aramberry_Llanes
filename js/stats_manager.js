function StatsManager() {

  this.statsKey = "gameStats";

  this.stats = JSON.parse(localStorage.getItem(this.statsKey)) || {
    partidas: 0,
    movimientos: 0,
    victorias: 0,
    derrotas: 0,
    mejorPuntaje: 0,
    combinaciones: 0
  };
    this.socket = new WebSocket(
    "wss://echo.websocket.org"
  );

  this.socket.onopen = function() {
    console.log("WebSocket conectado");
  };

  this.socket.onerror = function(error) {
    console.error("Error WebSocket:", error);
  };

  this.socket.onclose = function() {
    console.log("WebSocket cerrado");
  };
  this.socket.onmessage = function(mensaje) {

  let datos = JSON.parse(mensaje.data);

  console.log(datos);

  if (!Array.isArray(datos)) 
  return;


  let lista = document.getElementById("ranking-list");

  lista.innerHTML = "";

  datos.forEach(function(jugador, index) {

    let item = document.createElement("li");

    item.textContent =
      (index + 1) +
      ". " +
      jugador.Player +
      " - " +
      jugador.Value;

    lista.appendChild(item);

  });

  };
}

// Guardar estadísticas
StatsManager.prototype.guardar = function () {
  localStorage.setItem(this.statsKey, JSON.stringify(this.stats));
};

// Registrar eventos
StatsManager.prototype.registrarEvento = function (evento, valor) {

  switch(evento) {

    case "partida":
      this.stats.partidas++;
      break;

    case "movimiento":
      this.stats.movimientos++;
      break;

    case "victoria":
      this.stats.victorias++;
      break;

    case "derrota":
      this.stats.derrotas++;
      break;

    case "combinacion":
      this.stats.combinaciones++;
      break;

    case "puntaje":
      if (valor > this.stats.mejorPuntaje) {
        this.stats.mejorPuntaje = valor;
      }
      break;

    this.enviarEventoWebSocket(evento, valor);
    
  }

  this.guardar();

  console.log("Evento registrado:", evento);
  console.log(this.stats);
};
StatsManager.prototype.enviarEventoWebSocket = function(evento, valor) {

  if (this.socket.readyState === WebSocket.OPEN) {

    const datos = {
      game: "2048",
      event: evento,
      player: "Augusto",
      value: valor || 0
    };

    this.socket.send(JSON.stringify(datos));
  }
};
