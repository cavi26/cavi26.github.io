//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(produ => {
        infoProductos = produ.data;
        let htmlContentToAppend = '';
        for (info of infoProductos) {
            htmlContentToAppend += `
            <a href="products.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + info.imgSrc + `" alt="` + info.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ info.name +`</h4>
                            <small class="text-muted">` + info.soldCount+ ` artículos</small>
                        </div>
                        <p class="mb-1">` + info.description + `</p>
                        <p class="mb-1"> Costo: $ ` + info.cost + '' + info.currency + `</p>
                    </div>

                </div>
            </a>  `
        }
        document.getElementById ('lista_de_productos').innerHTML = htmlContentToAppend
    });
});