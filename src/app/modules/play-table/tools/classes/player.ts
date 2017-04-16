/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Card} from './card';
export class Player {
  position: number;
  empty: boolean;
  isAppointee: boolean;
  isDealer: boolean;
  isSelected: boolean;
  isActive: boolean;
  doneAction: boolean;
  allIn: boolean;
  card_0: Card;
  card_1: Card;
  name?: string;
  balance?: number;
  bet: number;

  constructor(position: number) {
    this.position = position;
    this.empty = true;
    this.isActive = false;
    this.doneAction = false;
    this.allIn = false;
    this.isAppointee = false;
    this.isDealer = false;
    this.isSelected = false;
    this.bet = 0;
    this.card_0 = new Card(this.position, 0);
    this.card_1 = new Card(this.position, 1);
  }

  setBet(value: number): boolean {
    if (this.balance >= value) {
      this.balance -= value;
      this.bet += value;
    } else {
      this.bet += this.balance;
      this.balance = 0;
      this.allIn = true;
    }
  }

  hideCards(): void {
    this.card_0.setCard('invisible');
    this.card_0.isButton = false;
    this.card_1.setCard('invisible');
    this.card_1.isButton = false;
  }

  selectCards(): void {
    this.card_0.setButton();
    this.card_1.setButton();
  }

  unknownCards(): void {
    this.card_0.setCard('back');
    this.card_1.setCard('back');
  }
}
