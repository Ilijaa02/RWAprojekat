import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum ResourceType {
  PREDMET = 'predmet',
  VESTINA = 'vestina',
  PROSTOR = 'prostor',
}

export interface Resource {
  id?: number;
  name: string;
  description: string;
  type: ResourceType;
  createdAt?: Date;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'http://localhost:3000/resources';

  constructor(private http: HttpClient) { }

  getAllResources(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createResource(resourceData: any): Observable<Resource> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Resource>(this.apiUrl, resourceData, { headers });
  }
}
