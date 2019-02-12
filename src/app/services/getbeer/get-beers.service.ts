import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'https://api.punkapi.com/v2/beers';
  const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetBeersService {
  

  perPage = 15;
  constructor(private http: HttpClient) { }


  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getBeers(page: any): Observable<any> {
    return this.http.get(endpoint + '?page=' + page + '&per_page=' + this.perPage, httpOptions).pipe(
      map(this.extractData));
  }

  getSimillarBeers(id: any): Observable<any> {
    return this.http.get(endpoint + '?id=' + id, httpOptions).pipe(
      map(this.extractData));
  }

  searchBeer(name) {
    return this.http.get(endpoint + '?beer_name=' + name, httpOptions).pipe(
      map(this.extractData));
  }
  
  searchBeerWithAVB(max, min): any {

    return this.http.get(endpoint + '?abv_lt=' + max + '&&abv_gt=' + min, httpOptions).pipe(
      map(this.extractData));
  }










}
