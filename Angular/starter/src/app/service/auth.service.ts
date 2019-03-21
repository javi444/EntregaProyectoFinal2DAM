import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SigninDto } from '../dto/signin.dto';
import { SigninResponse } from '../interfaces/signin-response.interface';
import { Observable } from 'rxjs';

const authUrl = `${environment.apiUrl}`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  dologin(signinDto: SigninDto): Observable<SigninResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + btoa(`${signinDto.email}:${signinDto.password}`),
        'Access-Control-Allow-Origin': '*'
      })
    };
    class Metakey {
      access_token: String;
 
      constructor(access_token: String) {
        this.access_token = access_token;
      }
    }
    const metaKey = new Metakey('qZQDzsmwYO5GnOclZbRzdCLPyfW16uAe');
    return this.http.post<SigninResponse>(`${environment.apiUrl}/auth`, metaKey, requestOptions);
  }

  public signin(signinDto: SigninDto): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${authUrl}/auth`, signinDto, requestOptions);
  }

  public setSigninData(signinResponse: SigninResponse) {
    localStorage.setItem('token', signinResponse.token);
    localStorage.setItem('email', signinResponse.user.email);
    localStorage.setItem('nombre', signinResponse.user.name);
    localStorage.setItem('role', signinResponse.user.role);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
