var fileContents;
var palabra = "";
var palabra_con_tildes = "";
var errores = 0;
var reveladas = 0;


function onload_main() { // Primera funcion que ejecutamos con la carga de la pagina
    reset();
    selectPalabra();
    // palabra_con_tildes = "áéíóúü".toUpperCase();
    no_tildes();
    console.log(palabra_con_tildes);

    var div_palabra = document.getElementById("palabra_oculta");
    for (i=0; i<palabra.length; i++){
        div_palabra.innerHTML += "_ ";
    }
}


function reset() { // Resetea todo a los valores iniciales sin necesidad de recargar la página (para no recargar el diccionario entero cada vez).
    document.getElementById("hangman_imgs").src = "imagenes/nada.png";
    var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
    for (i=0; i<letras.length; i++){
        let letra = document.getElementById(letras[i]);
        letra.disabled = false;
        letra.style.removeProperty('background');
    }
    errores = 0;
    reveladas = 0;
    document.getElementById("palabra_oculta").innerHTML = "";
    document.getElementById("palabra_oculta").removeAttribute("href");
    document.getElementById("palabra_oculta").style.color = "#f00";
    document.getElementById("weiner").style.visibility = "hidden";
    document.getElementById("game_over").style.visibility = "hidden";
    document.getElementById("div_lost").style.visibility = "hidden";
    document.getElementById("game_over").src = "imagenes/ahorcado_game_over.gif"+"?a="+Math.random();
    document.getElementById("hangman_imgs").style.visibility = "visible";
}


function comprobar(letra){ // segunda funcion que comprueba que las letras coinciden con las que tenemos en la variable palabras
    
    document.getElementById(letra).disabled = true;
    let encontrado = false;

    for (i=0; i<palabra.length; i++){
        if (letra === palabra[i]){
            encontrado = true;
            revelar(i);
        }
    }

    if (encontrado){
        document.getElementById(letra).style.background = '#00ff00';
    } else {
        document.getElementById(letra).style.background = '#ff0000';
        error();
    }

    if (reveladas == palabra.length){
        completado();
    }
}


function completado(){ // Función que muestra la pantalla de victoria.
    full_word = document.getElementById("palabra_oculta");
    full_word.innerHTML = palabra_con_tildes;
    full_word.style.color = "blue";
    full_word.href = "https://www.google.com/search?q=" + palabra_con_tildes.toLowerCase() + "+rae";
    document.getElementById("weiner").style.visibility = "visible";
    document.getElementById("hangman_imgs").src = "imagenes/nada.png";
}


function revelar(i){ // funcion que nos cambia el guion por la letra
    const array_split = document.getElementById("palabra_oculta").innerHTML.split(" "); 
    // Cogemos el contenido del "palabra_oculta" (guiones o lo que haya), y creamos una array usando el split(" ") 
    // y el espacio dentro de las comillas como separador de los elementos.
    // _ E _ ==> ["_", "E", "_"]
    
    array_split[i] = palabra_con_tildes[i];
    // En la array que hemos creado, cambiamos el guión en la posición "i" por la letra que haya en esa posición en la palabra original.
    
    document.getElementById("palabra_oculta").innerHTML = array_split.join(" ");
    // Unimos los elementos de la array con espacios entre medias, y lo mostramos en el HTML.
    reveladas++;
}


function error(){ // Funcion que cuenta los errores, muestra el ahorcado correspondiente, y si llega a 6 errores muestra la pantalla de derrota.
    errores++;
    switch (errores){
        case 1: 
            document.getElementById("hangman_imgs").src = "imagenes/Cabeza.png";
            break;
        case 2: 
            document.getElementById("hangman_imgs").src = "imagenes/Cuerpo.png";
            break;    
        case 3: 
            document.getElementById("hangman_imgs").src = "imagenes/Brazo Izq.png";
            break;
        case 4: 
            document.getElementById("hangman_imgs").src = "imagenes/Brazos.png";
            break;
        case 5: 
            document.getElementById("hangman_imgs").src = "imagenes/Pierna Izq.png";
            break;
        case 6: 
            document.getElementById("hangman_imgs").src = "imagenes/nada.png";
            document.getElementById("div_lost").style.visibility = "visible";
            document.getElementById("game_over").style.visibility = "visible";
            document.getElementById("hangman_imgs").style.visibility = "hidden";
            document.getElementById("palabra_oculta").innerHTML = palabra_con_tildes;
            document.getElementById("palabra_oculta").href = "https://www.google.com/search?q=" + palabra_con_tildes.toLowerCase() + "+rae";
            document.getElementById("palabra_oculta").style.color = "blue";
            break;
    }
}


function no_tildes(){ // Función diseñada para que si pulsas una vocal, se revelen tanto las vocales que coinciden como sus versiones con tilde o diéresis.
    var palabra_list = [];
    for (i=0; i<palabra_con_tildes.length; i++){
        switch (palabra_con_tildes[i]) {
            case "\u00C1": // Caracter unicode para Á
                palabra_list[i] = "A";
                break;
            case "\u00C9": // Caracter unicode para É
                palabra_list[i] = "E";
                break;
            case "\u00CD": // Caracter unicode para Í
                palabra_list[i] = "I";
                break;
            case "\u00D3": // Caracter unicode para Ó
                palabra_list[i] = "O";
                break;
            case "\u00DA": // Caracter unicode para Ú
                palabra_list[i] = "U";
                break;
            case "\u00DC": // Caracter unicode para Ü
                palabra_list[i] = "U";
                break;
            default:
                palabra_list[i] = palabra_con_tildes[i];
                break;
        }
    }
    palabra = palabra_list.join("").toUpperCase();
}


listaPalabras = ["esternocleidomastoideo", "palabra", "test", "prueba"];
function selectPalabra(){ // Diccionario de palabras y función para elegir una de ellas.
    palabra_con_tildes = listaPalabras[Math.floor(Math.random() * listaPalabras.length)].toUpperCase();
}
