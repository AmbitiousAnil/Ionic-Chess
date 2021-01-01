
let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
var chess = require('chess.js');

var newGame = new chess.Chess();
//console.log(newGame);




var games = {};
var users = 0;
var t1Users = [];

 var monitor = io.of('/monitor');
    monitor.on('connection', function(socket){
        socket.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});
    });

 
io.on('connection', (socket) => {
 
  /* socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  socket.on('set-name', (name) => {
    socket.username = name;
    io.emit('users-changed', {user: name, event: 'joined'});    
  });
  
  socket.on('send-message', (message) => {
    io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
  }); */
  
  console.log(socket);
   //var username = socket.handshake.query.user;
   var id = socket.id;

        users++;
       // monitor.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});

        /*
         * A player joins a game
         */
		socket.on('joinRoom', function (user) {
        
			console.log(user.userName);
			console.log(id);
            user.status = 'A';
            user.socket = socket;
			
			//Write Logic to Find Opponent and Start Game
			if(user.type == "type1"){
				if(t1Users.length == 0){
					t1Users.push(user);
				}else{
                    let user1 =  t1Users.pop();
                    console.log(user1);
                    let id = Math.floor(Math.random() * 6);
                    //Send Ready Update
                    var players = [{
                        socket: user1.socket,
                        name: user1.userName,
                        status: 'joined',
                        side: 'w'
                    }, {
                        socket: user.socket,
                        name: user.userName,
                        status: 'joined',
                        side: 'b'
                    }];
                    games[id] = {
                        id: id,
                        creator: socket,
                        status: 'ready',
                        creationDate: Date.now(),
                        type: "type1",
                        players: players
                    };

                    user1.socket.join(id);
                    socket.join(id);

                    io.sockets.to(room).emit('ready', { white: user1.userName , black: user.userName });

				}
			}
			
		});		
		 
		 
        socket.on('join', function (data) {
            var room = data.token;

            // If the player is the first to join, initialize the game and players array
            if (!(room in games)) {
                var players = [{
                    socket: socket,
                    name: username,
                    status: 'joined',
                    side: data.side
                }, {
                    socket: null,
                    name: "",
                    status: 'open',
                    side: data.side === "black" ? "white" : "black"
                }];
                games[room] = {
                    room: room,
                    creator: socket,
                    status: 'waiting',
                    creationDate: Date.now(),
                    players: players
                };

                socket.join(room);
                socket.emit('wait'); // tell the game creator to wait until a opponent joins the game
                return;
            }

            var game = games[room];

            /* TODO: handle full case, a third player attempts to join the game after already 2 players has joined the game
            if (game.status === "ready") {
                socket.emit('full');
            }*/

            socket.join(room);
            game.players[1].socket = socket;
            game.players[1].name = username;
            game.players[1].status = "joined";
            game.status = "ready";
            io.sockets.to(room).emit('ready', { white: getPlayerName(room, "white"), black: getPlayerName(room, "black") });

        });

        /*
         * A player makes a new move => broadcast that move to the opponent
         */
        socket.on('new-move', function(data) {
            socket.broadcast.to(data.token).emit('new-move', data);
        });

        /*
         * A player resigns => notify opponent, leave game room and delete the game
         */
        socket.on('resign', function (data) {
            var room = data.token;
            if (room in games) {
                io.sockets.to(room).emit('player-resigned', {
                    'side': data.side
                });
                games[room].players[0].socket.leave(room);
                games[room].players[1].socket.leave(room);
                delete games[room];
                monitor.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});
            }
        });

        /*
         * A player disconnects => notify opponent, leave game room and delete the game
         */
        socket.on('disconnect', function(data){
            users--;
            monitor.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});
            for (var token in games) {
                var game = games[token];
                for (var p in game.players) {
                    var player = game.players[p];
                    if (player.socket === socket) {
                        socket.broadcast.to(token).emit('opponent-disconnected');
                        delete games[token];
                        monitor.emit('update', {nbUsers: users, nbGames: Object.keys(games).length});
                    }
                }
            }
        });
});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});


/*
 * Utility function to find the player name of a given side.
 */
function getPlayerName(room, side) {
	var game = games[room];
	for (var p in game.players) {
		var player = game.players[p];
		if (player.side === side) {
			return player.name;
		}
	}
}
