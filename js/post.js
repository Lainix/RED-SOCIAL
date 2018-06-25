(function () {
	// Variables
	var lista = document.getElementById("list_text"),
		tareaInput = document.getElementById("text_post"),
		btnNuevaTarea = document.getElementById("btn_agregar");

	// Funciones

	// funcion para agregar post
	var agregarTarea = function () {
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

		for (var i = 0; i <= lista.children.length - 1; i++) {
			lista.children[i].addEventListener("click", function () {
				this.parentNode.removeChild(this);
			});
		}

	};
	// Comprobar que el input tenga texto
	var comprobarInput = function () {
		tareaInput.className = "";
		teareaInput.setAttribute("placeholder", "Agrega tu tarea");
	};

	// Eliminar post
	var eleminarTarea = function () {
		this.parentNode.removeChild(this);
	};

	// Eventos

	// Agregar Tarea
	btnNuevaTarea.addEventListener("click", agregarTarea);

	// Comprobar Input
	tareaInput.addEventListener("click", comprobarInput);

	// Borrando Elementos de la lista
	for (var i = 0; i <= lista.children.length - 1; i++) {
		lista.children[i].addEventListener("click", eleminarTarea);
	}
}());


function subir() {
	var i = document.getElementById('fileUp-input');

	if (window.FileReader) {
		for (var j = 0; j < i.files.length; j++) { //como mi input file es múltiple, recorro sus elementos (archivos) que pueden ser varios
			var reader = new FileReader(); //instanciamos FileReader
			reader.onloadend = (function (f) { //creamos la función que recogerá los datos
				return function (e) {
					var content = e.target.result.split(",", 2)[1]; //obtenemos el contenido del archivo, estará codificado en Base64
					enviarArchivo(f.name, content); //le paso a una función el nombre del archivo y su contenido. Esta función puede pasar el contenido por ajax u otro medio al servidor
				}
			})(i.files[j]);
			reader.readAsDataURL(i.files[j]); //
		}
	}
}