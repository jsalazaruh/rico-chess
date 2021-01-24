const express = require('express');
const http = require('http');
const socket = require('socket.io');

// use 8080 as the default port number, process.env.PORT is
//useful if you deploy to Heroku
const port = process.env.PORT || 8080
 
var app = express();
 
// start the server
const server = http.createServer(app)
 
// initialize a new instance of socket.io by passing the HTTP server object
const io = socket(server)
 
// keep track of how many players in a game (0, 1, 2)
var players;
 
// create an array of 100 games and initialize them
var games = Array(100);
for (let i = 0; i < 100; i++) {
    games[i] = {players: 0 , pid: [0 , 0]};
}

// Add the static directory for our js and css files
app.use(express.static(__dirname + "/"));
 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  // just assign a random number to every player that has connected
  // the numbers have no significance so it
  // doesn't matter if 2 people get the same number
  var playerId = Math.floor((Math.random() * 100) + 1)
  console.log(playerId + ' connected');

  // if a user disconnects just print their playerID
  socket.on('disconnect', function () {
      console.log(playerId + ' disconnected');
  });
});