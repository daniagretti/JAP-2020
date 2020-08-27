//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
//que cuando se haga click en el boton para el login guarde los datos
    document.getElementById("botonSignIn").addEventListener("click", function(){
        loginDatosDeUsuario();
    });
});
function loginDatosDeUsuario (){
    let userName = document.getElementById("idUser").value;
    let pasword = document.getElementById("idPasword").value;
    //creo un JSON para luego poder usar como objeto parseando cuando hago el getItem
    var usuarioActual = ` { "userName":"`+ userName +`", "pasword":"`+ pasword + `"} `;
    window.localStorage.clear();
    window.localStorage.setItem("usuarioActual", usuarioActual);
}
