import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { IModels } from '../interfaces/modesl.interface';
import { Observable } from 'rxjs';
import { CreateChat } from '../dto/create-chat.dto';
import { IChatResponse } from '../interfaces/chat.response.interface';
import { ApiResponse } from './../response/api-response-ok';

@Injectable()
export class ChatService extends BaseHttpService {
  getModels(): Observable<ApiResponse<IModels[]>> {
    return this.http.get<ApiResponse<IModels[]>>(`${this.apiUrl}/chats/models`);
  }

  getChatsForChatId(chatId: string): Observable<ApiResponse<IChatResponse[]>> {
    return this.http.get<ApiResponse<IChatResponse[]>>(
      `${this.apiUrl}/chats/${chatId}`
    );
  }

  getAllChatsForUser(): Observable<ApiResponse<IChatResponse[]>> {
    return this.http.get<ApiResponse<IChatResponse[]>>(`${this.apiUrl}/chats`);
  }

  createChat(chat: CreateChat): Observable<ApiResponse<IChatResponse>> {
    return this.http.post<ApiResponse<IChatResponse>>(
      `${this.apiUrl}/chats`,
      chat
    );
  }
}
