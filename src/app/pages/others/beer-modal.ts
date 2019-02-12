import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-beer-overview-dialog',
    templateUrl: '../../pages/others/beer.modal.html',
    styleUrls: ['../../pages/others/beer.modal.css']
  })
  export class BeerOverviewDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<BeerOverviewDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public beer: any
    ) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
