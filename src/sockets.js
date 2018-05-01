// Aceptaremos las conexiones con el socket.
module.exports = function (io) {

  io.on('connection', socket => {
    console.log('New user connected');

    // Envio de mensajes.
    socket.on('send message', function (data) {
      // Emitimos a todos los sockets.
      io.sockets.emit('new message', data);
    });

  });

}
