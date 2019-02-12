
import { Beer } from '../../model/beer';


export class FavouriteService {
  favouriteItems: any[] = [];
  constructor() { }

  addToFavourite(item) {
    this.favouriteItems.push(item);
  }
  
  removeFromFavourite(item) {
    if (this.favouriteItems.indexOf(item) !== -1) {
      this.favouriteItems.splice(this.favouriteItems.indexOf(item), 1);
      }
  }


  getFavourite(): Beer[] {
    return this.favouriteItems;
  }




}
