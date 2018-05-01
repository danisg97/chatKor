$(function() {

  // Mantiene la conexion con el socket en tiempo real.
  const socket = io();

  // Obteniendo los elementos del DOM desde la interfaz.
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  // Events.
  $messageForm.submit( e => {
    e.preventDefault();

    // Evento: enviar mensajes.
    socket.emit('send message', $messageBox.val());
    $messageBox.val('');
  });

  // Evento: recibir mensajes.
  socket.on('new message', function (data) {
    $chat.append(data + '<br />');
  });

})
