//login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function () {
	firebase.auth().signInWithPopup(provider).then(function (result) {
		console.log(result.user); //obserador de un boton
		guardaDatos(result.user);
		$('#login').hide();
		$('#root').append("<img src='" + result.user.photoURL + "' />");
		$('#root').append("<p> " + result.user.displayName + " </p>");

	});

});

/*$('#login').click(function(){
   firebase.auth().signInWithPopup(provider);
});

auth.onAuthStateChanged( function(firebaseUser){
    console.log(firebaseUser);//obserador de un boton
    guardaDatos(result.firebaseUser);
    $('#login').hide();
    $('#root').append("<img src='"+firebaseUser.photoURL+"' />");
    $('#root').append("<p> "+firebaseUser.displayName+" </p>");
  });*/

//esta funcion guarda los adatos automaticamente
function guardaDatos(user) {
	var usuario = {
		uid: user.uid,
		nombre: user.displayName,
		email: user.email,
		foto: user.photoURL
	}
	firebase.database().ref("server1/" + user.uid)
		.set(usuario)
}
//escribir en la BD
/*$('#guardar').click(function(){
  firebase.database().ref("bolsa")
  .set({
    nombre:"Lillys",
    edad:"25",
    sexo:"none"
  })
});*/

//aqui estoy leyendo de la BD
firebase.database().ref("server1")
	.on("child_added", function (s) {
		var user = s.val();
		$('#root').append("<img width='100px' src='" + user.foto + "' />");
		$('#root').append("<p> " + user.nombre + " </p>");
	})

// Fin de login
