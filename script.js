let xhttp; // para AJAX
let btnAlmacenar = document.getElementById("btnAlmacenar");
let btnListar = document.getElementById("btnListar");
let lista = document.getElementById("listaRegistros");

btnAlmacenar.addEventListener("click", almacenarNuevaPersona);
btnListar.addEventListener("click", listarPersonas);

function almacenarNuevaPersona(evt) {
    evt.preventDefault();

    let obj = {
        nombre: document.getElementById("nombre").value,
        grupo: document.getElementById("grupo").value
    }

    let JsonData = JSON.stringify(obj);

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = procesarAlmacenamiento;

    xhttp.open("POST", "almacenar.php", true);
    xhttp.send(JsonData);
}

function procesarAlmacenamiento() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log("R = " + xhttp.responseText);
        if (xhttp.responseText == "1") {
            alert("Almacenado con Exito!!!!");
        } else {
            alert("Error al almacenar....");
        }
    }
}

function listarPersonas() {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = procesarListado;

    xhttp.open("GET", "listar.php", true);
    xhttp.send();
}

function procesarListado() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        let registros = JSON.parse(xhttp.responseText);
        let listaRegistros = document.getElementById("listaRegistros");
        listaRegistros.innerHTML = "";

        if (registros.length > 0) {
            let ul = document.createElement("ul");
            registros.forEach(registro => {
                let li = document.createElement("li");
                li.setAttribute("data_id", registro.id);
                li.textContent = `${registro.nombre} - ${registro.grupo}`;
                ul.appendChild(li);
            });
            listaRegistros.appendChild(ul);
        } else {
            listaRegistros.textContent = "No hay registros.";
        }
    }
}

//Click en la listaRegistros
lista.addEventListener("click", function(evento){
    console.log(evento);
    console.log(evento.target);
    console.log(evevnto.target.attributes.data_id.value);
    console.log(evento.target.innerHTML);
});