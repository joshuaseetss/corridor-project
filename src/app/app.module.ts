import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SearchBarComponent } from './shared-components/search-bar/search-bar.component';
import { CategoryListComponent } from './home/category-list/category-list.component';
import { CategoryItemComponent } from './home/category-list/category-item/category-item.component';
import { HairPageComponent } from './hair-page/hair-page.component';
import { InsideHeaderComponent } from './shared-components/inside-header/inside-header.component';
import { BusinessCardComponent } from './shared-components/business-card/business-card.component'



@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    WarningAlertComponent,
    HomeComponent,
    HeaderComponent,
    CategoryListComponent,
    CategoryItemComponent,
    SearchBarComponent,
    HairPageComponent,
    InsideHeaderComponent,
    BusinessCardComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
