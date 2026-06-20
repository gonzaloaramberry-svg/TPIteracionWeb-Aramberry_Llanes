var juego2048;

window.requestAnimationFrame(function () {
  juego2048 = new GameManager(
    4,
    KeyboardInputManager,
    HTMLActuator,
    LocalStorageManager
  );
});