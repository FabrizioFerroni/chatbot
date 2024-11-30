export interface IChatResponse {
  id: string;
  chatId: string;
  prompt: string;
  responseIA: string;
  model: string;
  createdAt: Date;
  user: string;
}
