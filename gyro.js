console.log("gyro cargado");

window.addEventListener("deviceorientation", function(event) {

    console.log(
        "beta:", event.beta,
        "gamma:", event.gamma
    );

});