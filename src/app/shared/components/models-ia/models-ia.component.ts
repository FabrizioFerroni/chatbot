import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IModels } from '@app/shared/interfaces/modesl.interface';
import { ApiResponse } from '@app/shared/response/api-response-ok';
import { ChatService } from '@app/shared/services/chat.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-models-ia',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    RippleModule,
    RouterModule,
    AvatarModule,
    StyleClassModule,
    InputSwitchModule,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './models-ia.component.html',
  styleUrl: './models-ia.component.scss',
  providers: [ChatService],
})
export class ModelsIaComponent {
  @Input() visible = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Output() visibleChange = new EventEmitter<string>();
  fb = inject(FormBuilder);
  chatService = inject(ChatService);
  route = inject(ActivatedRoute);
  models: IModels[] = [];
  form: FormGroup = new FormGroup({});
  model: string | null = null;
  selectedModel: string | null = null;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.model = params['model'];
      this.onSelectModel(params['model']);
    });
    this.getAllModels();
  }

  getAllModels() {
    this.chatService.getModels().subscribe({
      next: (res: ApiResponse<IModels[]>) => {
        this.models = res.data;
      },
      error: error => {
        console.error('Hubo un error al obtener los modelos: ', error);
      },
    });
  }

  onSelectModel(model: string): void {
    this.selectedModel = model;
  }

  onHide() {
    this.visibleChange.emit('');
  }

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }
}
