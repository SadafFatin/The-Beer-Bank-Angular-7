import { Component, OnInit, Inject } from '@angular/core';
import { FavouriteService } from '../../services';
import { MatDialog, DialogPosition, MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { BeerOverviewDialogComponent } from 'src/app/pages/others/beer-modal';
import { SnackBarComponent } from 'src/app/pages/others/snack-bar';

@Component({
  selector: 'app-myfavourite',
  templateUrl: './myfavourite.component.html',
  styleUrls: ['./myfavourite.component.css']
})
export class MyfavouriteComponent implements OnInit {

  favouriteItems: any[] = [];
  breakpoint: number;
  isActive: false;
  dailogPosition: DialogPosition;
  loading: Boolean = true;


  constructor(

    private favService: FavouriteService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFavourite();
    if (window.innerWidth < 640) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 641 && window.innerWidth < 1007) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 1008) {
      this.breakpoint = 3;
    }

  }

  onResize(event) {
    console.log(window.innerWidth);
    if (window.innerWidth < 640) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 641 && window.innerWidth < 1007) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 1008) {
      this.breakpoint = 3;
    }
  }




  removeFromFavourite(beer) {
    this.favService.removeFromFavourite(beer);
    this.getFavourite();
    this.openSnackBar('Removed Item From Favourites');
  }


  getFavourite() {
    this.favouriteItems = this.favService.getFavourite();
  }

  selectBeer(beer: any) {
    beer.simillarBeers = true;
    const dialogRef = this.dialog.open(BeerOverviewDialogComponent, {
      width: '500px',
      minWidth: '425px',
      maxHeight: '600',
      closeOnNavigation: true,
      data: beer,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      position: { top: '68px' }
    });
  }
  openSnackBar(msg) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 500,
      data: msg
    });
  }



}




