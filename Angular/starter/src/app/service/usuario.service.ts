import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UsuarioCreateDto } from '../dto/usuario-create.dto';
import { UsuarioCreateResponse } from '../interfaces/usuario-create-response.interface';
import { Observable } from 'rxjs';

const usuarioUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createUsuario(usuarioCreateDto: UsuarioCreateDto): Observable<UsuarioCreateResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    return this.http.post<UsuarioCreateResponse>(`${usuarioUrl}/create`, usuarioCreateDto, requestOptions);
  }
}
