function swalmessage() {
  // para dar mensaje de success
  swal("Yei!", "Ya son amigos!", "success");
}

// para que lea e inicialice todo
$(document).ready(function () {
  $('#ready').click(swalmessage);
  $('#ready1').click(swalmessage);
  $('#ready2').click(swalmessage);
  $('#ready3').click(swalmessage);
  $('#ready4').click(swalmessage);
  $('#ready5').click(swalmessage);
});