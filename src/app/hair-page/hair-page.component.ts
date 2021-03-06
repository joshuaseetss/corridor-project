import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessCard } from '../shared-components/business-card/business-card.model';
import { default as businessCardsData } from '../shared-components/business-cards.data';
import { ServiceProviderService } from '../service-provider.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-hair-page',
  templateUrl: './hair-page.component.html',
  styleUrls: ['./hair-page.component.css']
})
export class HairPageComponent implements OnInit {

  businessCards: Array<BusinessCard> = [];
  businessData: [];

  constructor(
    private router: Router, private route: ActivatedRoute, private providerService: ServiceProviderService,
    private dataService: DataService
  ) {
    this.route.queryParamMap.subscribe((response: any) => {
      if (response.params && response.params.q) {
        this.providerService.fetchServiceProviderList({ category: response.params.q }).subscribe((response) => {
          this.businessData = response.data;
          this.dataService.setServiceProviderData(response.data);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

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
      let newBusinessCard = new BusinessCard();
      fieldsToPopulate.forEach(fieldToPopulate => {
        newBusinessCard[fieldToPopulate] = businessCard[fieldToPopulate];
      });
      that.businessCards.push(newBusinessCard);
    });
  }

  goToBusinessCardDetail(index: number) {
    localStorage.setItem('businessCardDetailObject', JSON.stringify(this.businessCards[index]));
    localStorage.setItem('provider', this.businessData[index]['_id']);
    this.dataService.selectedProvider = index + '';
    this.router.navigate(['/business-card-detail/']);
  }
}
