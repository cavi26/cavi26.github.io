const ORDER_ASC_BY_PRICE = "🔼$" ; // Ordena por precio ascendente
const ORDER_DESC_BY_PRICE = "🔽$" ;// Ordena por precio descendente
const RELEVANCIA = "Cant.";// Ordena por relevancia

var currentProductsArray = [];
var currentSortCriteria = undefined;
var productsArray;

var minCount = undefined;
var maxCount = undefined;







// Funcion que cree muestra la lista del html
function showProduList(){
 
    if (((minCount == undefined) || (minCount != undefined && parseInt(info.cost) >= minCount)) &&
    ((maxCount == undefined) || (maxCount != undefined && parseInt(info.cost) <= maxCount))) 
    {
        var html = `
        <a href="product-info.html" class="list-group-item list-group-item-action">
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
        </a>  `;
    }

    return html;
}



//Clasificar productos//
//Funcion sortProducts lo que hace es claficar los productos segun sus precios los primeros dos if y como ultimo, se clasifica por su relevancia
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1;} //Si a es menor que b, devuelve -1, sort deja el numero de a antes que el de b
            if (a.cost > b.cost) {return 1; } // Acá lo que hace sort es lo contrario a lo de arriba
            return 0; // Devuelve 0 siambos a y b son iguales
    
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {return -1;}
            if (a.cost < b.cost) { return 1;}
            return 0;
        });
    } else if (criteria === RELEVANCIA) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) {return -1;}
            if (aCount < bCount) {return 1; }
            return 0;
        });
    }

    return result;
}
 


//Funcion que llama para ordenar y mostrar la lista 
// sortCriteria es alguna de las constantes 
function sortAndShowProducts(sortCriteria, productsArray) {
   
    //currentSortCriteria es una variable globlal
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    // Agregue una variable htmlContent en donde voy a poner el html reordenado 
    let htmlContent = '';
   // Recorre la lista de productos reordenada y llamo a la funcion showProductList para que la inserte a dentro de la lista de productos
    for(info of currentProductsArray){

        htmlContent += showProduList();
    }
    
    document.getElementById ('lista_de_productos').innerHTML = htmlContent; //Le inserto el htmlContent que ya tiene el id con la lista reordenada
}
    
 
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
   
    getJSONData(PRODUCTS_URL).then(produ => {
        
        infoProductos = produ.data;
        productsArray = infoProductos;
       
         let htmlContentToAppend = '';

        for (info of infoProductos) {

            htmlContentToAppend += showProduList();
        }

        document.getElementById ('lista_de_productos').innerHTML = htmlContentToAppend
    });

     // Hace que cuando se haga click en el boton que realice en el html con el Id Asd, hace que se dispare la funcion que muestra y ordena de manera ascendente los productos
    document.getElementById("Asc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });
     // Hace que cuando se haga click en el boton que realice en el html con el Id Desc, hace que se dispare la funcion que muestra y ordena de manera descendente los productos

    document.getElementById("Desc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });
      // Hace que cuando se haga click en el boton que realice en el html con el Id ByCount, hace que se dispare la funcion que muestra y ordena de manera de relevancia los productos

    document.getElementById("ByCount").addEventListener("click", function(){
        sortAndShowProducts(RELEVANCIA, productsArray);
    });
     // Hace que cuando se haga click en el boton que realice en el html con el Id clearRangeFilter, hace que se dispare la funcion que muestra ahi que hace que vuelvan a quedar vacio los 

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";

        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

    
        showProduList();
       
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoria.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        console.log('min: ' + minCount + ", max: " + maxCount);

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        //// Agregue una variable htmlContentForPrice en donde voy a poner el html reordenado 
        let htmlContentForPrice = '';
         // Recorre la lista de productos reordenada y llamo a la funcion showProductList para que la inserte a dentro de la lista de productos
        for(info of productsArray){
            
            htmlContentForPrice += showProduList();

        }
    
        document.getElementById ('lista_de_productos').innerHTML = htmlContentForPrice; //Le inserto el htmlContent que ya tiene el id con la lista reordenada
       
    });
});




//esta función se dispara desde la etiqueta <body> de products.html con el evento onload;
function cargarNombreUsuarioProducts(){

    //Obtengo el valor previamente guardado desde el almacen del navegador
    nombreUsuario = window.localStorage.getItem('userName');
    
    //Lo inserto dentro de un span que cree dentro del body de products.html
    document.getElementById('spanUsuarioProducts').innerHTML = nombreUsuario;
    
}