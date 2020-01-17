import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { mimeType } from 'src/app/mime-type.validator';

@Component({
  selector: 'app-customer-sign-up-page',
  templateUrl: './customer-sign-up-page.component.html',
  styleUrls: ['./customer-sign-up-page.component.css']
})
export class CustomerSignUpPageComponent implements OnInit {

  signupForm: FormGroup;
  signupComplete = false;
  signupCompleteMessage: string;
  signupError = false;
  imagePreview;
  imageObj;
  isImageUploaded = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]*$/)]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      image: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] })
    });
  }

  onImageUpload(event: Event) {
    const fileObj: any = {};
    fileObj.file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({
      image: fileObj.file
    });
    this.signupForm.get('image').updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result !== '' && fileReader.result) {
        fileObj.url = fileReader.result;
        this.imagePreview = fileObj.url;
        this.isImageUploaded = true;
      }
    };
    fileReader.readAsDataURL(fileObj.file);
    this.imageObj = fileObj.file;
  }

  signup() {
    const userData = new FormData();
    userData.append('firstName', this.signupForm.get('firstName').value);
    userData.append('lastName', this.signupForm.get('lastName').value);
    userData.append('email', this.signupForm.get('email').value);
    userData.append('phone', this.signupForm.get('phone').value);
    userData.append('password', this.signupForm.get('password').value);
    userData.append('profilePhoto', this.imageObj);

    this.authService.customerSignup(userData).subscribe(
      (response) => {
        this.signupComplete = true;
        this.signupCompleteMessage = response.message;
      },
      (e) => {
        this.signupError = true;
        this.signupComplete = true;
        this.signupCompleteMessage = e.error.message || 'Internal Server Error';
      }
    );
  }
}
