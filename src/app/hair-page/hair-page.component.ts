import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessCard } from '../shared-components/business-card/business-card.model';
import { default as businessCardsData } from '../shared-components/business-cards.data';

@Component({
  selector: 'app-hair-page',
  templateUrl: './hair-page.component.html',
  styleUrls: ['./hair-page.component.css']
})
export class HairPageComponent implements OnInit {

  businessCards: Array<BusinessCard> = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.populateBusinessCards();
  }

  populateBusinessCards() {
    let that = this;
    let fieldsToPopulate = [
      'name',
      'location',
      'postalCode',
      'phoneNo',
      'rating',
      'noOfReviews',
      'description',
      'imageUrl',
      'avgPricePerPax',
      'images',
      'services',
      'reviews',
      'openingHrs'
    ];
    businessCardsData.forEach(businessCard => {
      let newBusinessCard = new BusinessCard(); //create a new business card model object
      fieldsToPopulate.forEach(fieldToPopulate => {
        newBusinessCard[fieldToPopulate] = businessCard[fieldToPopulate];
      });
      that.businessCards.push(newBusinessCard); //pushing the current business card into the array of business cards
    });
  }

  //navigate to the particular business page of the business card
  goToBusinessCardDetail(index: number) {
    localStorage.setItem('businessCardDetailObject', JSON.stringify(this.businessCards[index]));
    this.router.navigate(['/business-card-detail']);
  }
}
