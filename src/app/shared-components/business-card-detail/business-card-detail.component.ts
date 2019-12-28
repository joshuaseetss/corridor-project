import { Component, OnInit } from '@angular/core';
import { BusinessCard } from '../business-card/business-card.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-business-card-detail',
  templateUrl: './business-card-detail.component.html',
  styleUrls: ['./business-card-detail.component.css']
})
export class BusinessCardDetailComponent implements OnInit {
  
  businessData: any;
  businessCard: BusinessCard;
  services = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    let localStorageBusinessCard = localStorage.getItem('businessCardDetailObject');

    if (localStorageBusinessCard) {
      this.businessCard = JSON.parse(localStorageBusinessCard);
    }

    this.businessData = this.dataService.serviceProviderData;
    this.services.push(this.businessData.service1);
    this.services.push(this.businessData.service2);
    console.log(this.businessData);
  }

}
