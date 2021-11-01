//creo las variables con sus respectivos id

let nombre = document.getElementById("name");
let apellidos = document.getElementById("apellido");
let edad = document.getElementById("edad");
let email = document.getElementById("mail");
let telefono = document.getElementById("tel");




//creo funcion que se encargara de tomar los datos del usuario
// en un objeto los tranforma o no?
function datos() {

    let usuario = {}; // usuario se encarga de guardar a todos los datos en un objeto unico
   
    usuario = {
        "nombre": nombre.value,
        "apellidos": apellidos.value,
        "edad": edad.value,
        "email": email.value,
        "telefono": telefono.value,
        
    }
    localStorage.setItem("datos", JSON.stringify(usuario)); // coloca el objeto en el localstorage, en forma de json
}

document.getElementById("save").addEventListener('click', function () {
    datos(); //Cuando se hace click en el boton guardar, guarda los cambios
})

//Funcion que trae los datos guardados en el localstorage y los muestra
function perfilInfo() {
    let usuario = localStorage.getItem("datos"); //usuario toma el item (datos) dentro de local storage
    let cambios = JSON.parse(usuario); // analiza gramaticamente la cadena en un objeto JS

    nombre.value = cambios.nombre;
    apellidos.value = cambios.apellidos;
    edad.value = cambios.edad;
    email.value =  cambios.email;
    telefono.value =cambios.telefono;
   
}

document.addEventListener("DOMContentLoaded", function (e) {
    perfilInfo();
}); //carga la info de perfil





function cargarNombreUsuarioProfile(){

    //Obtengo el valor previamente guardado desde el almacen del navegador
    nombreUsuario = window.localStorage.getItem('userName');
    
    //Lo inserto dentro de un span que cree dentro del body de products.html
    document.getElementById('spanUsuarioProfile').innerHTML = nombreUsuario;

}