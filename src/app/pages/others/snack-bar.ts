import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-snack-bar-dailog',
    templateUrl: '../../pages/others/snack-bar-dailog.html',
    styles: []
  })
  export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
