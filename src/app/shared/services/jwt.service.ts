import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtToken, JwtTokenGoogle } from '../interfaces/jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decodeToken(token: string): JwtToken {
    return jwtDecode(token);
  }

  decodeTokenGoogle(token: string): JwtTokenGoogle {
    return jwtDecode(token);
  }
}
