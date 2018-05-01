// Aceptaremos las conexiones con el socket.
module.exports = function (io) {

  let nicknames = [
    'Usuario1',
    'Usuario2',
    'Usuario3'
  ];

  io.on('connection', socket => {
    console.log('New user connected');

    socket.on('new user', (data, cb) => {
      console.log(data);
      if(nicknames.indexOf(data) != -1) {
        cb(false);
      } else {
        cb(true);
        // Guardamos el usuario tanto en el socket como en el array nicknames.
        socket.nickname = data;
        nicknames.push(socket.nickname);
        updateNicknames();
      }
    });

    // Envio de mensajes.
    socket.on('send message', data => {
      // Emitimos a todos los sockets.
      io.sockets.emit('new message', {
        // Mandamos tanto el usuario como el mensaje dentro de un objeto.
        msg:data,
        nick: socket.nickname
      });
    });

    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      updateNicknames();
    });

    // Emitimos el array de usuarios hacia todos los sockets.
    function updateNicknames() {
      io.sockets.emit('usernames', nicknames);
    }

  });

}
