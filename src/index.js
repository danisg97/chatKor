const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app); // Http Socket.
const io = socketio.listen(server);

// db connection.
mongoose.connect('mongodb://localhost/chat-database')
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);

// sockets.js
require('./sockets')(io);

// Enviamos la carpeta public cada vez que un usuario entra.
// static files.
app.use(express.static(path.join(__dirname, 'public')));

// Ejecuta un server.
// Ejecutamos una funcion al iniciar la app.
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
