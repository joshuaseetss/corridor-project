import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-photos-page',
  templateUrl: './sign-up-photos-page.component.html',
  styleUrls: ['./sign-up-photos-page.component.css']
})
export class SignUpPhotosPageComponent implements OnInit {

  signupPhotosForm: FormGroup;
  portfolio = [];
  maxImageError = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.signupPhotosForm = new FormGroup({
      image: new FormControl(null, Validators.required)
    });
  }

  signupNext() {
    this.dataService.serviceProviderSignupData.portfolio = this.portfolio;
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
    }
  }

  deleteImage(index) {
    this.portfolio.splice(index, 1);
  }
}
