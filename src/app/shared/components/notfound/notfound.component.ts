import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [ButtonModule, IconFieldModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  volver(): void {
    const referrer = document.referrer;
    if (referrer && referrer.startsWith(window.location.origin)) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
