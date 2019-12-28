import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-customer-sign-up-page',
  templateUrl: './customer-sign-up-page.component.html',
  styleUrls: ['./customer-sign-up-page.component.css']
})
export class CustomerSignUpPageComponent implements OnInit {

  signupForm: FormGroup;
  signupComplete = false;
  signupCompleteMessage: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    });
  }

  signup() {
    const data = {
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      email: this.signupForm.get('email').value,
      phone: this.signupForm.get('phone').value,
      password: this.signupForm.get('password').value
    };
    this.authService.customerSignup(data).subscribe(
      (response) => {
        this.signupComplete = true;
        this.signupCompleteMessage = response.message; 
      },
      (e) => {
        this.signupComplete = true;
        this.signupCompleteMessage = e.error.message;
      }
    );
  }
}
