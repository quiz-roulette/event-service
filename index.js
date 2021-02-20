const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 30100;

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

let interval;

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

server.listen(port, function () {
  console.log('listening on *:30100 or ', process.env.PORT);
});



function SocketUser(socketId, userId) {
  this.SocketId = socketId;
  this.UserId = userId;
}

const socketUserIds = [];
io.on('connection', function (socket) {
  console.log("New client connected");
  socket.emit('user at waiting page', { some: "value"});
  // if(quizStart.started){
  //   socket.emit('start quiz',"code");
  // }
  socket.on('chat message', function (msg) {
    socket.emit('chat message', msg);
  });

  socket.on('new quiz user', function (user) {
    console.log("new user", user);
    socket.emit('new quiz user', user);
    var tempsoc = new SocketUser(socket.id, user.QuizUserId);

    PATCH(user.QuizUserId, true, function (res) {
      console.log("Connected ", res);
      var indexofid = socketUserIds.indexOf(socket.id);
      if (indexofid != -1) socketUserIds.splice(indexofid, 1);
      socketUserIds.push(tempsoc);
    })
  });

  socket.on('update quiz user', function (user) {
    socket.emit('update quiz user', user);
  })

  socket.on('update quiz user result', function (quizResult) {
    console.log("At Update Result", quizResult);
    socket.emit('update quiz user result', quizResult);
  });

  socket.on('user at waiting page', function (user) {
    console.log('At waiting: ', user);
    socket.emit('user at waiting page', user);
  })

  socket.on('start quiz', function (val) {
    console.log("START QUIZ: ", val);
    socket.emit('start quiz', val);
  });

  socket.on('stop quiz', function (val) {
    console.log("stop quiz", val);
    socket.emit('stop quiz', val);
  });

  socket.on('quiz question', function (val) {
    console.log("stop quiz", val);
    socket.emit('stop quiz', val);
  });

  socket.on('rank', function (user, rank) {
    socket.emit('rank', user, rank);
  });

  socket.on('buzzer pressed', function (val) {
    socket.emit('buzzer pressed', val);
  })

  socket.on('stage two new question', function (val) {
    socket.emit('stage two new question', val);
  })
  socket.on('disconnect', function () {
    var newsocketuserid = socketUserIds.filter(el => el.SocketId === socket.id)[0];
    if (newsocketuserid) {
      PATCH(newsocketuserid.QuizUserId, false, function (res) {
        console.log("Disconnect", res);
        var indexofid = socketUserIds.indexOf(newsocketuserid);
        if (indexofid !== -1) {
          socketUserIds.splice(indexofid, 1);
        }

      })
    }
  });

});

function PATCH(userId, isOnline, call_back) {

  var options = {
    method: 'PATCH',
    url: 'https://axperienceapp.azurewebsites.net/api/authenticate?UserId=' + userId + '&IsOnline=' + isOnline,
    headers:
    {
      'content-type': 'application/json'
    },
    body: {},
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    return call_back(body);
  });


};