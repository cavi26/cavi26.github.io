//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var cart = [];
var envio = 0;

//Subtotal de todos los productos sumados
//Funcion de subtotal del cuadradito, la que se suma con el costo de envio para el total
function Subtotal() {
  var costoTotal = 0;

  for (var i = 0; i < cart.articles.length; i++) {
    var item = cart.articles[i];
    costoTotal += item.unitCost * item.count;
  }

  document.getElementById("subtotal").innerHTML = costoTotal;
}

//Funcion que calcula el costo de envio
function costoEnvio(tasaEnvio) {
  var costoTotal = 0;
 //Calculo de nuevo el subtotal para despues hacer el porcentaje
  for (var i = 0; i < cart.articles.length; i++) {
    var item = cart.articles[i];
    costoTotal += item.unitCost * item.count;

  }
  document.getElementById("costoEnvio").innerHTML = Math.round(costoTotal * tasaEnvio); //lo multiplico por el porcentaje segun que envio elija
  costoTotal += Math.round(costoTotal * tasaEnvio); // calculo el total de todo
  envio = tasaEnvio
  document.getElementById("envioTotal").innerHTML = costoTotal;



}
//Funcion que modifica el precio segun la cantidad de productos en la parte de arriba
function subtotalPorProducto(i) {
  var cantidad = document.getElementById(i).value;
  var total = "USD" + cart.articles[i].unitCost * cantidad;
  cart.articles[i].count = cantidad;
  document.getElementById('costo' + i).innerHTML = total;
  Subtotal();
}

//Funcion que muestra el precio de los objetos
function Precio() {
  for (var i = 0; i < cart.articles.length; i++) {
    let carrito = cart.articles[i]; {
      if (carrito.currency === "UYU") {
        carrito.unitCost = (carrito.unitCost / 40).toFixed(1);
      } //ESTE IF LO QUE HACE ES QUE SI CURRENCY ES IGUAL A URU LO DIVIDA EN 40 PARA PASARLOS A DOLARES
    }
  }
}

function quitar(array) {
  cart.articles.splice(array, 1);
  productosDelCarrito(cart)
}


//Funcion que muestra las cosas del carrito en html
function productosDelCarrito(array) {
  var contenido = document.getElementById('carrito')
  var htmlContentToAppend = ""

  contenido.innerHTML = htmlContentToAppend;



  htmlContentToAppend += `
    <div>
       
    <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col" style="align-right">Precio</th>
        <th></th> 
      </tr>
    </thead>
    </div>
      `

  for (var i = 0; i < array.articles.length; i++) {
    let carrito = array.articles[i]; {



      htmlContentToAppend += `
      <tbody>
       <td>
      <img src="${carrito.src}" width="70" height="70"  class="sc-product-image"/>
      </td>
      <td><h3><b>${carrito.name}</b></h3></td>
      <td>
        <input type="number" id="${i}" value="${carrito.count}" min="1" onchange="subtotalPorProducto(${i})">
      </td>
      <td><h4 id="costo${i}">USD ${carrito.unitCost * carrito.count}</h4></td>
      <td><button type="button" class="btn btn-outline-danger" onclick="quitar(${i}); "
      <i class="fa fa-trash"></i>Quitar de Carrito</button> 
      </td>
      </tbody>
      
      `



    }

  }
  htmlContentToAppend += `<td></td>
        `

  contenido.innerHTML = htmlContentToAppend;
  Subtotal();

}



function borrar() {
  formaDePago=document.getElementById("formaPago");
  formaDePago.classList.remove("is-invalid");
  formaDePago.classList.remove("rojo");
}

// Controles de envio 
document.getElementById('compraRealizada').addEventListener("click",function(){
       
  var numero=document.getElementById("inputNumber"); 
  var direccion=document.getElementById("inputCalle");
  var esquina=document.getElementById("inputEsq"); 
  var formaDePago=document.getElementById("formaPago");
  

        direccion.classList.remove("is-invalid");
        numero.classList.remove("is-invalid");
        esquina.classList.remove("is-invalid");
        formaDePago.classList.remove("is-invalid");
        formaDePago.classList.remove("rojo");
     
         if (direccion.value==="") { 
           direccion.classList.add("is-invalid");                         
         } 
         else {
           direccion.classList.add("is-valid");
         }
         if (numero.value==="") {
           numero.classList.add("is-invalid");
         }
         else {
           numero.classList.add("is-valid");
         }

         if (esquina.value==="") {
           esquina.classList.add("is-invalid");
         }
         
         else{          
           esquina.classList.add("is-valid");
         }
         
         if (formaDePago.textContent ==="-Seleccione una forma de pago-"){
          formaDePago.classList.add("is-invalid");
          formaDePago.classList.add("rojo");
         }
        else {
           formaDePago.classList.add("is-valid")
         }
      
  });


// Funcion que carga el JSONData que muestra los productos que van en el carrito
document.addEventListener("DOMContentLoaded", function (e) {
  fetch(" https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(resultObj => resultObj.json())
    .then(data => {
      cart = data
      Precio();
      productosDelCarrito(cart);
    }
    )
})

//esta función se dispara desde la etiqueta <body> de cart.html con el evento onload;
function cargarNombreUsuarioCart() {

  //Obtengo el valor previamente guardado desde el almacen del navegador
  nombreUsuario = window.localStorage.getItem('userName');

  //Lo inserto dentro de un span que cree dentro del body de cart.html
  document.getElementById('spanUsuarioCart').innerHTML = nombreUsuario;

}