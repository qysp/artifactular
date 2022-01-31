import { Injectable } from '@angular/core';
import { Card, CardRarity, CardType } from '../_models/card';
import { CardPack } from '../_models/card-pack';
import { CardSet } from '../_models/card-set';

@Injectable({
  providedIn: 'root'
})
export class CardPackService {

  constructor() { }

  getCardPack(cardSet: CardSet): CardPack {
    const upgrade = (chance: number) => Math.random() > chance;
    const getCardsByRarity = (rarity: string) => cardSet.cards
      .filter(card => card.rarity.name === rarity);

    const cardPack = new CardPack;
    let randomCard: Card;

    while (cardPack.cardsPerPack) {
      const chosenCardSet = getCardsByRarity(this.chooseRarity(cardPack));
      randomCard = this.getRandomCard(chosenCardSet);

      while (randomCard.rarity.next && upgrade(randomCard.rarity.upgrade_chance)) {
        const upgradedCardSet = getCardsByRarity(randomCard.rarity.next);
        randomCard = this.getRandomCard(upgradedCardSet);
      }

      this.addCardToPack(cardPack, randomCard);
    }
    return cardPack;
  }

  getRandomCard(cards: Card[]): Card {
    const randomID = Math.floor(
      Math.random() * cards.length);
    return cards[randomID];
  }

  chooseRarity(cardPack: CardPack): string {
    if (cardPack.minRares > 0) {
      return CardRarity.Rare;
    } else if (cardPack.minUncommons > 0) {
      return CardRarity.Uncommon;
    } else {
      return CardRarity.Common;
    }
  }

  validateCard(cardPack: CardPack, card: Card): boolean {
    return !cardPack.hasCard(card) &&
      !cardPack.reachedMaxHeroes(card) &&
      !cardPack.reachedMaxItems(card) &&
      !card.is_signature_card &&
      !card.token;
  }

  addCardToPack(cardPack: CardPack, card: Card): void {
    if (!this.validateCard(cardPack, card)) {
      return;
    }

    cardPack.cards.push(card);
    cardPack.cardsPerPack--;

    if (card.rarity.name === CardRarity.Rare) {
      cardPack.minRares--;
    } else if (card.rarity.name === CardRarity.Uncommon) {
      cardPack.minUncommons--;
    }

    if (card.card_type === CardType.Hero) {
      cardPack.maxHeroes--;
    } else if (card.card_type === CardType.Item) {
      cardPack.maxItems--;
    }
  }
}
