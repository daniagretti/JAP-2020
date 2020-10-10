const CARRITO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
var articles = {};
var costo = 0;
var cant = 0;
var tc = 40;

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
        
            <tr>
                <td><img src="` + art.src + `" class="img-thumbnail" style="width:100px"></td>
                <td><p>`+ art.name + `</p></td>
                <td><p>`+ "USD " + tipoCambio(art) + `</p></td>
                <td><input type="number" min="1" placeholder="` + art.count + `" style="width:50px" class="form-control text-center cant" ></td>
                <td ><strong id="subT${i}" class="sub">  ` + art.count*tipoCambio(art) + `</strong></td>
            </tr>
            
        `
        document.getElementById("cart-products").innerHTML += htmlProd;

    }
    agregarEvents(array);
}
/* Se obtiene un array con todos los elementos de la clase cant, que serian las cantidades de los inputs del html de arriba
Lo recorro con un for para ver cada elemento individualmente y agregarle un eventListener con change para que realice los calculos cuando
se cambie la cantidad de cada uno*/
function agregarEvents(articles) {
    let arrayCant = document.getElementsByClassName("cant"); //me devuelve un array con todos los inputs de cantidad
    for (let i = 0; i < arrayCant.length; i++) {
        arrayCant[i].addEventListener("change", function () { //agrego un listener por cada input 
            cant = arrayCant[i].value; //quiero tomar el valor que esta en el input
            let subtotal = cant * tipoCambio(articles[i]); //se calcula el subtotal con la cantidad * el costo con la conversion a la moneda ya hecho
            document.getElementById("subT"+i).innerHTML =  subtotal; //muestro el nuevo subtotal en el html
            cartTotalCost(); //la llamo para que recalcule el total cada vez que se cambia la cantidad
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
   
    let costoEnvio = 0;
    let conEnvio = costoEnvio + totalCost;
    let htmlSub = `<strong>USD` + " " + Math.round(totalCost) + `</strong>`
    let htmlTotal = `<strong style="color: #C71585">USD` + " " + Math.round   (conEnvio) + `</strong>`

    document.getElementById("subtotal").innerHTML = htmlSub;
    document.getElementById("total").innerHTML = htmlTotal;
}
 
/*Esta funcion tiene el objetivo de insertar en el DOM el codigo html para visualizar el tipo de envio, el mismo
    va a mostrarse en el div que tiene como id "envios"*/
function tipoEnvio() {
    let htmlEnvio = `
    <h3>Tipo de envío</h3>
    <hr>
    <input type="radio" id="premium" name="envio" checked><label for="premium" >Premium 2 a 5 días (15%)</label><br>
    <input type="radio" id="express" name="envio"><label for="express" >Express 5 a 8 días (7%)</label><br>
    <input type="radio" id="standard" name="envio"><label for="standard">Standard 12 a 15 días (5%)</label><br>`;
    document.getElementById("envios").innerHTML = htmlEnvio;
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
        cartTotalCost();
    })

});
