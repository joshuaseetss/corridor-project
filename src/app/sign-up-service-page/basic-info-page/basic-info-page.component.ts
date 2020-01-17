import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info-page',
  templateUrl: './basic-info-page.component.html',
  styleUrls: ['./basic-info-page.component.css']
})
export class BasicInfoPageComponent implements OnInit {
  collapsed = false;
  signupBasicInfoForm: FormGroup;
  categoryArray = [
    { label: 'Hair', value: 'hair' },
    { label: 'Facial', value: 'facial' },
    { label: 'Brows and Lashes', value: 'browsandlashes' },
    { label: 'Makeup', value: 'makeup' },
    { label: 'Nails', value: 'nails' }
  ];

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

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.signupBasicInfoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      serviceCategories: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      tags: new FormControl(''),
      openingHours: new FormControl('')
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

  signupNext() {
    const data = {
      name: this.signupBasicInfoForm.get('name').value,
      address: this.signupBasicInfoForm.get('address').value,
      postalCode: this.signupBasicInfoForm.get('postalCode').value,
      serviceCategories: this.signupBasicInfoForm.get('serviceCategories').value,
      description: this.signupBasicInfoForm.get('description').value,
      tags: this.signupBasicInfoForm.get('tags').value
    };

    this.dataService.serviceProviderSignupData.name = this.signupBasicInfoForm.get('name').value;
    this.dataService.serviceProviderSignupData.address = this.signupBasicInfoForm.get('address').value;
    this.dataService.serviceProviderSignupData.postalCode = this.signupBasicInfoForm.get('postalCode').value;
    this.dataService.serviceProviderSignupData.serviceCategories = this.signupBasicInfoForm.get('serviceCategories').value;
    this.dataService.serviceProviderSignupData.description = this.signupBasicInfoForm.get('description').value;
    this.dataService.serviceProviderSignupData.tags = this.signupBasicInfoForm.get('tags').value;
    this.dataService.serviceProviderSignupData.openingHours = this.openingHours;

    this.router.navigateByUrl('/sign-up-photo');
  }
}
