import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { PriceServicePageComponent } from './sign-up-service-page/price-service-page/price-service-page.component';
import { SignUpPhotosPageComponent } from './sign-up-service-page/sign-up-photos-page/sign-up-photos-page.component';
import { BasicInfoPageComponent } from './sign-up-service-page/basic-info-page/basic-info-page.component';
import { SignUpPageComponent } from './sign-up-service-page/sign-up-page/sign-up-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router } from '@angular/router';
import { HairPageComponent } from './hair-page/hair-page.component';
import { HomeComponent } from './home/home.component'
import { BusinessCardDetailComponent } from './shared-components/business-card-detail/business-card-detail.component';
import { ApplicationStateService } from './application-state.service'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hair', component: HairPageComponent},
  { path: 'business-card-detail', component: BusinessCardDetailComponent },
  { path: 'sign-up-page', component: SignUpPageComponent },
  { path: 'basic-info-page', component: BasicInfoPageComponent },
  { path: 'sign-up-photo', component: SignUpPhotosPageComponent },
  { path: 'price-service', component: PriceServicePageComponent },
  { path: 'login-page', component: LoginPageComponent }
];

const mobile_Routes: Routes = [
  { path: '', component: HomeMobileComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobile_Routes);
    }
  }
}
