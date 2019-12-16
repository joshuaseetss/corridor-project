import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  customerSignup(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/customerSignup', data);
  }

  customerLogin(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/customerLogin', data);
  }

  serviceProviderSignup(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/serviceProviderSignup', data);
  }

  serviceProviderLogin(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'user/serviceProviderLogin', data);
  }
}
