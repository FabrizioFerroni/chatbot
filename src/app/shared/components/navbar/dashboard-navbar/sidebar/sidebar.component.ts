import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IChatResponse } from '@app/shared/interfaces/chat.response.interface';
import { IModels } from '@app/shared/interfaces/modesl.interface';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';
import { ApiResponse } from '@app/shared/response/api-response-ok';
import { ChatService } from '@app/shared/services/chat.service';
import { Rutas } from '@app/shared/utils/rutas';
import { environment } from 'environments/environment';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    RippleModule,
    AvatarModule,
    RouterLink,
    RouterModule,
    AvatarModule,
    StyleClassModule,
    TruncatePipe,
    TooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [ChatService],
})
export class SidebarComponent implements OnInit {
  @Input() sidebarVisible = true;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  width = 0;
  closeOnEscape = true;
  // rutas
  readonly homeRoute = `/${Rutas.HOME}`;
  readonly chatRoute = `/${Rutas.CHAT}`;
  readonly title = environment.name;
  readonly version = environment.version;
  private readonly chatService = inject(ChatService);
  private readonly router = inject(Router);
  chats: IChatResponse[] = [];

  ngOnInit(): void {
    this.checkScreenSize();
    this.getAllChatForUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  getAllChatForUser() {
    this.chatService.getAllChatsForUser().subscribe({
      next: (res: ApiResponse<IChatResponse[]>) => {
        this.chats = res.data;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  navigateToChat(chatId: string) {
    this.router.navigate([`${this.chatRoute}/${chatId}`]);
  }

  checkScreenSize(): void {
    this.width = window.innerWidth;
    this.sidebarVisible = this.width >= 768;
    if (this.width >= 768) {
      this.closeOnEscape = false;
    }
  }
}
