import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userData: any;
  isPasswordError = false;
  isProfileError = false;
  isProfileUpdated = false;
  imagePreview;
  imageObj;
  isImageUploaded = false;
  portfolioObj = [];
  maxImageError = false;
  categoryArray = [
    { label: 'Hair', value: 'hair' },
    { label: 'Facial', value: 'facial' },
    { label: 'Brows and Lashes', value: 'browsandlashes' },
    { label: 'Makeup', value: 'makeup' },
    { label: 'Nails', value: 'nails' }
  ];

  addServiceError = false;
  services = [];
  serviceName: string;
  servicePrice: string;

  start = ['', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  end = this.start;

  openingHours = [
    { day: 'Monday', start: '', end: '', isClosed: false },
    { day: 'Tuesday', start: '', end: '', isClosed: false },
    { day: 'Wednesday', start: '', end: '', isClosed: false },
    { day: 'Thursday', start: '', end: '', isClosed: false },
    { day: 'Friday', start: '', end: '', isClosed: false },
    { day: 'Saturday', start: '', end: '', isClosed: false },
    { day: 'Sunday', start: '', end: '', isClosed: false }
  ];

  private profileSub: Subscription;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userData = this.authService.getUserData();

    if(this.userData) {
      this.services = this.userData.services;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.userData.firstName,[Validators.required]),
        lastName: new FormControl(this.userData.lastName,[Validators.required]),
        email: new FormControl(this.userData.email,[Validators.required, Validators.email]),
        phone: new FormControl(this.userData.phone,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]*$/)]),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        image: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] }),
        name: new FormControl(this.userData.name, [Validators.required]),
        address: new FormControl(this.userData.address, [Validators.required]),
        postalCode: new FormControl(this.userData.postalCode, [Validators.required]),
        serviceCategories: new FormControl(this.userData.serviceCategories, [Validators.required]),
        description: new FormControl(this.userData.description),
        tags: new FormControl(this.userData.tags),
        portFolioImage: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] }),
        serviceName: new FormControl(''),
        servicePrice: new FormControl(''),
        openingHours: new FormControl('')
      });
    }

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.userData = this.authService.getUserData();
      this.services = this.userData.services;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.userData.firstName,[Validators.required]),
        lastName: new FormControl(this.userData.lastName,[Validators.required]),
        email: new FormControl(this.userData.email,[Validators.required, Validators.email]),
        phone: new FormControl(this.userData.phone,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]*$/)]),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        image: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] }),
        name: new FormControl(this.userData.name, [Validators.required]),
        address: new FormControl(this.userData.address, [Validators.required]),
        postalCode: new FormControl(this.userData.postalCode, [Validators.required]),
        serviceCategories: new FormControl(this.userData.serviceCategories, [Validators.required]),
        description: new FormControl(this.userData.description),
        tags: new FormControl(this.userData.tags),
        portFolioImage: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] }),
        serviceName: new FormControl(''),
        servicePrice: new FormControl(''),
        openingHours: new FormControl('')
      });
    });
  }

  updateStart(event, i) {
    this.openingHours[i].start = event.value;
  }

  updateEnd(event, i) {
    this.openingHours[i].end = event.value;
  }

  updateClose(event, i) {
    if (event.checked) {
      this.openingHours[i].start = '';
      this.openingHours[i].end = '';
      this.openingHours[i].isClosed = true;
    } else {
      this.openingHours[i].isClosed = false;
    }
  }

  addService() {
    this.services.push({
      name: this.profileForm.get('serviceName').value,
      price: this.profileForm.get('servicePrice').value
    });

    this.profileForm.patchValue({
      serviceName: '',
      servicePrice: ''
    });
  }

  deleteService(index) {
    this.services.splice(index, 1);
  }

  onImageUpload(event: Event) {
    const fileObj: any = {};
    fileObj.file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({
      image: fileObj.file
    });
    this.profileForm.get('image').updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result !== '' && fileReader.result) {
        fileObj.url = fileReader.result;
        this.userData.profilePhoto = fileObj.url;
        this.isImageUploaded = true;
      }
    };
    fileReader.readAsDataURL(fileObj.file);
    this.imageObj = fileObj.file;
  }

  onPortfolioUpdate(event: Event) {
    if (this.userData.portfolio.length === 4) {
      this.maxImageError = true;
      return;
    } else {
      const fileObj: any = {};
      fileObj.file = (event.target as HTMLInputElement).files[0];
      this.profileForm.patchValue({
        image: fileObj.file
      });
      this.profileForm.get('portFolioImage').updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result !== '' && fileReader.result) {
          fileObj.url = fileReader.result;
          this.userData.portfolio.push(fileObj.url);
        }
      };
      fileReader.readAsDataURL(fileObj.file);
      this.portfolioObj.push(fileObj.file);
    }
  }

  deleteImage(index) {
    this.userData.portfolio.splice(index, 1);
  }

  save() {
    if ((this.profileForm.get('password').value !== '' && this.profileForm.get('confirmPassword').value === '')
        || (this.profileForm.get('confirmPassword').value !== '' && this.profileForm.get('password').value === '')) {
      this.isPasswordError = true;
    } else {
      const userData = new FormData();

      userData.append('userType', this.userData.userType);
      userData.append('firstName', this.profileForm.get('firstName').value);
      userData.append('lastName', this.profileForm.get('lastName').value);
      userData.append('email', this.profileForm.get('email').value);
      userData.append('phone', this.profileForm.get('phone').value);

      if(typeof(this.userData.profilePhoto) === 'string') {
        let blob = null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.userData.profilePhoto);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          blob = xhr.response;
          userData.append('profilePhoto', blob);
          if (this.profileForm.get('password').value !== '') {
            userData.append('password', this.profileForm.get('password').value);
          }

          if (this.userData.userType === 'serviceProvider') {
            this.fetchFileFromImage(userData);
          } else {
            this.authService.updateProfile(userData);
          }
        };
        xhr.send();
      } else {
        userData.append('profilePhoto', this.imageObj);
        if (this.profileForm.get('password').value !== '') {
          userData.append('password', this.profileForm.get('password').value);
        }

        if (this.userData.userType === 'serviceProvider') {
          this.fetchFileFromImage(userData);
        } else {
          this.authService.updateProfile(userData);
        }
      }
    }

    this.authService.getProfileUpdateListner().subscribe(profileUpdated => {
      if (profileUpdated) {
        this.isProfileUpdated = true;
      } else {
        this.isProfileError = true;
      }
    });
  }

  fetchFileFromImage(userData) {
    let count = 0;
    if (this.userData.portfolio.length > 0) {
      let blob = null;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.userData.portfolio);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        blob = xhr.response;
        count++;
        userData.append('portfolio', blob);
        if ((count + 1) < this.userData.portfolio.length) {
          this.fetchFileFromImage(userData);
        } else {
          userData.append('name', this.profileForm.get('name').value);
          userData.append('address', this.profileForm.get('address').value);
          userData.append('postalCode', this.profileForm.get('postalCode').value);

          this.profileForm.get('serviceCategories').value.forEach(category => {
            userData.append('serviceCategories', category);
          });

          userData.append('description', this.profileForm.get('description').value);
          userData.append('tags', this.profileForm.get('tags').value);

          this.openingHours.forEach(oh => {
            userData.append('openingHours', JSON.stringify(oh));
          });

          this.services.forEach(service => {
            userData.append('services', JSON.stringify({ name: service.name, price: service.price }));
          });

          this.authService.updateProfile(userData);
        }
      };
      xhr.send();
    }
  }

}
