var sounds = ["button.mp3", "error.mp3", "Lost.mp3", "Winner.mp3"];
var canva = document.querySelector("canvas");
var ctx = canva.getContext("2d");
var drawColor = "#a1001b";
var backgroundColor = "#EAFAF1";
var stroke = 6;

window.addEventListener("load", function() {
    canva.width = 300;
    canva.height = 300;
    dibujarRectangulo(0, 0, canva.width, canva.height, backgroundColor);
    var buttons = document.querySelectorAll('button,a');
    const btnClick = function(event) {
        playSound(sounds[0]);
    }
    buttons.forEach(btn => { btn.addEventListener("click", btnClick) });
});
/****DIBUJO ****/
function dibujarCabeza(x, y, radio, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.stroke();
}

function dibujarRectangulo(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function dibujarLinea(x, y, color, stroke, xTo, yTo) {
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(xTo, yTo);
    ctx.stroke();
    ctx.closePath();
}

function limpiar() {
    canva.width = canva.width;
}

function dibujar(solicitado) {
    switch (solicitado) {
        case 1:
            dibujarLinea(60, 300, drawColor, stroke, 60, 10);
            break;
        case 2:
            dibujarLinea(59, 11, drawColor, stroke, 200, 11)
            break;
        case 3:
            dibujarLinea(199, 10, drawColor, stroke, 199, 40);
            break;
        case 4:
            dibujarCabeza(200, 70, 30, drawColor);
            break;
        case 5:
            dibujarLinea(200, 98, drawColor, stroke, 200, 220);
            break;
        case 6:
            dibujarLinea(200, 98, drawColor, stroke, 150, 170);
            break;
        case 7:
            dibujarLinea(200, 98, drawColor, stroke, 250, 170);
            break;
        case 8:
            dibujarLinea(200, 219, drawColor, stroke, 150, 270);
            break;
        case 9:
            dibujarLinea(200, 219, drawColor, stroke, 250, 270);
    }
    playSound(sounds[1]);
}
/****FIN DE DIBUJO ****/

function cambiarPagina(solicitado) {
    var solicitado = document.querySelector(solicitado);
    for (var i = 0; i < 3; i++) {
        var search = ".pagina_" + (i + 1);
        var main = document.querySelector(search);
        hacerVisible(main, false);
    }
    hacerVisible(solicitado, true);
}

function hacerVisible(pagina, action) {
    if (action == true) {
        pagina.style.display = "block";
    } else {
        pagina.style.display = "none";
    }
}

function mesaje(solicitado) {
    if (solicitado == false) {
        var respuesta = document.querySelector("#mesaje");
        respuesta.style.display = "none";
    } else {
        var respuesta = document.querySelector("#mesajeAlerta");
        var mesaje = document.querySelector("#mesaje");
        respuesta.innerHTML = solicitado;
        mesaje.style.display = "block";
    }
}

function limpiarInp(solicitado) {
    var respuesta = document.querySelector(solicitado);
    respuesta.value = "";
}

function playSound(solicitado) {
    const music = new Audio("sounds/" + solicitado);
    music.play();
}

function createElementHtml(solicitado, id) {
    var respuesta = document.createElement(solicitado);
    if (id != false) {
        respuesta.setAttribute('id', id);
    }
    return respuesta;
}

function changeTextContent(element, solicitado) {
    element.textContent = solicitado;
}