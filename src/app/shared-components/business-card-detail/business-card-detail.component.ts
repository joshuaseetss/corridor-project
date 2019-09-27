import { Component, OnInit } from '@angular/core';
import { BusinessCard } from '../business-card/business-card.model';

@Component({
  selector: 'app-business-card-detail',
  templateUrl: './business-card-detail.component.html',
  styleUrls: ['./business-card-detail.component.css']
})
export class BusinessCardDetailComponent implements OnInit {
  businessCard: BusinessCard;

  constructor() { }

  ngOnInit() {
    let localStorageBusinessCard = localStorage.getItem('businessCardDetailObject');

    if (localStorageBusinessCard) {
      this.businessCard = JSON.parse(localStorageBusinessCard);
    }
  }

}
