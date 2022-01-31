import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../_models/card';
import { CardPack } from '../../_models/card-pack';
import { CardSet } from '../../_models/card-set';
import { CardPackService } from '../../_services/card-pack.service';
import { CardService } from '../../_services/card.service';
import { CardDetailComponent } from '../card-detail/card-detail.component';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {
  @ViewChild('cardDetailComponent')
  cardDetailComponent: CardDetailComponent;
  cardSets: CardSet[];
  cardPack = new CardPack;

  constructor(
    private cardService: CardService,
    private cardPackService: CardPackService) { }

  ngOnInit() {
    this.getCardSets();
  }

  getCardSets(): void {
    this.cardService.getCardSets()
      .subscribe(cardSets =>
        this.cardSets = cardSets);
  }

  getCardPack(cardSetID: number): void {
    const requestedCardSet = this.cardService
      .getCardSetById(cardSetID);
    this.cardPack = this.cardPackService
      .getCardPack(requestedCardSet);
  }

  revealCard($event: Event, card: Card): void {
    if ($event.currentTarget['src'].endsWith('cardback.png')) {
      $event.currentTarget['src'] = `assets/cards/${card.file_name}.png`;
    }
  }

  onClick(card: Card): void {
    this.cardDetailComponent.showDetailModal(card);
  }
}
