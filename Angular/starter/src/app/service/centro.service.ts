import { Centro } from './../interfaces/centro.interface';
import { Addcentro } from './../dto/add-centro.dto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

const centroUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllcentros(): Observable<Centro[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
        
    return this.http.get<Centro[]>(`${centroUrl}/centros?access_token=qZQDzsmwYO5GnOclZbRzdCLPyfW16uAe`, requestOptions);
  }

  deleteOneCentro(id: string) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.delete(`${centroUrl}/centros/${id}`, requestOptions);
  }

  addCentro(newCentro: Addcentro) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.post<Centro>(`${centroUrl}/centros`, newCentro, requestOptions);
  }

  editOneCentro(id: string, centroModified: Addcentro) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.put<Centro>(`${centroUrl}/centros/${id}`, centroModified, requestOptions);
  }
}
