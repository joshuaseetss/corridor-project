import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusinessCard } from 'src/app/shared-components/business-card/business-card.model';
import businessCardsData from 'src/app/shared-components/business-cards.data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  isLoginError = false;
  errorMessage: string;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.populateBusinessCards();
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }

  login() {
    const data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.authService.serviceProviderLogin(data);
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((auth: any) => {
      if (!auth) {
        this.isLoginError = true;
        this.errorMessage = this.authService.getErrorMessage();
      }
    });
  }

  businessCards: Array<BusinessCard> = [];

  populateBusinessCards() {
    let that = this;
    let fieldsToPopulate = [
      'name',
      'location',
      'postalCode',
      'phoneNo',
      'rating',
      'noOfReviews',
      'description',
      'imageUrl',
      'avgPricePerPax',
      'images',
      'services',
      'reviews',
      'openingHrs'
    ];
    businessCardsData.forEach(businessCard => {
      let newBusinessCard = new BusinessCard();
      fieldsToPopulate.forEach(fieldToPopulate => {
        newBusinessCard[fieldToPopulate] = businessCard[fieldToPopulate];
      });
      that.businessCards.push(newBusinessCard);
    });

    localStorage.setItem('businessCardDetailObject', JSON.stringify(this.businessCards[0]));
  }
}
