const CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
var articles = {};
var costo = 0;
var cant = 0;
var tc = 40;
var costoEnvio = 0.15;
var validado = false;
var tarj = false;
var tran = false;

/*para cambiar todo a moneda dolar USD primero veo si se cumple la condicion del if de que en caso de tratarse de pesos UYU haga la conversion
dividiendo por el tipo de cambio definido en tc como 40 y en caso de que se trate de dolares que deje el costo en esa moneda*/
function tipoCambio(moneda) {
    
        if (moneda.currency == "UYU") {
            costo = moneda.unitCost / tc;
        } else {
            costo = moneda.unitCost;
        }
    
    return costo;
}
/* En esta funcion recorremos el array con todos los articulos del carrito obtenido del JSON y se crea el html con cada uno utilizando un for
posteriormente se invoca la funcion agregarEvents donde le pasamos por parametro el array con los articulos*/
function showCartProductsAndTotalCost(array) {

    let htmlProd = "";

    for (let i = 0; i < array.length; i++) {
        var art = array[i];

        htmlProd = `
        
             <tr id="arts${i}">
                <td><img src="` + art.src + `" class="img-thumbnail" style="width:100px"></td>
                <td><p>`+ art.name + `</p></td>
                <td><p>`+ "USD " + tipoCambio(art) + `</p></td>
                <td><input id="cantidad${i}" type="number" min="1" placeholder="` + art.count + `" style="width:50px" class="form-control text-center cant" ></td>
                <td ><strong id="subT${i}" class="sub">  ` + art.count*tipoCambio(art) + `</strong></td>
                <td><img style="height:30px" src="https://www.flaticon.com/svg/static/icons/svg/545/545755.svg" class="eliminar"></td>
            </tr>
            
        `
        document.getElementById("cart-products").innerHTML += htmlProd;

    }
    agregarEvents(array);
    borrarArticulo(array);
}
/* Se obtiene un array con todos los elementos de la clase cant, que serian las cantidades de los inputs del html de arriba
Lo recorro con un for para ver cada elemento individualmente y agregarle un eventListener con change para que realice los calculos cuando
se cambie la cantidad de cada uno*/
function agregarEvents(articles) {
    let arrayCant = document.getElementsByClassName("cant"); //me devuelve un array con todos los inputs de cantidad
    for (let i = 0; i < arrayCant.length; i++) {
         let canti = document.getElementById("cantidad"+i); //me devuelve el input de cantidad correspondiente a i
        canti.addEventListener("change", function () { //agrego un listener por cada input 
            cant = canti.value; //quiero tomar el valor que esta en el input
            let subtotal = cant * tipoCambio(articles[i]); //se calcula el subtotal con la cantidad * el costo con la conversion a la moneda ya hecho
            document.getElementById("subT"+i).innerHTML =  subtotal; //muestro el nuevo subtotal en el html
            cartTotalCost(); //la llamo para que recalcule el total cada vez que se cambia la cantidad
        })
    }
}
/* funcion qur elimina el articulo cuando hacemos click en la imagen de tacho de basura*/
function borrarArticulo(){
    let trash = document.getElementsByClassName("eliminar");
    for (let i = 0; i<trash.length; i++){
        trash[i].addEventListener("click", function(){
            document.getElementById("arts" + i).remove(); //elimino el articulo
            cartTotalCost(); //recalculo el costo ni bien elimino
        })
    }
}
/* Funcion que calcula el costo total, se obtiene un array con todos los subtotales de la clase sub, lo recorre y se obtiene el valor de cada uno
con innerText y se realiza una sumatoria con todos para luego agregarlo al html*/
function cartTotalCost() {
     let arraySubtotales = document.getElementsByClassName("sub"); //me da un array con todos los subtotales
     let totalCost = 0;
     for (let i=0; i<arraySubtotales.length; i++){ //recorro cada subtotal
         //sumo el valor de cada subtotal
         let subIndividual = arraySubtotales[i];
        totalCost += parseFloat(subIndividual.innerText);
        
    }
    let montoEnvio = costoEnvio * totalCost; //calcula el envio para mostrar por separado
    let conEnvio = totalCost * (1 + costoEnvio); //calcula el total con el envio incluido
   
    let htmlSub = `<strong>USD` + " " + Math.round(totalCost) + `</strong>`
    let htmlEnvio = `<strong>USD` + " " + Math.round(montoEnvio) + `</strong>`
    let htmlTotal = `<strong style="color: #C71585">USD` + " " + Math.round   (conEnvio) + `</strong>`

    document.getElementById("subtotal").innerHTML = htmlSub;
    document.getElementById("montoDeEnvio").innerHTML = htmlEnvio;
    document.getElementById("total").innerHTML = htmlTotal;
}
 
/*Esta funcion tiene el objetivo de insertar en el DOM el codigo html para visualizar el tipo de envio, el mismo
    va a mostrarse en el div que tiene como id "envios"*/
function tipoEnvio() {
    let htmlEnvio = `
    <h3><img src="https://www.flaticon.com/svg/static/icons/svg/3366/3366832.svg" style="height:70px">Tipo de envío</h3>
    <hr>
    <input type="radio" id="premium" name="envio" checked><label for="premium" >Premium 2 a 5 días (15%)</label><br>
    <input type="radio" id="express" name="envio"><label for="express" >Express 5 a 8 días (7%)</label><br>
    <input type="radio" id="standard" name="envio"><label for="standard">Standard 12 a 15 días (5%)</label><br>`;
    document.getElementById("envios").innerHTML = htmlEnvio;
    
     actualizarCostos()
}
/* funcion que actualiza el costo segun el envio seleccionado con el radio button*/

function actualizarCostos() {
    document.getElementById("premium").addEventListener("click", function () {
        costoEnvio = 0.15;
        cartTotalCost();
    })
    document.getElementById("express").addEventListener("click", function () {
        costoEnvio = 0.07;
        cartTotalCost();
    })
    document.getElementById("standard").addEventListener("click", function () {
        costoEnvio = 0.05;
        cartTotalCost();
    })
}
/* Funcion que crea el html donde se llenan los datos de direccion esquina y numero*/
function datosEnvio() {
    document.getElementById("datosEnvio").innerHTML = `
    <h3><img src="https://www.flaticon.com/svg/static/icons/svg/2719/2719564.svg" style="height:50px">Dirección de envío</h3>
    <hr>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="dir">Calle</label>
            <input type="text" id="dir" nombre="calle" class="form-control" required>
        </div>
        <div class="form-group col-md-6">
            <label for="num">Número</label>
            <input type="number" id="num" nombre numero" class="form-control" required>
        </div>
    </div>
    <div class="form-group col-md-6">
        <label for="esq">Esquina</label>
        <input type="text" id="esq" nombre="esquina" class="form-control" required>
        <br>
        <button id="btnFP"class="btn btn-default btn-md" style="background-color: #E5097F; color: white;">Forma de Pago</button>
    </div>   
    `
    ventanaModal();


}

//Muestra la ventana y habilita en funcion de lo seleccionado
function ventanaModal() {

    //para que se muestre la ventana modal cuando se haga click en el boton de Forma de Pago
    document.getElementById("btnFP").addEventListener("click", function () {
        $('#ventanaModal').modal()
    })


    //Para habilitar o deshabilitar los inputs 


    let numeroT = document.getElementById("cardNum");
    let cvc = document.getElementById("cvc");
    let vencimiento = document.getElementById("vto");
    let numeroCta = document.getElementById("cuenta");
    let mensajeExitoso = false;

    //primero debe seleccionar tarjeta o transferencia para que deje ingresar los datos
    numeroCta.disabled = true;
    numeroT.disabled = true;
    cvc.disabled = true;
    vencimiento.disabled = true;

    /*Que cuando se seleccione el radio button de tarjeta o transferencia deshabilite los campos a llenar de la otra opcion */
    document.getElementById("tarjeta").addEventListener("click", function () {
        validado = true;
        tarj = true;
        tran = false;
        numeroCta.disabled = true;
        numeroT.disabled = false;
        cvc.disabled = false;
        vencimiento.disabled = false;

        //Cuando se hace click en guardar se valida si estan completos los datos y da mensajes en caso de que falten o que se logre con exito
        document.getElementById("save").addEventListener("click", function () {
            if ((numeroT.value == "" || cvc.value == "" || vencimiento.value == "" || numeroCta != "" ) && (numeroT.value =="" || cvc.value =="" || vencimiento.value == "" )){
                document.getElementById("validarDatosModal").innerHTML = `<div class="alert alert-warning alert-dismissable" id="alerta">
               <button type="button" class="close" data-dismiss="alert">&times;</button>
               <strong>¡Atención!</strong> Debes ingresar los datos de tu tarjeta.
               </div>`
                mensajeExitoso= false;
            } else {
                //ocultar modal cuando estan los datos y doy guardar
                $('#ventanaModal').modal('hide');
                mensajeExitoso = true;
            }
            if (mensajeExitoso) {
                document.getElementById("exito").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta">
               <button type="button" class="close" data-dismiss="alert">&times;</button>
               El ingreso de su tarjeta se ha realizado con éxito.
               </div>`
            }

        });
    });
    document.getElementById("transferencia").addEventListener("click", function () {
        validado = true;
        tran = true;
        tarj = false;
        numeroCta.disabled = false;
        numeroT.disabled = true;
        cvc.disabled = true;
        vencimiento.disabled = true;

        //Cuando se hace click en guardar se valida si estan completos los datos y da mensajes en caso de que falten o que se logre con exito
        document.getElementById("save").addEventListener("click", function () {
            if ( (numeroCta.value == "" || numeroT.value != "" || cvc.value != "" || vencimiento.value != "" ) && (numeroCta.value == "" || numeroT.value == "" || cvc.value =="" || vencimiento.value == "" )) {
                document.getElementById("validarDatosModal").innerHTML = `<div class="alert alert-warning alert-dismissable" id="alerta">
               <button type="button" class="close" data-dismiss="alert">&times;</button>
               <strong>¡Atención!</strong> Debes ingresar tu cuenta de banco.
               </div>`
                mensajeExitoso = false;
            } else {
                //ocultar modal cuando estan los datos correctamente y doy guardar
                $('#ventanaModal').modal('hide');
                mensajeExitoso = true;
            }
            if (mensajeExitoso) {
                document.getElementById("exito").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                Sus datos de cuenta se han ingresado con éxito.
                </div>`
            }

        });

    });

  
}

//funcion que valida cuando se da comprar si los campos estan llenos
function validar(){
    let direccion = document.getElementById("dir");
    let numeroPuerta = document.getElementById("num");
    let esquina = document.getElementById("esq");
    document.getElementById("btnComprar").addEventListener("click", function(){
        if( direccion.value == "" || numeroPuerta.value == "" || esquina.value == ""){
            document.getElementById("validaciones").innerHTML= `<div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Debe llenar los <strong>datos de envío</strong>
            </div>`
        }else if (!validado){
            document.getElementById("validaciones").innerHTML= `<div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Debe selecionar una <strong> forma de pago</strong>
            </div>`
        }else{
            document.getElementById("validaciones").innerHTML= `<div class="alert alert-success alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            ¡Su compra ha sido realizada con <strong> éxito</strong>!
            </div>`
        }
    })
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    /*como practicamos en clase, se utiliza directamente fetch para hacer la peticion al JSON brindado en la letra de la entrega,
    guardado como constante en CARRITO al comienzo de este documento*/
    fetch(CARRITO).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(response => {
        showCartProductsAndTotalCost(response.articles);
        tipoEnvio(); 
        datosEnvio();
        cartTotalCost();
        validar();
    })

});
