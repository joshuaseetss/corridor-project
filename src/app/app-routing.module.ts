import { HomeBusinessLandingPageComponent } from './sign-up-service-page/home-business-landing-page/home-business-landing-page.component';
import { CustomerProfilePageComponent } from './customer-sign-up/customer-profile-page/customer-profile-page.component';
import { CustomerSignUpPageComponent } from './customer-sign-up/customer-sign-up-page/customer-sign-up-page.component';
import { CustomerLoginPageComponent } from './customer-login/customer-login-page/customer-login-page.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { PriceServicePageComponent } from './sign-up-service-page/price-service-page/price-service-page.component';
import { SignUpPhotosPageComponent } from './sign-up-service-page/sign-up-photos-page/sign-up-photos-page.component';
import { BasicInfoPageComponent } from './sign-up-service-page/basic-info-page/basic-info-page.component';
import { SignUpPageComponent } from './sign-up-service-page/sign-up-page/sign-up-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HairPageComponent } from './hair-page/hair-page.component';
import { HomeComponent } from './home/home.component'
import { BusinessCardDetailComponent } from './shared-components/business-card-detail/business-card-detail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hair', component: HairPageComponent},
  { path: 'business-card-detail', component: BusinessCardDetailComponent },
  { path: 'sign-up-page', component: SignUpPageComponent },
  { path: 'basic-info-page', component: BasicInfoPageComponent },
  { path: 'sign-up-photo', component: SignUpPhotosPageComponent },
  { path: 'price-service', component: PriceServicePageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'customer-login', component: CustomerLoginPageComponent },
  { path: 'customer-sign-up', component: CustomerSignUpPageComponent },
  { path: 'customer-profile', component: CustomerProfilePageComponent },
  { path: 'home-business-landing-page', component: HomeBusinessLandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
