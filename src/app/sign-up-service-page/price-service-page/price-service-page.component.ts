import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-price-service-page',
  templateUrl: './price-service-page.component.html',
  styleUrls: ['./price-service-page.component.css']
})
export class PriceServicePageComponent implements OnInit {

  isUserCreated = false;
  errorInSignup = false;
  addServiceError = false;
  services = [];
  serviceName: string;
  servicePrice: string;

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() { }

  addService() {
    this.services.push({
      name: this.serviceName,
      price: this.servicePrice
    });

    this.serviceName = '';
    this.servicePrice = '';
  }

  deleteService(index) {
    this.services.splice(index, 1);
  }

  signup() {
    const userData = new FormData();
    userData.append('firstName', this.dataService.serviceProviderSignupData.firstName);
    userData.append('lastName', this.dataService.serviceProviderSignupData.lastName);
    userData.append('email', this.dataService.serviceProviderSignupData.email);
    userData.append('phone', this.dataService.serviceProviderSignupData.phone);
    userData.append('password', this.dataService.serviceProviderSignupData.password);
    userData.append('profilePhoto', this.dataService.serviceProviderSignupData.profilePhoto);
    userData.append('name', this.dataService.serviceProviderSignupData.name);
    userData.append('address', this.dataService.serviceProviderSignupData.address);
    userData.append('postalCode', this.dataService.serviceProviderSignupData.postalCode);

    this.dataService.serviceProviderSignupData.serviceCategories.forEach(category => {
      userData.append('serviceCategories', category);
    });

    userData.append('description', this.dataService.serviceProviderSignupData.description);
    userData.append('tags', this.dataService.serviceProviderSignupData.tags);

    this.dataService.serviceProviderSignupData.openingHours.forEach(oh => {
      userData.append('openingHours', JSON.stringify(oh));
    });

    this.dataService.serviceProviderSignupData.portfolio.forEach(image => {
      userData.append('portfolio', image);
    });

    this.services.forEach(service => {
      userData.append('services', JSON.stringify({ name: service.name, price: service.price }));
    });

    userData.append('avgRating', '0');
    userData.append('noOfReviews', '0');

    this.authService.serviceProviderSignup(userData).subscribe(
      (response) => {
        if (response.success) {
          this.isUserCreated = true;
        }
      },
      (error) => {
        this.errorInSignup = true;
      }
    );
  }

}
