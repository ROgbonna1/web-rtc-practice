const io = require('socket.io-client');
const SimplePeer = require('simple-peer')

const socket = io();

console.log({socket})

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(gotMedia).catch(() => {})

function gotMedia(stream) {
  const yourVideo = document.querySelector('#video1');
  const peerVideo = document.querySelector('#video2');

  yourVideo.srcObject = stream;

  const peer = new SimplePeer({
    initiator: window.location.hash === '#1',
    trickle: false, 
    stream: stream,
  });

  peer.on('signal', (data) => {
    console.log('Just sent data: ', data)
    socket.emit('signal', data)
  });

  socket.on('signal', (data) => {
    console.log('I just received data: ', data);
    peer.signal(data);
  });

  peer.on('stream', stream => {
    console.log('Stream locked in...');
    const video = document.querySelector('video')

    if ('srcObject' in video) {
      peerVideo.srcObject = stream
    } else {
      peerVideo.src = window.URL.createObjectURL(stream) // for older browsers
    }
  });
}



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
