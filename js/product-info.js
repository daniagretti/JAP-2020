var prodInfo = {};
var prodComments = {};
var prodAll = {};
var rating = 0;

//MOSTRAR IMAGENES COMO CARRUSEL
function showImagesGallery(array) {
    let htmlImg = "";
    let htmlCarousel = "";
    for (let i = 0; i < array.length; i++) {
        let imagenes = array[i];
        if (i == 0) {
            //para poner el que esta activo
            htmlImg += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" class="active"></li>`
            htmlCarousel += `
                <div class="carousel-item active" data-interval="5000">
                    <img src="` + imagenes + `" class="d-block w-100" alt="...">
                </div> `
        } else {
            //para poner el resto
            htmlImg += `<li data-target="#carouselExampleIndicators" data-slide-to=" ` + i + `"></li> `
            htmlCarousel += `
                <div class="carousel-item" data-interval="2000">
                    <img src="`+ imagenes + `" class="d-block w-100" alt="...">
                </div>`
        }
    }
    document.getElementById("carouselHtml").innerHTML = htmlImg; //ponemos la cantidad de li dentro del ol en html para que muestre la cantidad de imagenes como rayitas en la imagen
    document.getElementById("productImages").innerHTML = htmlCarousel; //agregamos el carrusel propiamente dicho
}

//MOSTRAR PRODUCTOS RELACIONADOS
function showRelatedProducts(array) {
    /*abajo se llama al JSON de product info donde los productos relacionados se encuentran en un array y a su vez, 
    ese array referencia las posiciones de los productos en el JSON con los productos general, por eso llamamos al getJSON con el general y 
    es por eso mismo que tenemos que buscar al relacionado como la posicion en el array(que se ingresa cuando se llama a la funcion mas abajo con el product info)
    prodAll[array[i]]*/
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodAll = resultObj.data; //trae los datos de los productos generales
            let htmlRelatedProds = "";
            for (let i = 0; i < array.length; i++) {
                let related = prodAll[array[i]]; 
                 /*los relacionados son aquellos que marcan en el json product info que lo traemos en array[i], pero queremos que nos devuelva la info de esos,
                por lo que queremos en realidad a los productos (en json product general) de esas posiciones del array,
                en este caso buscamos las posiciones del json product info que serian [1,3] pero los datos del general del producto*/
                htmlRelatedProds += `
                <div class= "col-lg-3 col-md-4 col-6 border" id="related">
                    <div id="relatedProdImg" class= "row">
                        <img class="img-fluid p-2" src="`+ related.imgSrc + `">                                              
                    </div>                   
                    <div "relatedProdInfo" class= "row p-2">
                     <strong style="color: rgb(245, 21, 107);">`+ related.name + `</strong> 
                    <p>`+ related.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="product-info.html">Ver</a>
                    </div>                     
                </div>`

            }

            document.getElementById("relatedProducts").innerHTML += htmlRelatedProds;
        }
    });

}
//MOSTRAR PUNTAJE COMO ESTRELLAS
function showRating(rating) {
    let htmlScore = "";
    let stars = "";

    for (let i = 1; i <= 5; i++) { //recorro todas las estrellas (son max 5)
        /*si las estrellas son iguales o menores al rating que se le dio deben aparecer
        en color naranja el resto (serian las no seleccionadas) van negras*/
        if (i <= rating) { 
            stars += `<i class="fa fa-star checked"></i>`;
        } else {
            stars += `<i class="fa fa-star"></i>`;
        }
    }
    htmlScore = `<span> ${stars} </span>`
    return htmlScore;
}
//MOSTRAR COMENTARIOS DEL JSON
function showComments() {
    /*primero traigo el json con los comentarios y los recorro para poder obtener la info de cada uno 
    como la fecha, el usuario y el comentario en si mismo. Ademas, se le agrega un avatar al perfil del usuario del comentario*/
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodComments = resultObj.data;
            let htmlComments = "";
            for (let i = 0; i < prodComments.length; i++) {
                let comentario = prodComments[i];
                htmlComments += `  
                <div class="row">
                
                <div class="w-100 justify-content-between list-group-item list-group-item-action">
                         <p class="text-muted"><img src="https://es.calcuworld.com/wp-content/uploads/sites/2/2019/09/generador-de-nombres-de-usuario.png" alt="Avatar" class="avatar"> <strong>`+ comentario.user + `</strong>` + " " + "(" + comentario.dateTime + ")" + " " + showRating(comentario.score) + `</p>
                         <p> ` + comentario.description + `</p>
                         
                    
                </div>
          
                </div>
                 
            `
            }
            document.getElementById("comment").innerHTML += htmlComments;
        }
    });
}

//FUNCION PARA HACER RATING EN NUEVO COMENTARIO
function add(starNum) {
    //la llamamos en showNewComment() onclick
//debe mostrar las 5 estrellas
    for (var i = 1; i <= 5; i++) {
        var current = document.getElementById("star" + i)
        current.className = "fa fa-star"
    }
/*si las estrellas son menores o iguales a la cantidad seleccionada deben aparecer en color naranja
se llama al id star y la iteracion hasta el total seleccionado y se llama segun la clase de bootstrap fa fa-star
y se le agrega checked para que cambie el color*/
    for (var i = 1; i <= starNum; i++) {
        var current = document.getElementById("star" + i)
        if (current.className == "fa fa-star") {
            current.className = "fa fa-star checked"
        }
    }
    /*rating es una variable inicializada al comienzo del documento, la utilizaremos luego para que cuando se de enviar 
    al nuevo comentario quede guardada la cantidad de estrellas que deben aparecer naranjas con showRating(rating) */
     rating = starNum;
}
document.addEventListener("DOMContentLoaded", function(e){
getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;

            let prodName = document.getElementById("productName");
            let prodCost = document.getElementById("productCost");
            let prodDesc = document.getElementById("productDesc");
            let prodCat = document.getElementById("productCategory");
            let prodSold = document.getElementById("productSoldCount");

            prodName.innerHTML += prodInfo.name;
            prodCost.innerHTML += prodInfo.currency + " " + prodInfo.cost;
            prodDesc.innerHTML += prodInfo.description;
            prodCat.innerHTML += prodInfo.category;
            prodSold.innerHTML += prodInfo.soldCount;


            //Muestro las imagenes en forma de galería tipo carrusel
            showImagesGallery(prodInfo.images);
            //Muestro los productos relacionados
            showRelatedProducts(prodInfo.relatedProducts);
            //Muestro los comentarios con el rating
            showComments();

        }
    });
    //PARA AGREGAR NUEVOS COMENTARIOS
    document.getElementById("enviar").addEventListener("click", function(){ //cuando se hace click en enviar en la seccion de comentar
        
        let texto = document.getElementById("textAreaComment").value; //tomar lo que esta comentado para luego mostrarlo
        document.getElementById("textAreaComment").value = ""; //para limpiar la caja de texto
        let user = JSON.parse(localStorage.getItem("usuarioActual")); //para obtener el nombre del usuario ingresado
   
        //para hacer la fecha en el comentario en tiempo real
        let today = new Date();
        let mes = parseInt(today.getMonth()+1); //hay que sumarle uno porque arranca del 0

        //para que queden con un 0 adelante, 01...09
        if(mes<10){
            mes= "0"+mes;
        }

        today = today.getFullYear()+'-'+mes+'-'+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        
        
        let htmlComentario = `  
        <div class="row">
        
        <div class="w-100 justify-content-between list-group-item list-group-item-action">
                 <p class="text-muted"><img src="https://es.calcuworld.com/wp-content/uploads/sites/2/2019/09/generador-de-nombres-de-usuario.png" alt="Avatar" class="avatar"> <strong>`+ user.userName + `</strong>` + " " + "(" + today + ")" +showRating(rating)+`</p>
                 <p> ` + texto + `</p>
                 
            
        </div>
  
        </div>
         
        `
        

        document.getElementById("comment").innerHTML += htmlComentario;
        

    });

    
});
