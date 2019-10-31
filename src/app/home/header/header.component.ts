import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
    
})

export class HeaderComponent{
    collapsed = false;
    wrapperClasses = '';
    overlayClasses = 'overlay';
    hamburgerClasses = 'hamburger is-closed';

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