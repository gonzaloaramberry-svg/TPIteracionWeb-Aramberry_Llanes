const manifest = {
  "name": "2048 UCP",
  "short_name": "2048",
  "description": "Juego 2048 desarrollado para Iteración Web",
  // Cambia esto:
  "start_url": "/TP2-Aramberry_Llanes.IteracionWeb/index.html",
  "display": "standalone",
  "background_color": "#faf8ef",
  "theme_color": "#bbada0",
  "orientation": "portrait",
  "lang": "es",
  // Cambia esto:
  "scope": "/TP2-Aramberry_Llanes.IteracionWeb/",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
};

export default manifest;