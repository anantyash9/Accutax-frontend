import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OdmService {

  constructor(private http: HttpClient) { }
  
  getToken(username: string, password: string) {
    return this.http.post('http://localhost:8000/api/token-auth/', { username, password }, {responseType: 'json' });
  }
}
