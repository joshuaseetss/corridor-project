import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
    
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = false;
    wrapperClasses = '';
    overlayClasses = 'overlay';
    hamburgerClasses = 'hamburger is-closed';

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

    hamburgerClick() {
        if (this.collapsed) {
            this.overlayClasses = 'overlay';
            this.hamburgerClasses = 'hamburger is-closed';
            this.collapsed = false;
        } else {
            this.overlayClasses = 'overlay visible';
            this.hamburgerClasses = 'hamburger is-open';
            this.collapsed = true;
        }

        if (this.wrapperClasses.indexOf('toggled') > -1) {
            this.wrapperClasses = '';
        } else {
            this.wrapperClasses = 'toggled';
        }
    }
}