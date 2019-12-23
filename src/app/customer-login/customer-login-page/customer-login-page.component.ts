import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login-page',
  templateUrl: './customer-login-page.component.html',
  styleUrls: ['./customer-login-page.component.css']
})
export class CustomerLoginPageComponent implements OnInit {

  loginForm: FormGroup;
  isLoginError = false;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }

  login() {
    const data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.authService.customerLogin(data);
    // this.authService.customerLogin(data).subscribe(
    //   (response) => {
    //     if(response.isValidUser) {
          
    //       this.router.navigateByUrl('/home');
    //     }
    //   },
    //   (err) => {
    //     if(!err.error.isUserValid) {
    //       this.isLoginError = true;
    //       this.errorMessage = 'User with this email id does not exist.';
    //     } else {
    //       this.errorMessage = 'Internal server error. Please try again later.';
    //     }
    //   }
    // );
  }

}
