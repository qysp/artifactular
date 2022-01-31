import { CardPriceService, SteamResponse } from './../../_services/card-price.service';
import { Component, ViewChild } from '@angular/core';
import { Card } from '../../_models/card';
import {ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent {
  @ViewChild('detailModal')
  detailModal: ModalDirective;
  card: Card;

  constructor(
    private cardPriceService: CardPriceService) { }

  getCardPrice(card: Card): void {
    if (card.hash_name) {
      this.cardPriceService.getCardPrice(card.hash_name)
        .subscribe((res: SteamResponse) =>
          card.market_infos = { ...res });
    } else {
      // Error pop-up
    }
  }

  showDetailModal(card: Card): void {
    this.card = card;
    this.detailModal.show();
  }
}
