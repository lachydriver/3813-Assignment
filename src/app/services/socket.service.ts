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

  joinroom(selectedChannel):void {
    this.socket.emit("joinRoom",selectedChannel);
  }

  leaveroom(selectedChannel):void {
    this.socket.emit("leaveRoom",selectedChannel);
  }

  sendMessage(message: string): void {
    this.socket.emit(message);
  }

  getMessage(next){
    this.socket.on('message', (message)=>next(message));
  }
  
}
