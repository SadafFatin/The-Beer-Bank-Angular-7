import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { MyfavouriteComponent } from '../app/pages/myfavourite/myfavourite.component';
import { AdvancesearchComponent } from '../app/pages/advancesearch/advancesearch.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'myfav',
    component: MyfavouriteComponent

  },
  {
    path: 'advance',
    component: AdvancesearchComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
