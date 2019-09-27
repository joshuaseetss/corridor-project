import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HairPageComponent } from './hair-page/hair-page.component';
import { HomeComponent } from './home/home.component'
import { BusinessCardDetailComponent } from './shared-components/business-card-detail/business-card-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hair', component: HairPageComponent},
  { path: 'business-card-detail', component: BusinessCardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
