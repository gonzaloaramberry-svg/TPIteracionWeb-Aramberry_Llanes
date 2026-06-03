# TP2-Aramberry_Llanes.IteracionWeb
# TP2 - Juego 2048 con WebSocket

## Integrantes

- Gonza Aramberry
- Llanes Augusto

## Descripción

Este trabajo práctico consiste en la adaptación del juego 2048 desarrollado en HTML, CSS y JavaScript.

Se implementó la detección de eventos del juego para registrar acciones del jugador y enviar información a un servidor mediante WebSocket utilizando mensajes en formato JSON.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- WebSocket
- Git / GitHub

## Eventos detectados

Durante la partida se registran los siguientes eventos:

- Inicio de partida
- Movimiento
- Combinación de fichas
- Victoria
- Derrota
- Mejor puntaje

## Almacenamiento local

Las estadísticas del jugador se almacenan utilizando LocalStorage mediante el objeto `StatsManager`.

Se registran:

- Cantidad de partidas
- Cantidad de movimientos
- Cantidad de victorias
- Cantidad de derrotas
- Mejor puntaje obtenido
- Cantidad de combinaciones realizadas

## Comunicación mediante WebSocket

Se implementó una conexión WebSocket para enviar eventos al servidor.

Ejemplo de mensaje enviado:

```json
{
  "game": "2048",
  "event": "movimiento",
  "player": "Augusto",
  "value": 0
}
