import { SteamResponse } from '../_services/card-price.service';

export const enum CardRarity {
  Rare = 'Rare',
  Uncommon = 'Uncommon',
  Common = 'Common',
  Basic = 'Basic'
}

export const enum CardType {
  Hero = 'Hero',
  Item = 'Item',
  Creep = 'Creep',
  Spell = 'Spell',
}

class Ability {
  name: string;
  type: string;
  text: string;
  cooldown?: number;

  constructor(ability: object) {
    this.name = ability['Name'];
    this.type = ability['Type'];
    this.text = ability['Text'];
    this.cooldown = ability['Cooldown'];
  }
}


class Rarity {
  public upgrade_chance = 0.95;

  public rarityIDs = {
    [CardRarity.Basic]: 0,
    [CardRarity.Common]: 1,
    [CardRarity.Uncommon]: 2,
    [CardRarity.Rare]: 3
  };

  public rarityNames = {
    0: CardRarity.Basic,
    1: CardRarity.Common,
    2: CardRarity.Uncommon,
    3: CardRarity.Rare
  };

  id: number;
  name: string;
  next: string | undefined;

  constructor(name: string) {
    this.name = name;
    this.id = this.rarityIDs[name];
    this.next = this.name !== CardRarity.Rare
      ? this.rarityNames[this.id + 1]
      : undefined;
  }
}


export class Card {
  id: number;
  name: string;
  card_type: string;
  rarity: Rarity;
  color: string;
  text: string;
  artist: string;
  lore: string;
  file_name: string;
  item_type?: string;
  mana_cost?: number;
  gold_cost?: number;
  cross_lane: boolean;
  abilities?: Ability[];
  attack?: number;
  armor?: number;
  health?: number;
  token?: boolean;
  related_ids?: number[];
  signature_card?: number;
  is_signature_card?: boolean;
  hash_name?: number;
  market_infos?: SteamResponse;

  constructor(card: object) {
    this.id = card['Id'];
    this.name = card['Name'];
    this.card_type = card['CardType'];
    this.rarity = new Rarity(card['Rarity']);
    this.color = card['Color'];
    this.text = card['Text'];
    this.artist = card['Artist'];
    this.lore = card['Lore'];
    this.file_name = card['FileName'];
    /* --- Optional --- */
    this.item_type = card['ItemType'];
    this.mana_cost = card['ManaCost'];
    this.gold_cost = card['GoldCost'];
    if (card['Abilities']) {
      this.abilities = card['Abilities']
        .map(ability => new Ability(ability));
    }
    this.attack = card['Attack'];
    this.armor = card['Armor'];
    this.health = card['Health'];
    this.token = card['Token'];
    this.related_ids = card['RelatedIds'];
    this.signature_card = card['SignatureCard'];
    this.is_signature_card = card['IsSignatureCard'];
  }
}
