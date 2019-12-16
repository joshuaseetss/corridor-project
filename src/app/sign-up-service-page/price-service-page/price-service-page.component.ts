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

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      service1: new FormControl('', [Validators.required]),
      service2: new FormControl('', [Validators.required])
    });
  }

  signup() {
    this.dataService.serviceProviderSignupData.service1 = this.signupForm.get('service1').value;
    this.dataService.serviceProviderSignupData.service2 = this.signupForm.get('service2').value;
    this.authService.serviceProviderSignup(this.dataService.serviceProviderSignupData);
  }

}
