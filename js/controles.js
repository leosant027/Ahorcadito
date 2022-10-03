var word = "";
var words = ["campo", "html", "css", "javascript"];
var attempts = [0, 0]; //Intentos
var gameState = false; // True => Emepezar
var touchDevice = false;
var display = window.innerWidth;

if (display < 900) {
    touchDevice = true;
}
var controlTouch = document.querySelector("#keyboard");
controlTouch.addEventListener("input", function(event) {
    if (touchDevice == true) {
        if (gameState != false) {
            var key = event['data'];
            var solicitado = isRightLetter(key.toLowerCase());
            gameExecution(solicitado, key.toLowerCase());
            limpiarInp("#keyboard");
        }
    }
});
/*TECLAS PRESIONADAS */
document.addEventListener('keydown', function gameController(event) {
    if (touchDevice == false) {
        var specialKeyPress = teclasEspeciales(event['key'].toLowerCase());
        console.log(event['key']);
        if (specialKeyPress != true) {
            if (gameState != false) {
                document.querySelector("#keyboard").value = event['key'];
                var key = document.querySelector("#keyboard").value;
                var solicitado = isRightLetter(key);
                gameExecution(solicitado, key);
                limpiarInp("#keyboard");
            }
        }

    }
});

function gameExecution(solicitado, key) {
    if (gameState != false) {
        var text = "";
        if (verifyEnteredLetter(key) != false) {
            if (solicitado != false) {
                var letter = document.querySelectorAll("#" + key);
                for (var x = 0; x < letter.length; x++) {
                    changeTextContent(letter[x], key);
                    text = text + key;
                }
                comprobarLetra(text, 0);
            } else {
                comprobarLetra(key, 1);
                var element = document.querySelector("#fallidas");
                changeTextContent(element, (attempts[1].toUpperCase()));
                dibujar(attempts[1].length);
            }
        }
        if (attempts[1].length == 9) {
            mesaje("<h3>Perdiste</h3>");
            terminarJuego();
            playSound(sounds[2]);
        }
        if (attempts[0].length == word.length) {
            mesaje("<h3>Ganaste</h3>");
            terminarJuego();
            playSound(sounds[3]);
        }
    }
}

/* INICIA JUEGO*/
function iniciarJuego() {
    terminarJuego();
    gameState = true;
    word = palabraAleatoria(words);
    cambiarPagina('.pagina_3');
    var element = document.querySelector("#fallidas");
    changeTextContent(element, " ");
    inputGame(word);
    limpiar();
    limpiarInp("#keyboard");
}
/* TERMINA JUEGO */
function terminarJuego() {
    word = null;
    attempts = ["", ""];
    gameState = false;
}
/*AGREGA PALABRA */
function agregarPalabra(solicitado) {
    solicitado = verifyWord(solicitado);
    if (solicitado != false) {
        words.push(solicitado);
        mesaje("<h3>Palabra Agregada</h3>");
        limpiarInp("#gameWord");
        iniciarJuego();
    } else {
        mesaje("<h3>Palabra Incorrecta No puede contener Numeros o Caracteres Especiales</h3>");
        limpiarInp("#gameWord");
    }
}
/*07: VERIFICA QUE LA PALABRA */
function verifyWord(solicitado) {
    var respuesta = solicitado.toLowerCase();
    if (solicitado.length > 8) {
        respuesta = false;
    } else {
        for (var i = 0; i < respuesta.length; i++) {
            var letter = verifyEnteredLetter(respuesta[i]);
            if (letter != true) {
                respuesta = false;
            }
        }
    }
    return respuesta;
}
/*VERIFICA QUE LA LETRA INGRESADA NO CONTENGA CARACTERES INCORRECTOS */
function verifyEnteredLetter(solicitado) {
    var filter = '1234567890=@.;?¿!¡|"[]<>, ';
    var respuesta = true;
    if (filter.indexOf(solicitado.charAt()) != -1) {
        respuesta = false;
    }
    return respuesta
}
/* SELECCIONA UNA PALABRA ALEATORIA PARA LA PARTIDA*/
function palabraAleatoria(solicitado) {
    var randNumber = Math.floor((Math.random() * ((solicitado.length - 1) - 0 + 1)) + 0)
    var respuesta = solicitado[randNumber];
    return respuesta;
}
/*CREA EL TABLERO DE ESPACIOS PARA LOS CARACTERES */
function inputGame(solicitado) {
    var ul = document.querySelector(".acertadas");
    ul.innerHTML = " ";
    for (var i = 0; i < solicitado.length; i++) {
        li = createElementHtml("li", word[i]);
        ul.appendChild(li);
    }
}
/*11: EVALUA QUE LA LETRA INGRESADA POR EL USUARIO ESTA DENTRO DEL ARRAY */
function isRightLetter(solicitado) {
    var respuesta = false;
    for (var x = 0; x < word.length; x++) {
        if (solicitado.toLowerCase() == word[x]) {
            if (word[x] != attempts[0]) {
                respuesta = true;
            }
        }
    }
    return respuesta;
}
/*REGISTRA LETRAS INGRESADAS SI NO ESTAN EN LA PALABRA O SI ESTAN */
function comprobarLetra(solicitado, type) {
    var respuesta = false;
    if (attempts[type].length == 0) {
        attempts[type] = attempts[type] + "" + solicitado;
        respuesta = true;
    } else {
        var i = attempts[type].indexOf(solicitado);
        if (i == -1) {
            attempts[type] = attempts[type] + "" + solicitado;
            respuesta = true;
        }
    }
    return respuesta;
}
/*VERIFICA QUE NO SE PULSEN TECLAS ESPECIALES */
function teclasEspeciales(solicitado) {
    var respuesta = false;
    var teclasEspeciales = ['contextmenu', 'control', 'tab', 'capslock', 'shift', 'alt', 'altgraph', 'enter', 'meta', 'dead', 'backspace', 'home', 'end', 'delete', 'paginaup', 'paginadown', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'numlock', 'escape', 'pause', 'insert', 'scrolllock', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'];
    for (var x = 0; x < teclasEspeciales.length; x++) {
        if (solicitado == teclasEspeciales[x]) {
            respuesta = true;
        }
    }
    return respuesta
}