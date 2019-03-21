import { Pista } from './../interfaces/pista.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Addpista } from '../dto/add-pista.dto';

const pistaUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PistaService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPistas(): Observable<Pista[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
        
    return this.http.get<Pista[]>(`${pistaUrl}/pistas?access_token=qZQDzsmwYO5GnOclZbRzdCLPyfW16uAe`, requestOptions);
  }

  deleteOnePista(id: string) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.delete(`${pistaUrl}/pistas/${id}`, requestOptions);
  }

  addPista(id: string,newPista: Addpista) {
    
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.post<Pista>(`${pistaUrl}/pistas/${id}`, newPista, requestOptions);
  }
}
