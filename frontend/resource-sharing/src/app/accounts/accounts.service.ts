import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountsService {
    private apiUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });

        return this.http.get<any[]>(this.apiUrl, { headers });
    }

    deleteUser(username: string): Observable<void> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });

        return this.http.delete<void>(`${this.apiUrl}/delete`, { headers, body: { username }, });
    }
}
