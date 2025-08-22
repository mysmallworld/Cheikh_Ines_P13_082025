export interface ChatMessage {
  id?: string;
  sender: string;
  content: string;
  createdAt?: string;
  role?: string;
  title: string;
}