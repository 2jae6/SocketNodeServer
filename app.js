var app = require('express')();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);



// namespace /chat에 접속한다.
var chat = io.of('/test').on('connection', function(socket) {
  socket.on('chat message', function(data){
    console.log('message from client: ', data);

    var name = socket.name = data.name;
    var room = socket.room = data.room;

    // room에 join한다
    socket.join(room);
    // room에 join되어 있는 클라이언트에게 메시지를 전송한다
    chat.to(room).emit('chat message', data.msg);


    chat.to(room).emit("test", {
      "type":1,
      "message":data.msg });

  });

socket.on("test", (msg) => {

  chat.emit("test", {
      "type": 1,
      "message": msg 
    })
});

});

server.listen(9000, function() {
  console.log('Socket IO server listening on port 3000');
});