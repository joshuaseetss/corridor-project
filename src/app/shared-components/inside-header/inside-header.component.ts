import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inside-header',
  templateUrl: './inside-header.component.html',
  styleUrls: ['./inside-header.component.css']
})
export class InsideHeaderComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;
  isUserAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.isUserAuthenticated = auth;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
