import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPass').value;

  return pass === confirmPass ? null : { notSame: true }
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
