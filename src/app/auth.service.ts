import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private profileUpdateListner = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userData: any;
  private errorMessage: string;

  constructor(private httpClient: HttpClient, private router: Router, private dataService: DataService) { }

  getErrorMessage() {
    return this.errorMessage;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getProfileUpdateListner() {
    return this.profileUpdateListner.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserData() {
    return this.userData;
  }

  customerSignup(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/customerSignup', data);
  }

  customerLogin(data: {}) {
    this.httpClient.post<{authToken: string, userData: any, expiresIn: number}>(this.API_URL + 'user/customerLogin', data).subscribe((response: any) => {
      this.token = response.authToken;
      if (this.token) {
        this.setAuthTimer(response.expiresIn);
        this.isAuthenticated = true;
        this.userData = response.userData;
        this.authStatusListener.next(true);
        const now = new Date();
        this.saveAuthData(this.token, new Date(now.getTime() + (response.expiresIn * 1000)));
        this.router.navigate(['/']);
      } else {
        this.errorMessage = response.message;
        this.authStatusListener.next(false);
      }
    });
  }

  serviceProviderSignup(data): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/serviceProviderSignup', data);
  }

  serviceProviderLogin(data: {}) {
    this.httpClient.post<{authToken: string, userData: any, expiresIn: number}>(this.API_URL + 'user/serviceProviderLogin', data).subscribe((response: any) => {
      this.token = response.authToken;
      if (this.token) {
        this.setAuthTimer(response.expiresIn);
        this.isAuthenticated = true;
        this.userData = response.userData;
        this.dataService.setServiceProviderData(response.userData);
        this.authStatusListener.next(true);

        const now = new Date();
        this.saveAuthData(this.token, new Date(now.getTime() + (response.expiresIn * 1000)));
        this.router.navigate(['/business-card-detail']);
      } else {
        this.errorMessage = response.message;
        this.authStatusListener.next(false);
      }
    });
  }

  autoAuthUser() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if (!token || !expiration) {
      this.logout();
    }

    const now = new Date();
    const diff = new Date(expiration).getTime() - now.getTime();
    if (diff > 0 ) {
      this.token = token;
      this.isAuthenticated = true;
      this.setAuthTimer(diff / 1000);
      this.httpClient.post(this.API_URL + 'user/autoAuth', {}).subscribe((response: any) => {
        if (response.userData) {
          this.setAuthTimer(response.expiresIn);
          this.isAuthenticated = true;
          this.userData = response.userData;
          this.authStatusListener.next(true);

          const current = new Date();
          this.saveAuthData(this.token, new Date(current.getTime() + (response.expiresIn * 1000)));
        }
      });
    } else {
      this.logout();
    }
  }

  updateProfile(data: {}) {
    this.httpClient.post<{userData: any}>(this.API_URL + 'user/updateProfile', data).subscribe((response) => {
      this.userData = response.userData;
      this.dataService.setServiceProviderData(response.userData);
      this.profileUpdateListner.next(true);
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
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
