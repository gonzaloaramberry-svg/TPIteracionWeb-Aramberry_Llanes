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
    
  }

  this.guardar();

  console.log("Evento registrado:", evento);
  console.log(this.stats);
};