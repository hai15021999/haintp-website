import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {
  private __baseUrl: string = 'https://api.example.com';

  constructor(private __http: HttpClient) {}

  login$(username: string, password: string): Observable<any> {
    const __url = `${this.__baseUrl}/login`;
    return this.__http.post(__url, { username, password });
  }

  logout$(): Observable<any> {
    const __url = `${this.__baseUrl}/logout`;
    return this.__http.post(__url, {});
  }

  getMyProjects$(): Observable<any> {
    const __url = `${this.__baseUrl}/my-projects`;
    return this.__http.get(__url);
  }
}