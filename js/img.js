window.onload = inicializar;
var fichero;
var storageRef;
var imgenesFBRef;

function inicializar(){
  fichero = document.getElementById("fichero");
  fichero.addEventListener("change", subirImagenAFirebase, false);
  storageRef = firebase.storage().ref();

  imgenesFBRef = firebase.database().ref().child("imagenesFB");

  mostrarImagenesDeFirebase();
}

// Para mostrar las imagenes
function mostrarImagenesDeFirebase(){
  imgenesFBRef.on("value", function(snapshot){
    var datos = snapshot.val();
    var result = "";    
    for(var key in datos){
      result = '<img width="200" class="img-trumbnail" src="' + datos[key].url + '"/>';
    }
    document.getElementById("imagenFirebase").innerHTML = result;
  })  
}

// subir imagen a Firebase
function subirImagenAFirebase(){
  var imagenASubir = fichero.files[0];

  var uploadTask = storageRef.child('img/' + imagenASubir.name).put(imagenASubir);
  

  uploadTask.on('state_changed', 
  function(snapshot){
    // Se va mostrando el progreso de la subida de la imagen
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Gestionar el error si se produce
  alert("hubo un error")
}, function() {
  // Cuando se ha sibido exitosamente la imagen
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    // Mostrar la imagen subida
  crearNodoEnBDFirebase(imagenASubir.name ,downloadURL)
  });
});
}

function crearNodoEnBDFirebase(nombreImagen, downloadURL){
  imgenesFBRef.push({ nombre: nombreImagen, url: downloadURL});
}