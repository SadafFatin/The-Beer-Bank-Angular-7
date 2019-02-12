import { Component, OnInit} from '@angular/core';
import { GetBeersService, FavouriteService } from '../../services';
import { MatDialog, DialogPosition, MatSnackBar} from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { SnackBarComponent } from '../others/snack-bar';
import { BeerOverviewDialogComponent } from 'src/app/pages/others/beer-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beers: any[] = [];
  breakpoint: number;
  isActive: false;
  dailogPosition: DialogPosition;
  page: any = 1;
  loading: Boolean = true;
  search_param: String = '';
  search_results: any[];
  searching: Boolean = false;

  constructor(
    private beerService: GetBeersService,
    private favService: FavouriteService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (window.innerWidth < 640) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 641 && window.innerWidth < 1007) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 1008) {
      this.breakpoint = 3;
    }
    this.getBeers();
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

  onScroll() {
    this.loading = true;
    this.page = this.page + 1;
    this.getBeers();
    console.log('Scrolled' + this.page);
  }

  getBeers() {
    this.beerService.getBeers(this.page).subscribe(
      (data: any) => {
        console.log(data);
        if (this.beers) {
          Array.prototype.push.apply(this.beers, data);
        } else {
          this.beers = data;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  selectBeer(beer: any) {
    const dialogRef = this.dialog.open(BeerOverviewDialogComponent, {
      width: '500px',
      minWidth: '425px',
      maxHeight: '600',
      closeOnNavigation: true,
      data: beer,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      position: { top: '68px' }
    });

    this.beerService.getSimillarBeers(beer.id).subscribe((data: any) => {
      dialogRef.componentInstance.beer.simillarBeers = data;
    });
  }
  addToFav(beer) {
    if (beer.isFav) {
      beer.isFav = false;
      beer.color = '';
      this.favService.removeFromFavourite(beer);
      this.openSnackBar('Removed Item From Favourites');
    } else {
      beer.isFav = true;
      beer.color = 'accent';
      this.favService.addToFavourite(beer);
      this.openSnackBar('Added Item Into Favourites');
    }
  }

  search() {
    if (!this.search_param) {
      this.openSnackBar('Please provide beer name for search');
     
    } else {
      this.searching = true;
      this.search_results = [];
      this.search_param = this.search_param.split(' ').join('_');
      console.log(this.search_param);
      this.beerService.searchBeer(this.search_param).subscribe((data: any) => {
        console.log(data);
        if (data.length === 0) {
          this.search_results = null;
          this.searching = false;
          this.openSnackBar('Could Not Find Anything !!!');
        } else {
          this.searching = false;
          this.search_results = data;
        }
      },
        err => {
          this.search_results = null;
          this.searching = false;
          this.openSnackBar('Something Went Wrong TryAgain !!!');
        });
    }
  }
  clearResult() {
    this.search_results = null;
  }
  makeActive(beer: any) {
    beer.isActive = true;
  }
  makeDisable(beer: any) {
    beer.isActive = false;
  }
  openSnackBar(msg) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: msg
    });
  }

  /*constructABeer(beer) {
    return new Beer(beer.abv,
      beer.attenuation_level,
      beer.description, beer.ebc,
      beer.food_pairing,
      beer.ibu,
      beer.id,
      beer.image_url, beer.name, beer.ph, beer.srm, beer.tagline, beer.isFav);

  }*/
}
