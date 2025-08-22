import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { ChatMessage } from 'src/app/core/models/ChatMessage';
import { Ticket } from 'src/app/core/models/Ticket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  messages: ChatMessage[] = [];
  tickets: Ticket[] = [];
  newMessage: string = '';
  sender: string = '';
  roleChosen = false;
  userValidated = false;

  userName: string = '';
  selectedTicket: Ticket | null = null;

  validationError: string | null = null;

  @ViewChild('messagesContainer') private readonly messagesContainer!: ElementRef;

  constructor(private readonly socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.messages$.subscribe((msg: any) => {
      this.updateWsMessages(msg);
      this.updateAgentTickets(msg);
    });
  }

  updateWsMessages(msg:any){
    if (this.sender === 'client' && this.selectedTicket && msg.titleDto.startsWith(this.selectedTicket.title)) {
      this.messages.push({
        sender: msg.usernameDto,
        content: msg.contentDto,
        createdAt: msg.createdAt,
        role: msg.userRoleDto,
        ticketId: msg.ticketId,
        title: msg.titleDto
      });
    }

    if (this.sender === 'agent' && this.selectedTicket && msg.titleDto.startsWith(this.selectedTicket.title)) {
      this.messages.push({
        sender: msg.usernameDto,
        content: msg.contentDto,
        createdAt: msg.createdAt,
        role: msg.userRoleDto,
        ticketId: msg.ticketId,
        title: msg.titleDto
      });
    }
  }

  updateAgentTickets(msg: any) {
    if (this.sender === 'agent' && msg.titleDto?.startsWith('Chat:')) {
      const nowIso = new Date().toISOString();
      const lastAt = msg.createdAt || nowIso;

      const existing = this.tickets.find(t => t.title === msg.titleDto);

      if (!existing) {
        this.tickets.push({
          id: this.tickets.length + 1,
          title: msg.titleDto,
          lastMessageAt: lastAt
        });
      } else {
        existing.lastMessageAt = lastAt;
      }

      this.tickets.sort((a, b) =>
        new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime()
      );
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  chooseRole(role: string) {
    this.sender = role;
    this.roleChosen = true;
  }

  validateUser() {
    if (!this.userName.trim()) {
      this.validationError = "Le nom d’utilisateur ne peut pas être vide.";
      return;
    }
    this.validationError = null;

    if (this.sender === 'client') {
      this.loadHistoryForClient(this.userName);
    } else {
      this.loadTickets();
    }

    this.userValidated = true;
  }

  loadHistoryForClient(username: string) {
    this.socketService.getHistory().subscribe(history => {
      this.messages = history
        .filter(msg => msg.title && msg.title.startsWith(`Chat:${username}`))
        .map(msg => ({
          sender: msg.user_name,
          content: msg.content,
          createdAt: msg.createdAt,
          role: msg.user_role,
          ticketId: msg.ticket_id,
          title: msg.title
        }));
    });

    this.selectedTicket = { id: Date.now(), title: `Chat:${username}` };
  }

  loadTickets() {
    this.socketService.getHistory().subscribe(history => {
      const clientTickets = history
        .filter(msg => msg.title && msg.title.startsWith('Chat:'))
        .map(msg => ({
          title: msg.title,
          lastMessageAt: msg.createdAt
        }));

      const uniqueTickets = new Map<string, Ticket>();
      clientTickets.forEach((t, idx) => {
        if (!uniqueTickets.has(t.title)) {
          uniqueTickets.set(t.title, { id: idx + 1, title: t.title, lastMessageAt: t.lastMessageAt });
        }
      });

      this.tickets = Array.from(uniqueTickets.values());

      this.tickets.sort((a, b) =>
        new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime()
      );
    });
  }

  openTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.messages = [];

    this.socketService.getHistory().subscribe(history => {
      this.messages = history
        .filter(msg => msg.title === ticket.title)
        .map(msg => ({
          sender: msg.user_name,
          content: msg.content,
          createdAt: msg.createdAt,
          role: msg.user_role,
          ticketId: msg.ticket_id,
          title: msg.title
        }));
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      let title = '';

      if (this.sender === 'client') {
        title = `Chat:${this.userName}`;
      } else if (this.sender === 'agent' && this.selectedTicket) {
        title = this.selectedTicket.title;
      }

      this.socketService.sendMessage(
        this.userName,
        this.newMessage,
        this.sender.toUpperCase(),
        title
      );

      this.newMessage = '';
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
  resetChat() {
    this.roleChosen = false;
    this.userValidated = false;
    this.sender = '';
    this.userName = '';
    this.selectedTicket = null;
    this.messages = [];
    this.tickets = [];
  }
}
