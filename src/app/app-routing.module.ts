import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HairPageComponent } from './hair-page/hair-page.component';
import { HomeComponent } from './home/home.component'



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hair', component: HairPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
