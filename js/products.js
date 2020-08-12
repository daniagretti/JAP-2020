var arrayProducts = [];

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];
        //html a insertar:
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
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

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayProducts = resultObj.data;
            showProductsList(arrayProducts);
        }
    });
});
