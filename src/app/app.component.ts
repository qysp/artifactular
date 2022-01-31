import { Observable, Subject } from 'rxjs';
import { Card } from './_models/card';
import { CardService } from './_services/card.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cards$: Observable<Card[]>;
  private searchTerms = new Subject<string>();

  constructor(private cardService: CardService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cards$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cardService.searchCardByName(term))
    );
  }
}
