import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResponseService {
    private baseUrl = 'http://localhost:3000/responses';

    constructor(private http: HttpClient) { }

    createResponse(requestId: number, message: string): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const response = { requestId, message };
        return this.http.post<any>(this.baseUrl, response, { headers });
    }

    getResponsesForUser(username: string): Observable<any[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(`${this.baseUrl}/user/${username}`, { headers });
    }

    getReceivedResponses(username: string): Observable<any[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(`${this.baseUrl}/received/${username}`, { headers });
    }

    rateUser(userId: number, rating: number, responseId: number): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<any>(`${this.baseUrl}/rate/${userId}`, { rating, responseId }, { headers });
    }

}
