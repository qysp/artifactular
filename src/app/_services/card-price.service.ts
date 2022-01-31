import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface SteamResponse {
  success: boolean;
  lowest_price?: string;
  volume?: string;
  median_price?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardPriceService {
  // Returns a JSON with the type of `Response`
  readonly steamUrl = 'https://www.steamcommunity.com/market/priceoverview/';
  // Artifact application ID
  readonly appID = '583950';

  constructor(private http: HttpClient) { }

  getCardPrice(
      hash_name: string | number,
      currency: string | number = '3'): Observable<SteamResponse> {

    const params = new HttpParams()
      .set('appid', this.appID)
      .set('currency', currency.toString())
      .set('market_hash_name', hash_name.toString());

    return this.http.get<SteamResponse>(this.steamUrl, {
      params: params
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Steam returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
