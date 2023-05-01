import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { PastDetailsComponent } from 'src/components/past-details/past-details.component';

const routes: Routes = [
  {path:'', pathMatch: 'full',component:DashboardComponent},
  {path:'past-details',component:PastDetailsComponent},
  {path:'past-details/:name',component:PastDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
