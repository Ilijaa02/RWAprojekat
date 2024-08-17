import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:3000/requests';

  constructor(private http: HttpClient) { }

  createRequest(requestData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, requestData, { headers });
  }

  getRequestsForUser(username: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/for-user/${username}`, { headers });
  }

  deleteRequest(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getRequestsByUser(username: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/from-user/${username}`, { headers });
  }
}
