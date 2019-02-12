import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
// my components
import { AppComponent } from './app.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { SnackBarComponent } from './pages/others/snack-bar';
import { BeerOverviewDialogComponent } from 'src/app/pages/others/beer-modal';

// my modules
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

// my providers
import { GetBeersService, FavouriteService } from '../app/services';
import { MyfavouriteComponent } from '../app/pages/myfavourite/myfavourite.component';
import { AdvancesearchComponent } from '../app/pages/advancesearch/advancesearch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BeerOverviewDialogComponent,
    SnackBarComponent,
    MyfavouriteComponent,
    AdvancesearchComponent
  ],

  entryComponents: [BeerOverviewDialogComponent, SnackBarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,

    // my modules
    AppRoutingModule,
    MaterialModule
  ],
  providers: [GetBeersService, FavouriteService],
  bootstrap: [AppComponent]
})
export class AppModule {}
