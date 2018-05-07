// Server part Application.

// Importamos el Schema de los datos.
const Chat = require('./models/Chat');

// Aceptaremos las conexiones con el socket.
module.exports = function (io) {

  let users = {};

  io.on('connection', async socket => {
    console.log('New user connected');

    let messages = await Chat.find({}).limit(8);

    socket.emit('load old msgs', messages);

    socket.on('new user', (data, cb) => {
      console.log(data);
      if(data in users) {
        cb(false);
      } else {
        cb(true);
        // Guardamos el usuario tanto en el socket como en el array nicknames.
        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });

    socket.on('new registry', (data) => {
      console.log("Datos CONSOLE.LOG recibidos correctamente");
    });

    // Envio de mensajes.
    socket.on('send message', async (data, cb) => {
      // Eliminamos los espacios en blanco del String.
      var msg = data.trim();

      if (msg.substr(0, 3) === '/w ' ) {
        msg = msg.substr(3);
        const index = msg.indexOf(' ');
        if (index !== -1) {
          // Usuario y mensaje.
          var name = msg.substr(0, index);
          var msg = msg.substr(index + 1);
          if (name in users) {
            users[name].emit('whisper', {
              msg,
              nick: socket.nickname
            });
          } else {
            cb('Error! Enter a Valid User');
          }
        } else {
          cb('Error! Please enter your message');
        }
      } else {
        // Chat Object.
        var newMsg = new Chat({
          msg,
          nick: socket.nickname
        });
        await newMsg.save();

        io.sockets.emit('new message', {
          msg:data,
          nick: socket.nickname
        });
      }
    });

    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      delete users[socket.nickname];
      updateNicknames();
    });

    // Emitimos el array de usuarios hacia todos los sockets.
    function updateNicknames() {
      io.sockets.emit('usernames', Object.keys(users));
    }

  });

}
