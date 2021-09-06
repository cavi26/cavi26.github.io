//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});

//esta función se dispara desde la etiqueta <body> de cart.html con el evento onload;
function cargarNombreUsuarioCart(){

    //Obtengo el valor previamente guardado desde el almacen del navegador
    nombreUsuario = window.localStorage.getItem('userName');
    
    //Lo inserto dentro de un span que cree dentro del body de cart.html
    document.getElementById('spanUsuarioCart').innerHTML = nombreUsuario;
    
}