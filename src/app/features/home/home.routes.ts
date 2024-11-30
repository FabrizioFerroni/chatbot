import { Routes } from '@angular/router';
import { logedGuard } from '@app/core/guards/loged.guard';
import { Rutas } from '@app/shared/utils/rutas';

export default [
  {
    path: Rutas.HOME,
    loadComponent: () => import('./home.component'),
    canActivate: [logedGuard],
  },
  {
    path: `${Rutas.CHAT}/:chatId`,
    loadComponent: () => import('../chat/chat.component'),
    canActivate: [logedGuard],
  },
] as Routes;
