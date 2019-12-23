import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  collasped = false;
  password = document.getElementById('password');
  confirmPassword = document.getElementById('confirmpassword');
  notSame = false;
  // form = new FormGroup({
  //   password: new FormControl('', Validators.minLength(2)),
  //   passwordConfirm: new FormControl('', Validators.minLength(2)),
  // }, this.passwordMatchValidator);

  // passwordMatchValidator(g: FormGroup) {
  //    return g.get('password').value === g.get('confirmPassword').value
  //       ? null : {mismatch: true};
  // }

  signupForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }

  signupNext() {
    const data = {
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value
    };
    this.dataService.serviceProviderSignupData.firstName = data.firstName;
    this.dataService.serviceProviderSignupData.lastName = data.lastName;
    this.dataService.serviceProviderSignupData.email = data.email;
    this.dataService.serviceProviderSignupData.password = data.password;
    this.router.navigateByUrl('/basic-info-page');
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPass').value;

  return pass === confirmPass ? null : { notSame: true };
}

// this.myForm = this.fb.group({
//   password: ['', [Validators.required]],
//   confirmPassword: ['']
// }, {validator: this.checkPasswords })

  // validatePassword() {
  //   if(this.password != this.confirmPassword) {
  //     this.confirmPassword.setCustomValidity("Passwords Don't Match");
  //   } else {
  //     this.confirmPassword.setCustomValidity('');
  //   }
  // }
}
