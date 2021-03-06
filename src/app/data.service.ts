import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = environment.apiUrl;
  serviceProviderSignupData: any = {};
  private serviceProviderData: any;
  selectedProvider;

  constructor(private httpClient: HttpClient) { }

  getServiceProviderData() {
    return this.serviceProviderData;
  }

  setServiceProviderData(data) {
    this.serviceProviderData = data;
  }

  saveReview(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'review/save', data);
  }

  getReviews(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'review/getReviews', data);
  }

  getServiceProviderById(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'serviceProvider/getServiceProviderById', data);
  }
}
