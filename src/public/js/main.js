// Client part Application.
$(function() {

  // Mantiene la conexion con el socket en tiempo real.
  const socket = io();

  // Obteniendo los elementos del DOM desde la interfaz.
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  // Obteniendo los elementos del DOM desde el nicknameForm.
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');

  const $users = $('#usernames');

  // Evento: login.
  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $nickname.val(), data => {
      if(data) {
        $('#nickWrap').hide();
        $('#contentWrap').show();
      } else {
        $nickError.html(`
          <div class="alert alert-danger">That username already exits.</div>
        `);
      }
      $nickname.val('');
    });
  })

  // Events.
  $messageForm.submit( e => {
    e.preventDefault();
    // Evento: enviar mensajes.
    socket.emit('send message', $messageBox.val(), data => {
      $chat.append(`<p class="error">${data}</p>`);
    });
    $messageBox.val('');
  });

  // Evento: recibir mensajes.
  socket.on('new message', function (data) {
    $chat.append('<b>' + data.nick + ': ' + '</b>' + data.msg + '<br />');
  });

  // Evento: usuarios conectados.
  socket.on('usernames', data => {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`;
    }
    $users.html(html);
  });

  socket.on('whisper', data => {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
  });

  socket.on('load old msgs', msgs => {
    for (let i = 0; i < msgs.length; i++) {
      displayMsg(msgs[i]);
    }
  });

  function displayMsg(data) {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
  }

})
