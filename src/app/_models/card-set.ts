import { Card } from './card';

export class CardSet {
  id: number;
  name: string;
  count: number;
  release_date: Date;
  cards: Card[];

  constructor(cardSet: object, id: number) {
    this.id = id;
    this.name = cardSet['Name'];
    this.count = cardSet['Count'];
    this.release_date = cardSet['ReleaseDate'];
    this.cards = cardSet['Cards']
      .map(card => new Card(card));
  }
}
