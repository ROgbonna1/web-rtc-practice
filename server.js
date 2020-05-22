var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var p2p = require('socket.io-p2p-server').Server;

io.use(p2p);
const path = require('path');

app.use(express.static('public'));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(3030, () => console.log('running...'));

io.on('connection', (socket) => {
  socket.on('peer-msg', (data) => {
    console.log('Message from peer: %s', data);
    socket.broadcast.emit('peer-msg', data)
  });

  socket.on('go-private', (data) => {
    socket.broadcast.emit('go-private', data)
  });
});