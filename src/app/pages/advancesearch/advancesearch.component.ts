import { Component, OnInit} from '@angular/core';
import { GetBeersService, FavouriteService } from '../../services';
import { MatDialog, DialogPosition, MatSnackBar} from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { SnackBarComponent } from '../others/snack-bar';
import { BeerOverviewDialogComponent } from 'src/app/pages/others/beer-modal';

@Component({
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styleUrls: ['./advancesearch.component.css']
})
export class AdvancesearchComponent implements OnInit {

  constructor(
    private beerService: GetBeersService,
    private favService: FavouriteService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private snackBar: MatSnackBar) { }
  
  mxavb = 100;
  mnavb = 0;
  breakpoint: number;
  isActive: false;
  dailogPosition: DialogPosition;
  page: any = 1;
  loading: Boolean = true;
  search_param: String = '';
  search_results: any[];
  searching: Boolean = false;


  ngOnInit() {
    if (window.innerWidth < 640) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 641 && window.innerWidth < 1007) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 1008) {
      this.breakpoint = 3;
    }
  }

  maxAVB(value: number | null) {
      this.mxavb = value;
      return Math.round(value) + '%';
    }
    minAVB(value: number | null) {
      this.mnavb = value;
      return Math.round(value) + '%';
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

    search() {
      
        this.searching = true;
        this.search_results = [];
        this.search_param = this.search_param.split(' ').join('_');
        console.log(this.search_param);
        this.beerService.searchBeerWithAVB(this.mxavb, this.mnavb).subscribe((data: any) => {
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
    clearResult() {
      this.search_results = null;
    }
    openSnackBar(msg) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 2000,
        data: msg
      });
    }
   
   
}
