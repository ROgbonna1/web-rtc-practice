var P2P = require('socket.io-p2p');
var io = require('socket.io-client');
const SimplePeer = require('simple-peer')

var socket = io();
var opts = {autoUpgrade: true, numClients: 2}
var p2p = new P2P(socket, opts, () => console.log('Peers!'));
console.log('CONNECTED TO CLIENT SIDE JAVASCRIPT')

p2p.on('peer-msg', function (data) {
  console.log('From a peer %s', data);
});

console.log({socket})

socket.on('server-event', (data) => {
  console.log(data);
  socket.emit('response-event', 'This thing works.');
});

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  console.log('xxxxx')
  e.preventDefault();
  const text = e.target[0].value;
  // console.log(text);
  socket.emit('peer-msg', text);
})
// navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true
// }).then(gotMedia).catch(() => {})

// function gotMedia(stream) {
//   var opts = {autoUpgrade: false, numClients: 10};
//   var p2psocket = new P2P(socket, opts);

//   p2psocket.on('news', function(data) {
//     console.log(data);
//   });
  
//   p2psocket.on('go-private', function () {
//     p2psocket.upgrade(); // upgrade to peerConnection
//   });

//   const p = new SimplePeer({
//     initiator: window.location.hash === '#1',
//     trickle: false, 
//     stream: stream, 
//   });

//   p2p.on('signal', function (data) {
//     console.log('From a peer %s', data);
//     p.signal(data);
//   });

//   p.on('signal', data => {
//     console.log('I just signaled: ', data)
//   });

//   p.on('stream', stream => {
//     console.log('Stream locked in...');
//     var video = document.querySelector('video')

//     if ('srcObject' in video) {
//       video.srcObject = stream
//     } else {
//       video.src = window.URL.createObjectURL(stream) // for older browsers
//     }
//   });
// }