export interface JwtToken {
  id: string;
  email: string;
  exp: number;
  iat: number;
}

export interface JwtTokenGoogle {
  user: any;
  access_token: string;
  exp: number;
  iat: number;
  refresh_token: string;
}
