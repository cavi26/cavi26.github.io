
//Para mostrar el nombre del usuario logeado en index.html
var nombreUsuario;

//esta función se dispara desde el button que está en login.html con el evento onclick
function usuario(){
	//obtengo el valor introducido por el usuario en el campo userName de login.html
	nombreUsuario = document.getElementById('userName').value;

  //Guardo ese valor en el almacen del navegador con el nombre 'userName' para después poder leerlo
  window.localStorage.setItem('userName', 'Bienvenido ' + nombreUsuario);
}

