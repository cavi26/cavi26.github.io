var productinfo = {};
var comentarios = {}; 
var products = {};
var productlist = {};
// Funcion que muestra las imagenes, en forma de carrusel
function showInfoProduct(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i == 0) {
            htmlContentToAppend = ` <div class="carousel-item active">
        <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>`
        } else {
            htmlContentToAppend += ` <div class="carousel-item">
       <img src="` + imageSrc + `" class="d-block w-100" alt="...">
       </div>`

        }

        document.getElementById("ImageInfoProducts").innerHTML = htmlContentToAppend;


    }
} //Finaliza el carrusel



// Funcion que carga el JSONData que muestra toda la pagina, desde las ima, info y los comentarios
function comentariocargar() {
    getJSONData(PRODUCTS_URL).then (function(resultObj2) {
    if (resultObj2.status === "ok") {
        productlist = resultObj2.data //trae la lista de productos para sacar los relacionados

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productinfo = resultObj.data;
            // console.log(productinfo)

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productinfoHTML = document.getElementById("categoria");
            

            categoryNameHTML.innerHTML = productinfo.name;
            categoryDescriptionHTML.innerHTML = productinfo.description;
            productCountHTML.innerHTML = productinfo.cost;
            productCriteriaHTML.innerHTML = productinfo.soldCount;
            productinfoHTML.innerHTML = productinfo.category;
           

            //Muestro las imagenes en forma de galería
            showInfoProduct(productinfo.images);
            mostrarProductsRelacionados (productinfo.relatedProducts) //muestra los relacionados
        }
    });
            
        }
    });

     
 




    // carga los comentarios guardados en el JSONData que muestra los comentarios ya realizados 
   // Json.parce lo que hace es convertir la cadena en un objeto y asi guardarlos en "datos" y asi sera mas facil agregar el comentario nuevo

     comentarios = JSON.parse(localStorage.getItem("datos"));
            console.log(comentarios);
         
            let htmlContentToAppend = "";
        for (let i = 0; i < comentarios.length; i++) {
            let com = comentarios[i];
             //Este pone el punto adelante de cada comentario
            htmlContentToAppend += `
                    
                    <ul class="comments-list">
                    <li>
                    <div class="mail-level">`
                    //Esta carga el nombre de usurios y la fecha del url PRODUCT_INFO_COMMENTS_URL
            htmlContentToAppend += `
                        <div class="box">
                        <div class="head-box">
                        <h6 class="comment-name by-author"><a href="">` + com.user + `</a></h6>
                            <span>` + com.dateTime + `&nbsp; &nbsp;</span>`;
              //Este marca la calificacion 
            htmlContentToAppend += `<span><form action="">`;
            for (let i = 1; i <= 5; i++) {
                if (com.score != i)
                    htmlContentToAppend += ` <input type="radio"name="` + i + `" class="star star` + i + `" id="star` + i + `"disabled><label for="star` + i + `" class="star star` + i + `"></label>`;
                else
                    htmlContentToAppend += `<input type="radio"name="` + i + `" class="star star` + i + `" id="star` + i + `" checked disabled><label for="star` + i + `" class="star star` + i + `"></label>`;
            }
            //Este muesta el comentario que realizo el usuario
            htmlContentToAppend += `<br></form></span>
                             </div>
                        <div class="content">
                            ` + com.description + `
                        </div>
                        </div>
                    </div>
                    </li>
                    </ul>
                
                    `
            document.getElementById("comentarios").innerHTML = htmlContentToAppend;

            }
        }

       


document.addEventListener("DOMContentLoaded", function (e) {
    comentariocargar();

    
  });
  

 
document.getElementById("comentar").addEventListener("click", function (e) {
    e.preventDefault();
    let descrip = document.getElementById('AgregaComen').value;
    // Agrupando todos los radios en radioGroup 
    let radioGroup = document.getElementsByName('star');
    let dataScore = 0;

    let d = new Date();
    let fechaHora = d.toString();
    let formatFecha = fechaHora.replace(fechaHora.substring(fechaHora.lastIndexOf(":") + 3, fechaHora.length), "");

    // recorriendo el radio group para detectar elemento marcado
    for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
            dataScore = radioGroup[i].value;

            console.log("radio valor chekeado "+dataScore);
            // desmarcar el radio button
            radioGroup[i].checked = false;
        }
    }
    // alert(dataScore);
    let newcomentario = {
        "score": dataScore,
        "description": descrip,
        "user": localStorage.getItem('userName'),
        "dateTime": formatFecha
    };

    // Agregar nuevo comentario al array comentarios
    comentarios.push(newcomentario);
    // //El siguiente código accede al objeto local Storage actual y agrega un ítem al mismo usando setItem().
    // Actualizar localestarage con nuevo comentario
    localStorage.setItem("datos", JSON.stringify(comentarios));
    comentariocargar();
    document.getElementById('AgregaComen').value = "";


});
// funcion que muestra los relacionados
function mostrarProductsRelacionados(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){
        let inforelacionados = array[i];
        htmlContentToAppend += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${productlist[inforelacionados].imgSrc}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${productlist[inforelacionados].name}</h5>
          <p class="card-text">${productlist[inforelacionados].description}</p>
          <a href="#" class="btn btn-primary">${productlist[inforelacionados].currency} ${productlist[inforelacionados].cost}</a>
        </div>
      </div> `
        
        
        
    }
    document.getElementById("relatedProducts").innerHTML =htmlContentToAppend
}

//esta función se dispara desde la etiqueta <body> de products.html con el evento onload;
function cargarNombreUsuarioProducts(){

    //Obtengo el valor previamente guardado desde el almacen del navegador
    nombreUsuario = window.localStorage.getItem('userName');
    
    //Lo inserto dentro de un span que cree dentro del body de products.html
    document.getElementById('spanUsuarioProductsinfo').innerHTML = nombreUsuario;

}

