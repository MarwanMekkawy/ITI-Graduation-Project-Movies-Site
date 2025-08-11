import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  constructor(private httpClient:HttpClient) {}
   private readonly baseUrl = 'http://localhost:5059/api/Users';

  DeleteUser(id: number): Observable<void> {
      localStorage.clear();
      return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
    
}
