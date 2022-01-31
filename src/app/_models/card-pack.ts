import { Card, CardType } from './card';

export class CardPack {
  cards: Card[];
  cardsPerPack: number;

  minRares: number;
  minUncommons: number;

  maxHeroes: number;
  maxItems: number;

  constructor() {
    this.cards = [];
    this.cardsPerPack = 12;

    this.minRares = 1;
    this.minUncommons = 3;

    this.maxHeroes = 1;
    this.maxItems = 2;
  }

  hasCard(card: Card): Card | undefined {
    return this.cards.find(c => c.id === card.id);
  }

  reachedMaxHeroes(card: Card): boolean {
    return card.card_type === CardType.Hero && this.maxHeroes === 0;
  }

  reachedMaxItems(card: Card): boolean {
    return card.card_type === CardType.Item && this.maxItems === 0;
  }
}
