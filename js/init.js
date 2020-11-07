const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    //para que traiga y muestre al usuario en la barra de navegación 
    var user = JSON.parse(localStorage.getItem("usuarioActual")); //parseo el JSON para usarlo como objeto
    //con este if vemos si se cumple que el usuario siga con la sesión activa o no, dado que si la cerró queda en null
    if (user == null) {
        //en caso de estar la sesión cerrada debe aparecer Iniciar sesión en la parte superior derecha de la barra de navegación
        document.getElementById("navBar").innerHTML +=
            `<a class="py-2 d-md-inline-block nav-link " style="color:white;" role="button" href="index.html" >Iniciar sesión </a>`
    } else {
        document.getElementById("navBar").innerHTML += `
      <a class="py-2 d-md-inline-block nav-link dropdown-toggle" style="color:white;" role="button" data-toggle="dropdown" >` + user.userName + ` </a>
      <div class="dropdown-menu">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
             <a class="dropdown-item" href="cart.html">Mi Carrito</a>
             <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
             <div class="dropdown-divider"></div>
              <a id="logout"class="dropdown-item" href="index.html">Cerrar sesión</a>
          </li>
        </ul>
      </div>   
  
     `
            //con lo siguiente nos aseguramos de borrar los datos del usuario que cierra la sesión
        let cerrar = document.getElementById("logout");
        cerrar.addEventListener("click", function(e) {
            localStorage.removeItem("usuarioActual");

        });
    }



});