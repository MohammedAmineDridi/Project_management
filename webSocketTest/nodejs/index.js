const express = require('express');
const app = express();
const http = require('http');
const { join } = require('path');
const server = http.createServer(app);




// server-side
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true
  }
});


// get online users method in room2 .

function getOnlineUsers(roomId) {
  return "a";
}



let users = [];

let user_username ;

io.on('connection', (socket) => {


  // emit online users

  const emitOnlineUsers = () =>{
    io.emit("test_users",getOnlineUsers('room2') ) ;
  };

  // finale  test 

  socket.on('test_add_user',(username)=>{

    console.log(socket.rooms);
    Object.keys(socket.rooms)
    .filter((r) => r != socket.id)
    .forEach((r) => socket.leave(r));

    console.log('user = ' + username + ' is added to list users ');

    setTimeout(() => {
      socket.join('room12');
      io.local.emit('test_add_user1', username);
    }, 0);

    user_username = username ;

  });

 


 socket.on('get_user_add_room',(username)=>{

   socket.join("room 1");
  
   console.log(socket.rooms); // Set { <socket.id>, "room 1" }
 
   // io.to("room 1").emit("joining","a new user = "+ username + " has joined the room"); 


   users.push(username);


 });

 io.emit("new user",users);

 // voir la liste des utilisateurs 

 console.log('---- liste des users connected --------');

 for (var i=0;i<users.length;i++){
   console.log(users[i]);
 }

  // test
    
  socket.emit('test event','here some data from amine server');

  

  console.log("--------------------");

  console.log('a user connected');

  // user connected


  // chat message emit function 

    socket.on('new-message', (message) => {
    io.emit('new-message1',message);
  });


  // add username with chat 

   socket.on('new-message-username', (username) => {
    socket.broadcast.emit('new-message1-username',username);
  });

  // participants 

  socket.on('new-participant', (username) => {
    io.emit('new-participant1',username);
  });

  // messages + username 

  socket.on('message-username', (data) => {
    io.emit('message-username1',data);
  });


// test broadcasting msg 
    
// io.sockets.emit('test_broadcast','client added');




  // user deconnected

  socket.on('disconnect', () => {
    console.log( user_username +  ' is disconnected !!');

        io.emit('delete_username1',user_username);

    });




});

  

  
// get list of user 'usernames'




server.listen(3000, () => {
  console.log('listening on *:3000');
});



