module.exports = {

    connect: function(db, io, PORT) {
        var rooms = [];
        var socketRoom = [];
        var socketRoomnum = [];

        const collection = db.collection("groups");

        collection.find({}).foreach(function(err, data) {
            rooms.push(data);
        });
        
        const chat = io.of("/chat");

        chat.on('connection',(socket) => {
            socket.on('message',(message)=> {
                for(i=0; i<socketRoom.length;i++) {
                    if (socketRoom[i][0] == socket.id){
                        chat.to(socketRoom[i][1]).emit('message', message);
                    }
                }
            });

            socket.on("joinroom",(room) => {
                if(room.includes(room)){
                    socket.join(room, ()=> {
                        var inroomSocketarray = false;
                        
                        for (i=0; i<socketRoom.length;i++) {
                            if(socketRoom[i][0] == socket.id){
                                socketroom[i][0] = room;
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
                        chat.in(room).emit("notice", "A new user has joined");
                    });
                    return chat.in(room).emit("joined",room);
                }
            });

            socket.on("leaveroom",(room)=> {
                
            })
        });
    }
}