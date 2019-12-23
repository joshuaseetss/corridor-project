import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  customerSignup(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/customerSignup', data);
  }

  customerLogin(data: {}) {
    this.httpClient.post<{authToken: string, expiresIn: number}>(this.API_URL + 'user/customerLogin', data).subscribe((response) => {
      this.token = response.authToken;
      if(this.token) {
        this.setAuthTimer(response.expiresIn);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);

        const now = new Date();
        this.saveAuthData(this.token, new Date(now.getTime() + (response.expiresIn * 1000)));
        this.router.navigate(['/home']);
      }
    });
  }

  serviceProviderSignup(data): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/serviceProviderSignup', data);
  }

  serviceProviderLogin(data: {}) {
    this.httpClient.post<{authToken: string, expiresIn: number}>(this.API_URL + 'user/serviceProviderLogin', data).subscribe((response) => {
      this.token = response.authToken;
      if(this.token) {
        this.setAuthTimer(response.expiresIn);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);

        const now = new Date();
        this.saveAuthData(this.token, new Date(now.getTime() + (response.expiresIn * 1000)));
        this.router.navigate(['/']);
      }
    });
  }

  autoAuthUser() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if(!token || !expiration) {
      return;
    }

    const now = new Date();
    const diff = new Date(expiration).getTime() - now.getTime();
    if(diff > 0 ) {
      this.token = token;
      this.isAuthenticated = true;
      this.setAuthTimer(diff / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/home']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
