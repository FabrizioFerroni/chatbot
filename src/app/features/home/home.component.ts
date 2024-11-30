import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DashboardNavbarComponent } from '@app/shared/components/navbar/dashboard-navbar/dashboard-navbar.component';
import { CardModule } from 'primeng/card';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Severity } from '@app/shared/utils/severity';
import { NotificationService } from '@app/shared/services/notification.service';
import { ChatService } from '@app/shared/services/chat.service';
import { IModels } from '@app/shared/interfaces/modesl.interface';
import { ApiResponse } from '@app/shared/response/api-response-ok';
import { CreateChat } from '@app/shared/dto/create-chat.dto';
import { IChatResponse } from '@app/shared/interfaces/chat.response.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DashboardNavbarComponent,
    ButtonModule,
    ScrollTopModule,
    CardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ChatService],
})
export default class HomeComponent {
  router = inject(Router);
  chatService = inject(ChatService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  private readonly notificacionService = inject(NotificationService);
  loading = false;
  newChatForm = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(3)]],
  });
  models: IModels[] = [];
  model: string = 'llama3-8b-8192';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.model = params['model'] ?? 'llama3-8b-8192';
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
    const newChatId = uuidv4();
    const urlChat = `${Rutas.CHAT}/${newChatId}`;

    const body: CreateChat = {
      chatId: newChatId,
      message: this.searchField?.value!,
      model: this.model,
      isNewChat: true,
    };

    console.log('El body es: ', body);

    this.chatService.createChat(body).subscribe({
      next: (res: ApiResponse<IChatResponse>) => {
        this.loading = false;
        this.router.navigate([urlChat]);
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
}
