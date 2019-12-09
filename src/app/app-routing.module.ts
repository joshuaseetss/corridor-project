import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router } from '@angular/router';
import { HairPageComponent } from './hair-page/hair-page.component';
import { HomeComponent } from './home/home.component'
import { BusinessCardDetailComponent } from './shared-components/business-card-detail/business-card-detail.component';
import { ApplicationStateService } from './application-state.service'



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hair', component: HairPageComponent},
  { path: 'business-card-detail', component: BusinessCardDetailComponent }
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
