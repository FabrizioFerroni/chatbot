import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { refreshInterceptor } from './core/interceptors/refresh.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { MessageService } from 'primeng/api';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { AuthService } from './features/auth/services/auth.service';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([errorHandlerInterceptor, refreshInterceptor])
    ),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StyleClassModule,
    MessageService,
    AuthService,
    provideMarkdown({ loader: HttpClient }),
  ],
};
