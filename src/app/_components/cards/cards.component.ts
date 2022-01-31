import { CardDetailComponent } from './../card-detail/card-detail.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../_models/card';
import { CardSet } from '../../_models/card-set';
import { CardService } from '../../_services/card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @ViewChild('cardDetailComponent')
  cardDetailComponent: CardDetailComponent;
  cardSets: CardSet[];

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.getCardSets();
  }

  getCardSets(): void {
    this.cardService.getCardSets()
      .subscribe(cardSets => this.cardSets = cardSets);
  }

  openFolded($event): void {
    $event.currentTarget.classList.toggle('open');
    $event.currentTarget.nextSibling.classList.toggle('open');
  }

  onClick(card: Card): void {
    this.cardDetailComponent.showDetailModal(card);
  }
}
