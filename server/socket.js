module.exports = {

    connect: function(io, PORT) {
        var socketRoom = [];
        var socketRoomnum = [];

        //const collection = db.collection("groups");

        //collection.find({}).foreach(function(err, data) {
        //    rooms.push(data);
        // });
        
        const chat = io.of("/chat");

        chat.on('connection',(socket) => {
            socket.on('message',(message, username)=> {
                console.log("Message sent: " + message + " by " + username)
                for(i=0; i<socketRoom.length;i++) {
                    if (socketRoom[i][0] == socket.id){
                        chat.to(socketRoom[i][1]).emit('message', username + ": " + message);
                        console.log("Message sent to " + socketRoom[i]);
                    }
                }
            });

            socket.on("joinRoom",(room, username) => {
                console.log('user joined' + room)
                if(room.includes(room)){
                    socket.join(room, ()=> {
                        var inroomSocketarray = false;
                        for (i=0; i<socketRoom.length;i++) {
                            if(socketRoom[i][0] == socket.id){
                                socketRoom[i][0] = room;
                                inroom = true;
                            }
                        }

                        if (inroomSocketarray == false){
                            socketRoom.push([socket.id, room]);
                            var hasroomnum = false;

                            for (let j=0; j<socketRoomnum.length;j++){
                                if(socketRoomnum[j][0] == room){
                                    socketRoomnum[j][1] = socketRoomnum[j][1] +1;
                                    hasroomnum = true;
                                }
                            }

                            if(hasroomnum = false){
                                socketRoomnum.push([room,1])
                            }
                        }
                        
                    });
                    chat.in(room).emit("notice", username + " has joined");
                    return chat.in(room).emit("joined",room);
                }
            });

            socket.on("leaveRoom",(room, username)=> {
                console.log("Leave room called for " + room)
                for (let i=0; i<socketRoom.length; i++){
                    if(socketRoom[i][0] == socket.id){
                        socketRoom.splice(i,1);
                        socket.leave(room);
                        
                    }
                }

                for (let j=0;j<socketRoomnum.length;j++){
                    if(socketRoomnum[j][0]== room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] -1;
                        if(socketRoomnum[j][1] ==0){
                            socketRoomnum.splice(j,1);
                        }
                    }
                }
                chat.in(room).emit("notice", username + " has left")
            });

            socket.on("disconnect",()=> {
                chat.emit("disconnect");
                for (let i=0;i<socketRoom.length;i++){
                    if(socketRoom[i][0] ==socket.id){
                        socketRoom.splice(i,1);
                    }
                }
                for (let j=0; j<socketRoomnum.length; j++){
                    if(socketRoomnum[j][0] == socket.room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] -1;
                    }
                }
                console.log("Client disconnected")
            })
        });
    }
}