import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtTokenGoogle } from '@app/shared/interfaces/jwt';
import { RefreshToken } from '@app/shared/interfaces/refresh-token';
import { JwtService } from '@app/shared/services/jwt.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { TokenService } from '@app/shared/services/token.service';
import { Rutas } from '@app/shared/utils/rutas';
import { Severity } from '@app/shared/utils/severity';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [],
  template: '',
})
export default class GoogleComponent implements OnInit {
  token: string = '';

  constructor(
    private readonly jwtService: JwtService,
    private readonly route: ActivatedRoute,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly notificacionService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.router.navigate([Rutas.HOME]);
      const {
        user,
        access_token: token,
        refresh_token,
      }: JwtTokenGoogle = this.jwtService.decodeTokenGoogle(params['token']);

      const body: RefreshToken = {
        token: refresh_token,
      };

      this.tokenService.setUserSS(user);
      this.tokenService.setSessionStorage(token);
      this.tokenService.setCookieRefresh(body);

      this.notificacionService.showToast(
        Severity.SUCCESS,
        'Éxito',
        `Te has logueado correctamente!`
      );
    });
  }
}
