import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

interface ChatMessage {
  type: string;
  sender: string;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];
  newMessage: string = '';
  sender: string = '';
  roleChosen = false;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // 🔹 Récupérer l’historique au démarrage
    this.socketService.getHistory().subscribe(history => {
      this.messages = history.map(msg => ({
        type: 'CHAT',
        sender: msg.senderRole, // côté backend, c’est senderRole
        content: msg.content
      }));
    });

    // 🔹 Ecouter les nouveaux messages en temps réel
    this.socketService.messages$.subscribe((msg: ChatMessage) => {
      this.messages.push(msg);
    });
  }

  chooseRole(role: string) {
    this.sender = role;
    this.roleChosen = true;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.socketService.sendMessage(this.sender, this.newMessage);
      this.newMessage = '';
    }
  }
}
