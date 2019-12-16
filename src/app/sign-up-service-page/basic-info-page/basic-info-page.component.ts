import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-info-page',
  templateUrl: './basic-info-page.component.html',
  styleUrls: ['./basic-info-page.component.css']
})
export class BasicInfoPageComponent implements OnInit {
  collapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
