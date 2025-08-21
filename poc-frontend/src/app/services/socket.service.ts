import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private stompClient: Client;
  private messageSubject = new Subject<any>();

  messages$ = this.messageSubject.asObservable();
  private apiUrl = 'http://localhost:3001/api/chat';

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:3001/ws',
      webSocketFactory: () => new SockJS('http://localhost:3001/ws'),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('✅ Connected to WebSocket');
      this.stompClient.subscribe('/topic/messages', (message: IMessage) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    };

    this.stompClient.activate();
  }

  sendMessage(sender: string, content: string) {
    const chatMessage = {
      type: 'CHAT',
      sender: sender,
      content: content
    };
    this.stompClient.publish({ destination: '/app/sendMessage', body: JSON.stringify(chatMessage) });
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages`);
  }
}
