const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); // Http Socket.
const io = socketio.listen(server);

//settings
app.set('port', process.env.PORT || 3000);

// sockets.js
require('./sockets')(io);

// Enviamos la carpeta public cada vez que un usuario entra.
// static files.
app.use(express.static(path.join(__dirname, 'public'))); // Ruta completa??

// Ejecuta un server.
// Ejecutamos una funcion al iniciar la app.
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
