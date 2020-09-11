var prodInfo = {};
var prodComments = {};
var prodAll = {};

function showImagesGallery(array) {
    let htmlImg = "";
    for (let i = 0; i < array.length; i++) {
        let imagenes = array[i];
        htmlImg += `<div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
        <img  class="img-fluid img-thumbnail" src="`+ imagenes + `"alt=""> 
        </div>
        </div>`
        document.getElementById("productImagesGallery").innerHTML = htmlImg;
    }


}

function showRelatedProducts(array) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodAll = resultObj.data;
            let htmlRelatedProds = "";
            for (let i = 0; i < array.length; i++) {
                let related = prodAll[array[i]];
                htmlRelatedProds += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedProdImg" class= "row">
                        <img class="img-fluid p-2" src="`+ related.imgSrc + `">                                              
                    </div>                   
                    <div "relatedProdInfo" class= "row p-2">
                    <p>`+ related.name + `</p> 
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

function showRating(rating) {
    let htmlScore = "";
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<i class="fa fa-star checked"></i>`;
        } else {
            stars += `<i class="fa fa-star"></i>`;
        }
    }
    htmlScore = `<span> ${stars} </span>`
    return htmlScore;
}

function showComments() {
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


function add(starNum) {
    //la llamamos en showNewComment() onclick

    for (var i = 1; i <= 5; i++) {
        var current = document.getElementById("star" + i)
        current.className = "fa fa-star"
    }

    for (var i = 1; i <= starNum; i++) {
        var current = document.getElementById("star" + i)
        if (current.className == "fa fa-star") {
            current.className = "fa fa-star checked"
        }
    }
    
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

            // completar la funcion mostrando la informacion en el html de videogames-info
            prodName.innerHTML += prodInfo.name;
            prodCost.innerHTML += prodInfo.currency + " " + prodInfo.cost;
            prodDesc.innerHTML += prodInfo.description;
            prodCat.innerHTML += prodInfo.category;
            prodSold.innerHTML += prodInfo.soldCount;


            //Muestro las imagenes en forma de galería
            showImagesGallery(prodInfo.images);
            //Muestro los productos relacionados
            showRelatedProducts(prodInfo.relatedProducts);
            //Caja para nuevo comentario
           // showNewComment();
            //Muestro los comentarios con el rating
            showComments();

        }
    });
    document.getElementById("enviar").addEventListener("click", function(){
     
        let texto = document.getElementById("textArea").value;
        let user = JSON.parse(localStorage.getItem("usuarioActual")); //para obtener el nombre del usuario ingresado
   

        let today = new Date();
        let mes = parseInt(today.getMonth()+1);

        //para que queden con un 0 adelante, 01...09
        if(mes<10){
            mes= "0"+mes;
        }

        today = today.getFullYear()+'-'+mes+'-'+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        
        let htmlComentario = `  
        <div class="row">
        
        <div class="w-100 justify-content-between list-group-item list-group-item-action">
                 <p class="text-muted"><img src="https://es.calcuworld.com/wp-content/uploads/sites/2/2019/09/generador-de-nombres-de-usuario.png" alt="Avatar" class="avatar"> <strong>`+ user.userName + `</strong>` + " " + "(" + today + ")" + `</p>
                 <p> ` + texto + `</p>
                 
            
        </div>
  
        </div>
         
        `
        document.getElementById("comment").innerHTML += htmlComentario;
        document.getElementById("textArea").innerHTML = " ";

    });
});
