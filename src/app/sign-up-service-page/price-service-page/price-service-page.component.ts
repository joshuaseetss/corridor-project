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

  signupForm: FormGroup;
  isUserCreated = false;
  errorInSignup = false;

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      service1: new FormControl('', [Validators.required]),
      service2: new FormControl('', [Validators.required])
    });
  }

  signup() {
    const userData = new FormData();
    userData.append('firstName', this.dataService.serviceProviderSignupData.firstName);
    userData.append('lastName', this.dataService.serviceProviderSignupData.lastName);
    userData.append('email', this.dataService.serviceProviderSignupData.email);
    userData.append('password', this.dataService.serviceProviderSignupData.password);
    userData.append('name', this.dataService.serviceProviderSignupData.name);
    userData.append('address', this.dataService.serviceProviderSignupData.address);
    userData.append('postalCode', this.dataService.serviceProviderSignupData.postalCode);

    this.dataService.serviceProviderSignupData.serviceCategories.forEach(category => {
      userData.append('serviceCategories', category);
    });

    userData.append('description', this.dataService.serviceProviderSignupData.description);
    userData.append('tags', this.dataService.serviceProviderSignupData.tags);
    userData.append('service1', this.signupForm.get('service1').value);
    userData.append('service2', this.signupForm.get('service2').value);

    this.dataService.serviceProviderSignupData.portfolio.forEach(image => {
      userData.append('portfolio', image);
    });
    
    this.authService.serviceProviderSignup(userData).subscribe(
      (response) => {
        if(response.success) {
          this.isUserCreated = true;
        }
      },
      (error) => {
        this.errorInSignup = true;
      }
    );
  }

}
