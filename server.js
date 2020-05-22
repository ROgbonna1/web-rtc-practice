var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const path = require('path');

app.use(express.static('public'));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(3030, () => console.log('running...'));

io.on('connection', (socket) => {

  socket.on('my-room', (room) => {
    socket.room = room;
    socket.join(room)
  });

  socket.on('signal', (data) => {
    console.log('Signal from peer: ', socket.id);
    io.to(socket.room).emit('signal', data)
  });

});