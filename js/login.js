// Login

//login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
  firebase.auth().signInWithPopup(provider).then(function(result){
    console.log(result.user);//obserador de un boton
    guardaDatos(result.user);
    $('#login').hide();
    $('#root').append("<img src='"+result.user.photoURL+"' />")
  });

});

//esta uncion guarda los adatos automaticamente
function guardaDatos(user){
  var usuario = {
    uid:user.uid,
    nombre:user.displayName,
    email:user.email,
    foto:user.photoURL
  }
  firebase.database().ref("server/" + user.uid)
  .set(usuario)
}
//escribir en la BD
$('#guardar').click(function(){
  firebase.database().ref("bolsa")
  .set({
    nombre:"Lillys",
    edad:"25",
    sexo:"none"
  })
});

//aqui estoy leyendo de la BD
firebase.database().ref("server")
.on("child_added", function(s){
  var user = s.val();
  $('#root').append("<img width='100px' src='"+user.foto+"' />")
})

// Fin de login

(function(){
	// Variables
	var lista = document.getElementById("list_text"),
		tareaInput = document.getElementById("text_post"),
		btnNuevaTarea = document.getElementById("btn_agregar");
 
  // Funciones
  
  // funcion para agregar post
	var agregarTarea = function(){
		var tarea = tareaInput.value,
			nuevaTarea = document.createElement("li"),
			enlace = document.createElement("a"),
			contenido = document.createTextNode(tarea);
 
		if (tarea === "") {
			tareaInput.setAttribute("placeholder", "Agrega una tarea valida");
			tareaInput.className = "error";
			return false;
		}
 
		// Agregamos el contenido al enlace
		enlace.appendChild(contenido);
		// Le establecemos un atributo href
		enlace.setAttribute("href", "#");
		// Agrergamos el enlace (a) a la nueva tarea (li)
		nuevaTarea.appendChild(enlace);
		// Agregamos la nueva tarea a la lista
		lista.appendChild(nuevaTarea);
 
		tareaInput.value = "";
 
		for (var i = 0; i <= lista.children.length -1; i++) {
			lista.children[i].addEventListener("click", function(){
				this.parentNode.removeChild(this);
			});
		}
 
  };
  // Comprobar que el input tenga texto
	var comprobarInput = function(){
		tareaInput.className = "";
		teareaInput.setAttribute("placeholder", "Agrega tu tarea");
	};
 
  // Eliminar post
	var eleminarTarea = function(){
		this.parentNode.removeChild(this);
	};
 
	// Eventos
 
	// Agregar Tarea
	btnNuevaTarea.addEventListener("click", agregarTarea);
 
	// Comprobar Input
	tareaInput.addEventListener("click", comprobarInput);
 
	// Borrando Elementos de la lista
	for (var i = 0; i <= lista.children.length -1; i++) {
		lista.children[i].addEventListener("click", eleminarTarea);
	}
}());


function subir(){
	var i=document.getElementById('fileUp-input');

	if(window.FileReader){
			for(var j=0;j<i.files.length;j++){//como mi input file es múltiple, recorro sus elementos (archivos) que pueden ser varios
					var reader = new FileReader();//instanciamos FileReader
					reader.onloadend = (function(f){//creamos la función que recogerá los datos
							return function(e){
									var content = e.target.result.split(",",2)[1];//obtenemos el contenido del archivo, estará codificado en Base64
									enviarArchivo(f.name,content); //le paso a una función el nombre del archivo y su contenido. Esta función puede pasar el contenido por ajax u otro medio al servidor
							}
					})(i.files[j]);
					reader.readAsDataURL(i.files[j]);//
			}
	}
}