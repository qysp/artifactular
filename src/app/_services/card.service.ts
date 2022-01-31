import { Injectable } from '@angular/core';
import { manifest as ArtifactDB } from 'artifactdb';
import { Observable, of } from 'rxjs';
import { Card } from '../_models/card';
import { CardSet } from '../_models/card-set';
import * as HashNames from '../_assets/hash_names.json';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardSetsCache$: Observable<CardSet[]>;

  constructor() { }

  getCardSets(): Observable<CardSet[]> {
    if (!this.cardSetsCache$) {
      this.cardSetsCache$ = new Observable<CardSet[]>(observer => {
        const cardSets: CardSet[] = ArtifactDB.Sets
          // The index represents the ID of each card set, starting at 1
          .map((cardSet, index) => new CardSet(cardSet, ++index));

        // Set hash names for cards available on the Steam Community Market
        HashNames.card_sets
          .forEach(cardSet => cardSets
            .find(cs => cs.id === cardSet.set_id).cards
              .forEach((card: Card) => {
                const hashName = cardSet.hash_names
                  .find(hn => hn.name === card.name);
                if (hashName) {
                  card.hash_name = hashName.hash;
                }
              }));
        observer.next(cardSets);
      });
    }
    return this.cardSetsCache$;
  }

  getCardSetById(cardSetID: number): CardSet {
    let requestedCardSet: CardSet;
    this.getCardSets()
      .subscribe(cardSets => requestedCardSet = cardSets
        .find(cardSet => cardSet.id === cardSetID));
    return requestedCardSet;
  }

  getCardById(cardSetID: number, cardID: number): Card {
    return this.getCardSetById(cardSetID).cards
      .find(card => card.id === cardID);
  }

  searchCardByName(term: string): Observable<Card[]> {
    if (term.trim().length < 2) {
      return of([]);
    }

    const termRE = RegExp(term);
    const cards: Card[] = [];

    this.getCardSets()
      .subscribe(cardSets => cardSets
        .forEach(cardSet => cards.concat(cardSet.cards
          .filter(card => termRE.test(card.name)))));

    return new Observable<Card[]>(
      observer => observer.next(cards));
  }
}
