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

  joinroom(selectedGroup,selectedChannel):void {
    this.socket.emit("joinRoom",selectedGroup+selectedChannel);
  }

  leaveroom(selectedGroup,selectedChannel):void {
    this.socket.emit("leaveRoom",selectedGroup+selectedChannel);
  }

  sendMessage(message: String, username: String): void {
    this.socket.emit('message', message, username);
  }

  getMessage(next){
    this.socket.on('message', (message)=>next(message));
  }
  
}
