import { Component, OnInit } from '@angular/core';
import { BusinessCard } from '../business-card/business-card.model';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from 'src/app/review/review.component';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private dataService: DataService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    let localStorageBusinessCard = localStorage.getItem('businessCardDetailObject');

    if (localStorageBusinessCard) {
      this.businessCard = JSON.parse(localStorageBusinessCard);
    }

    if (this.dataService.selectedProvider) {
      this.businessData = this.dataService.serviceProviderData[this.dataService.selectedProvider];
    } else {
      this.businessData = this.dataService.serviceProviderData;
    }

    this.userData = this.authService.getUserData();
    this.dataService.getReviews({ email: this.businessData.email }).subscribe(
      (response) => {
        this.reviews = response.data;
      });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.businessData = this.dataService.serviceProviderData;

      this.dataService.getReviews({ email: this.businessData.email }).subscribe(
        (response) => {
          this.reviews = response.data;
        });
    });
  }

  addReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewComponent, {
      data: {reviewSuccess: this.reviewSuccess}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
