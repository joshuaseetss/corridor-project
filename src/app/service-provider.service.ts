import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  fetchServiceProviderList(data: {}): Observable<any> {
    return this.httpClient.post(this.API_URL + 'serviceProvider/getServiceProviders', data);
  }
}
