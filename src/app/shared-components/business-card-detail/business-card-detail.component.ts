import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BusinessCard } from '../business-card/business-card.model';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from 'src/app/review/review.component';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-card-detail',
  templateUrl: './business-card-detail.component.html',
  styleUrls: ['./business-card-detail.component.css']
})
export class BusinessCardDetailComponent implements OnInit {
  
  businessData: any;
  businessCard: BusinessCard;
  services = [];
  prices = [];
  reviews = [];
  reviewSuccess = false;
  userData;

  private authStatusSub: Subscription;

  constructor(private dataService: DataService, 
    public dialog: MatDialog, 
    private authService: AuthService) { }

  ngOnInit() {
    // let localStorageBusinessCard = localStorage.getItem('businessCardDetailObject');

    // if (localStorageBusinessCard) {
    //   this.businessCard = JSON.parse(localStorageBusinessCard);
    // }

    if(this.dataService.getServiceProviderData() && this.dataService.getServiceProviderData().hasOwnProperty('email')) {
      if (this.dataService.selectedProvider) {
        this.businessData = this.dataService.getServiceProviderData()[this.dataService.selectedProvider];
      } else {
        this.businessData = this.dataService.getServiceProviderData();
      }
    } else {
      if (localStorage.getItem('provider')) {
        this.dataService.getServiceProviderById({ id: localStorage.getItem('provider')}).subscribe(response => {
          this.businessData = response.data;
          this.dataService.setServiceProviderData(response.data);
          this.getData();
        },
        error => {
          console.log(error);
        });
      } else {
        this.authService.logout();
      }
    }

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.getData();
    });
  }

  getData() {
    this.userData = this.authService.getUserData();

    if(!this.userData) {
      this.authService.logout();
    }

    this.dataService.getReviews({ email: this.businessData.email }).subscribe(
    (response) => {
      this.reviews = response.data;
    });
  }

  addReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewComponent, {
      data: {reviewSuccess: this.reviewSuccess}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.getReviews({ email: this.businessData.email }).subscribe(
        (response) => {
          this.dataService.getServiceProviderById({ id: localStorage.getItem('provider')}).subscribe(res => {
            this.businessData = res.data;
            this.dataService.setServiceProviderData(res.data);
            this.getData();
          },
          error => {
            console.log(error);
          });
      });
    });
  }

}
