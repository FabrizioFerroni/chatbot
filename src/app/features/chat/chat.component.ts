import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardNavbarComponent } from '@app/shared/components/navbar/dashboard-navbar/dashboard-navbar.component';
import { CreateChat } from '@app/shared/dto/create-chat.dto';
import { IChatResponse } from '@app/shared/interfaces/chat.response.interface';
import { ApiResponse } from '@app/shared/response/api-response-ok';
import { ChatService } from '@app/shared/services/chat.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { Rutas } from '@app/shared/utils/rutas';
import { Severity } from '@app/shared/utils/severity';
import { MarkdownModule } from 'ngx-markdown';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { catchError, EMPTY } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    DashboardNavbarComponent,
    MarkdownModule,
    ButtonModule,
    IconFieldModule,
    ReactiveFormsModule,
  ],
  providers: [ChatService],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export default class ChatComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private chatId: string | null = '';
  private readonly chatService = inject(ChatService);
  chats: IChatResponse[] = [];
  fb = inject(FormBuilder);
  private readonly notificacionService = inject(NotificationService);
  loading = false;
  newChatForm = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(3)]],
  });
  isSuccess = false;

  ngOnInit(): void {
    this.obtainChatsForRouter();
  }

  obtainChatsForRouter() {
    this.route.paramMap.subscribe(params => {
      this.chatId = params.get('chatId');

      if (!this.chatId) {
        console.error('Invalid chat ID');
        this.router.navigate([`${Rutas.HOME}`]);
      }

      this.getAllChatsForChatId(this.chatId!);
    });
  }

  get searchField() {
    return this.newChatForm.get('search');
  }

  newChat() {
    if (this.newChatForm.invalid) {
      this.notificacionService.showToast(
        Severity.WARNING,
        'Advertencia',
        'Todos los campos son obligatorios'
      );
      return;
    }

    this.loading = true;
    const urlChat = `${Rutas.CHAT}/${this.chats[0].chatId}`;

    const body: CreateChat = {
      chatId: this.chats[0].chatId,
      message: this.searchField?.value!,
      model: this.chats[0].model,
      isNewChat: false,
    };

    console.log('El body es: ', body);

    this.chatService.createChat(body).subscribe({
      next: (res: ApiResponse<IChatResponse>) => {
        this.loading = false;
        this.getAllChatsForChatId(this.chats[0].chatId);
        this.newChatForm.reset();
      },
      error: error => {
        this.loading = false;
        this.notificacionService.showToast(
          Severity.ERROR,
          'Error al crear el chat',
          'Hubo un error al crear el chat, por favor intenta nuevamente'
        );
      },
    });
  }

  getAllChatsForChatId(chatId: string) {
    this.chatService
      .getChatsForChatId(chatId)
      .pipe(
        catchError(error => {
          switch (error.statusCode) {
            case 404:
              this.router.navigate([`${Rutas.HOME}`]);
              break;
            default:
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (response: ApiResponse<IChatResponse[]>) => {
          this.chats = response.data;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
        complete: () => (this.isSuccess = true),
      });
  }
}
//84f3c2ce-f595-4943-8f00-3a095c8d3081
