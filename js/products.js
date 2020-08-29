var arrayProducts = [];
const precio_asc = "AZ";
const precio_desc = "ZA";
const relevancia_desc = "Relevancia";
var minPrecio;
var maxPrecio;
var currentSortCriteria;
var prods = [];

//filtrado de busqueda
function busqueda(prods) {
    var input = document.getElementById("buscador");
    var filtro = input.value.toUpperCase();

    for (let i = 0; i < prods.length; i++) {
        if (prods[i].dataset.filterName.toUpperCase().includes(filtro) || prods[i].dataset.filterDesc.toUpperCase().includes(filtro)) {
            prods[i].parentNode.style.display = "";
        } else {
            prods[i].parentNode.style.display = "none";
        }
    }
}

function sortPrecios(criterio, array) {
    let result = [];
    if (criterio === precio_asc) { //ordeno los precios de menor a mayor
        result = array.sort(function (a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);
            if (aPrecio < bPrecio) { return -1; }
            if (aPrecio > bPrecio) { return 1; }
            return 0;
        });
    }else if (criterio === precio_desc){ //ordeno los precios de mayor a menor
        result = array.sort(function (a, b){
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);
            if (aPrecio > bPrecio) { return -1; }
            if (aPrecio < bPrecio) { return 1; }
            return 0;
        });
    }else if (criterio === relevancia_desc) { //ordeno por relevancia (vendidos) de mayor a menor
        result = array.sort(function (a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);
            if (aRel > bRel) { return -1; }
            if (aRel < bRel) { return 1; }
            return 0;
        });
    }
    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProducts.length; i++) {
        let products = arrayProducts[i];
        //para que los muestre de acuerdo a 
        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(products.cost) >= minPrecio)) &&
            ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(products.cost) <= maxPrecio))) {
            //html a insertar:
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row" data-filter-name="`+ products.name + `"data-filter-desc="` + products.description + `">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name + `</h4>
                            <small class="text-muted"> precio ` + products.currency + " " + products.cost + `</small>
                        </div>
                        <div> 
                            <p>`+ products.description + ` </p>
                        </div>
                    </div>
                </div>
            </div>
            `

            document.getElementById("lista_productos").innerHTML = htmlContentToAppend;
        }
    }
}

function sortAndShowProducts(sortCriteria, prodArray){
    currentSortCriteria = sortCriteria;

    if(prodArray != undefined){
        arrayProducts = prodArray;
    }

    arrayProducts = sortPrecios(currentSortCriteria, arrayProducts);

    //Muestro los productos ordenados
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayProducts = resultObj.data;
            showProductsList(arrayProducts);
        }
        prods = document.getElementById("lista_productos").getElementsByClassName("row");
    });
    //cuando haga click en el correspondiente, que muestre la lista de productos ordenada en funcion a ese criterio
    document.getElementById("sortPreciosAsc").addEventListener("click", function(){
        sortAndShowProducts(precio_asc);
    });
    document.getElementById("sortPreciosDesc").addEventListener("click", function(){
        sortAndShowProducts(precio_desc);
    });
    document.getElementById("sortRelevancia").addEventListener("click", function(){
        sortAndShowProducts(relevancia_desc);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        showProductsList();
    });
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        
        minPrecio = document.getElementById("rangeFilterCostMin").value;
        maxPrecio = document.getElementById("rangeFilterCostMax").value;

        if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
            minPrecio = parseInt(minPrecio);
        }
        else{
            minPrecio = undefined;
        }

        if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
            maxPrecio = parseInt(maxPrecio);
        }
        else{
            maxPrecio = undefined;
        }

        showProductsList();
    });
       //buscador
    document.getElementById("buscador").addEventListener("keyup", function () {
        busqueda(prods);

    });

});
