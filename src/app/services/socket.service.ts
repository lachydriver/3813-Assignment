import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

const SERVER_URL = "http://localhost:3000/chat";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }
  
  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  joinroom(selectedGroup,selectedChannel,username: String):void {
    this.socket.emit("joinRoom",selectedGroup+selectedChannel, username);
  }

  leaveroom(selectedGroup,selectedChannel,username: String):void {
    this.socket.emit("leaveRoom",selectedGroup+selectedChannel, username);
  }

  sendMessage(message: String, username: String): void {
    this.socket.emit('message', message, username);
  }

  getMessage(next){
    this.socket.on('message', (message)=>next(message));
  }

  notice(next){
    this.socket.on('notice', res=>next(res))
  }

  joined(next){
    this.socket.on('joined', res=>next(res))
  }
  
}
