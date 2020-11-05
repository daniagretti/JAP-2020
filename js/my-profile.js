/*Cuando se toca el boton para subir la imagen luego de colocada la url, buscamos la url de la imagen del input y la ponemos en un JSON
luego lo pasamos a objeto y lo guardamos en el localStorage para posteriormente incluirlo en el HTML */
function imagen() {
    document.getElementById("btnImg").addEventListener("click", function() {
        let imagenDePerfil = document.getElementById("foto").value;
        if (imagenDePerfil != "") {
            let JSONimagen = {
                imgSrc: imagenDePerfil
            }
            var imagenPerfilJSON = JSON.stringify(JSONimagen);
            localStorage.setItem("imagenDePerfil", imagenPerfilJSON);
        }


    })
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("guardarPerfil").addEventListener("click", function() {
            let name = document.getElementById("nombre").value;
            let lastName = document.getElementById("apellido").value;
            let age = document.getElementById("edad").value;
            let email = document.getElementById("mail").value;
            let telephone = document.getElementById("tel").value;
            let celphone = document.getElementById("cel").value;

            let datosPerfil = {
                nombre: name,
                apellido: lastName,
                edad: age,
                mail: email,
                telefono: telephone,
                celular: celphone
            }
            var perfilJSON = JSON.stringify(datosPerfil);
            localStorage.setItem("datosDePerfil", perfilJSON);




        })
        //invocamos la funcion imagen para que se pueda ejecutar, donde tenemos funcionalidad al hacer click en el boton de subir imagen
    imagen();

});

document.addEventListener("DOMContentLoaded", function(e) {

    /* En esta parte se inserta en el html los datos del perfil guardados anteriormente*/
    let perfil = JSON.parse(localStorage.getItem("datosDePerfil"));

    if (perfil != undefined) {

        document.getElementById("nombreSaved").innerHTML = perfil.nombre;
        document.getElementById("apellidoSaved").innerHTML = perfil.apellido;
        document.getElementById("edadSaved").innerHTML = perfil.edad;
        document.getElementById("emailSaved").innerHTML = perfil.mail;
        document.getElementById("telSaved").innerHTML = perfil.telefono;
        document.getElementById("celSaved").innerHTML = perfil.celular;
    }

    /* Aqui se obtiene del localStorage la url y se inserta la imagen en el HTML*/
    let img = JSON.parse(localStorage.getItem("imagenDePerfil"));
    //se usa un condicional para que si no hay imagen cargada al principio no intente mostrar una, lo mismo si no reconoce el dato del input
    if (img != null) {
        let insertarImg = `<img src="` + img.imgSrc + `" alt="fotoDePerfil" class="img-thumbnail rounded-circle" style="width: 150px; height: 100px">`
        document.getElementById("mostrarImg").innerHTML = insertarImg;
    }


});