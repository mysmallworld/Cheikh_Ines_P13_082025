export interface ChatMessage {
  id?: string;
  sender: string;
  content: string;
  createdAt?: string;
  role?: string;
  ticketId?: number;
  title: string;
}