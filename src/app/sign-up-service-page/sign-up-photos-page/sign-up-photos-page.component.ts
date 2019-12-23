import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mimeType } from 'src/app/mime-type.validator';

@Component({
  selector: 'app-sign-up-photos-page',
  templateUrl: './sign-up-photos-page.component.html',
  styleUrls: ['./sign-up-photos-page.component.css']
})
export class SignUpPhotosPageComponent implements OnInit {

  signupPhotosForm: FormGroup;
  portfolio = [];
  portfolioObj = [];
  maxImageError = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.signupPhotosForm = new FormGroup({
      image: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] })
    });
  }

  signupNext() {
    this.dataService.serviceProviderSignupData.portfolio = this.portfolioObj;
    this.router.navigateByUrl('/price-service');
  }

  onImageUpload(event: Event) {
    if (this.portfolio.length === 4) {
      this.maxImageError = true;
      return;
    } else {
      const fileObj: any = {};
      fileObj.file = (event.target as HTMLInputElement).files[0];
      this.signupPhotosForm.patchValue({
        image: fileObj.file
      });
      this.signupPhotosForm.get('image').updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result !== '' && fileReader.result) {
          fileObj.url = fileReader.result;
        }
      };
      fileReader.readAsDataURL(fileObj.file);
      this.portfolio.push(fileObj);
      this.portfolioObj.push(fileObj.file);
    }
  }

  deleteImage(index) {
    this.portfolio.splice(index, 1);
  }
}
