// Client part Application.
$(function() {

const socket = io();

const $registerForm = $('#registerForm');

// Evento: register.
$registerForm.submit(e => {
  socket.emit('new registry', data => {
    console.log("Datos CONSOLE.LOG recibidos correctamente (register)");
  });
})

})
