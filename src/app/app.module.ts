import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';

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
import { BusinessCardComponent } from './shared-components/business-card/business-card.component';
import { BusinessCardDetailComponent } from './shared-components/business-card-detail/business-card-detail.component';
import { SignUpPageComponent } from './sign-up-service-page/sign-up-page/sign-up-page.component';
import { ServiceHeaderComponent } from './shared-components/service-header/service-header.component';
import { BasicInfoPageComponent } from './sign-up-service-page/basic-info-page/basic-info-page.component';
import { SignUpPhotosPageComponent } from './sign-up-service-page/sign-up-photos-page/sign-up-photos-page.component';
import { PriceServicePageComponent } from './sign-up-service-page/price-service-page/price-service-page.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { CustomerLoginPageComponent } from './customer-login/customer-login-page/customer-login-page.component';
import { CustomerSignUpPageComponent } from './customer-sign-up/customer-sign-up-page/customer-sign-up-page.component';
import { CustomerProfilePageComponent } from './customer-sign-up/customer-profile-page/customer-profile-page.component';
import { HomeBusinessLandingPageComponent } from './sign-up-service-page/home-business-landing-page/home-business-landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth-interceptor';

import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    BusinessCardComponent,
    BusinessCardDetailComponent,
    SignUpPageComponent,
    ServiceHeaderComponent,
    BasicInfoPageComponent,
    SignUpPhotosPageComponent,
    PriceServicePageComponent,
    LoginPageComponent,
    CustomerLoginPageComponent,
    CustomerSignUpPageComponent,
    CustomerProfilePageComponent,
    HomeBusinessLandingPageComponent,
    ProfileComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  entryComponents: [
    ReviewComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
