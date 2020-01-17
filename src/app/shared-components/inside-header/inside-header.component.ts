import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inside-header',
  templateUrl: './inside-header.component.html',
  styleUrls: ['./inside-header.component.css']
})
export class InsideHeaderComponent implements OnInit, OnDestroy {

  collapsed: false;
  private authStatusSub: Subscription;
  isUserAuthenticated = false;
  userData: any;
  firstName = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.userData = this.authService.getUserData();
    this.firstName = this.userData && this.userData.firstName;

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.isUserAuthenticated = auth;
      this.userData = this.authService.getUserData();
      this.firstName = this.userData && this.userData.firstName;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
