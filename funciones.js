var inter;
/**
 * Resetea canvas e inputs
 * @method resetInputs
 */
function resetInputs() {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    document.getElementById("X1").value = "";
    document.getElementById("X2").value = "";
    document.getElementById("Y1").value = "";
    document.getElementById("Y2").value = "";
    document.getElementById("resultado").innerHTML = "";
}

/**
 * Verifica que el dato ingresado sea un numero entre -250 y 250, siendo el caso contrario borra
 * el dato ingresado y avisa al usuario del error cometido
 * @method verificarinput
 * @param id
 */
 function verificarinput(id) {
    let  v = document.getElementById(id).value;
    let k = 0;
    if (isNaN(v)) {
        alert("Se ingreso un valor invalido en " + id);
        document.getElementById(id).value = "";
    }
    if (v < 0.01 && v > 0){
    alert("El numero es demasiado pequeño");
        document.getElementById(id).value = "";
    }
    if (v > 250 || v < -250)
    {
        alert("Solo se admiten valores desde -250 hasta 250");
        document.getElementById(id).value = "";
    }
}

/**
 * Calcula la pendiente, escribe el resultado y llama a las funciones que dibujan en el canvas
 * @method calcular
 */
function calcular() {
    let x1 = document.getElementById("X1").value;
    let y1 = document.getElementById("Y1").value;
    let x2 = document.getElementById("X2").value;
    let y2 = document.getElementById("Y2").value;

    if (x1 === '' || y1 === '' || x2 === '' || y2 === '') {
        alert('Debe completar todos los campos para continuar');
        return;
    }

    // Se convirten los inputs de string a número
    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);

    let pendiente = (y2 - y1) / (x2 - x1);

    document.getElementById("resultado").innerHTML = "La pendiente es " + pendiente.toString();

    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);
    clearInterval(inter);

    dibujarEjes();
    escribirEjes();
    dibujarPuntos(x1, y1, x2, y2);
    dibujarPendiente(x1, y1, x2, y2, pendiente);
}

/**
 * Dibuja los ejes cartesianos, situados al medio del canvas
 * @method dibujarEjes
 */
function dibujarEjes() {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";

    // Eje X desde (50, 300) hasta (550, 300)
    ctx.beginPath();
    ctx.moveTo(50, 300);
    ctx.lineTo(550, 300);
    ctx.stroke();

    // Eje Y desde (300, 50) hasta (300, 550)
    ctx.beginPath();
    ctx.moveTo(300, 50);
    ctx.lineTo(300, 550);
    ctx.stroke();
}

/**
 * Escribe los ejes x e y. Los numera
 * @method escribirEjes
 */

 function escribirEjes() {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.font = '20px serif';
    ctx.fillStyle = "black";
    ctx.fillText('x', 570, 320);
    ctx.fillText('y', 280, 70);
    ctx.fillText('100', 390, 320);      //x
    ctx.fillText('200', 490, 320);      //x
    ctx.fillText('-100', 190, 320);      //x
    ctx.fillText('-200', 90, 320);      //x
    ctx.fillText('100', 320, 205);
    ctx.fillText('200', 320, 110);
    ctx.fillText('-100', 320, 410);
    ctx.fillText('-200', 320, 520);

  }


/**
 * Dibuja los puntos ingresados, se traducen las coordenadas cartesianas a las del canvas
 * @method dibujarPuntos
 *
 * @param x1 coordenada en x del punto 1 representada como un número
 * @param y1 coordenada en y del punto 1 representada como un número
 * @param x2 coordenada en x del punto 2 representada como un número
 * @param y2 coordenada en y del punto 2 representada como un número
 */
function dibujarPuntos(x1, y1, x2, y2) {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2060a8";
    ctx.fillStyle = 'rgb(180, 216, 228)';

    // Se debe sumar 300 en X y restar Y a 300 para traducir los puntos
    // Punto 1
    ctx.beginPath();
    ctx.arc(x1+300, 300-y1, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Punto 2
    ctx.beginPath();
    ctx.arc(x2+300, 300-y2, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

/**
 * Dibuja una linea animada entre los puntos ingresados
 * @method dibujarPendiente
 *
 * @param x1 coordenada en x del punto 1 representada como un número
 * @param y1 coordenada en y del punto 1 representada como un número
 * @param x2 coordenada en x del punto 2 representada como un número
 * @param y2 coordenada en y del punto 2 representada como un número
 * @param pendiente calculada como (y2 - y1) / (x2 - x1)
 */
function dibujarPendiente(x1, y1, x2, y2, pendiente) {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";

    let l = 0;
    // Se ejecuta con un intervalo de 1000/35 ms
    inter = setInterval(function() {
        // Se dibuja hasta que el incremento supere la distancia entre x1 y x2
        if(Math.abs(l) < Math.abs(x2-x1)) {
            // Si el segundo punto esta a la izquierda del primero se debe decrementar, si no se incrementa
            if(x2<x1)
                l--;
            else
                l++;
            ctx.beginPath();
            ctx.moveTo(x1+300, 300-y1);
            ctx.lineTo(x1+300+l, 300-y1-l*pendiente);
            ctx.stroke();
        }
        else
            clearInterval(inter)
    }, 1000 / 35)
}
