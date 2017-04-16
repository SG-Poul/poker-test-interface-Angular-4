/**
 * Created by Delvi-U on 12.04.2017.
 */
import {Card} from './card';
export class Banker {
  card_0: Card;
  card_1: Card;
  card_2: Card;
  card_3: Card;
  card_4: Card;
  balance?: number;

  constructor() {
    this.card_0 = new Card(10, 0);
    this.card_1 = new Card(10, 1);
    this.card_2 = new Card(10, 2);
    this.card_3 = new Card(10, 3);
    this.card_4 = new Card(10, 4);
    this.balance = 0;
  }

  hideCards() {
    this.card_0.setCard('invisible');
    this.card_0.isButton = false;
    this.card_1.setCard('invisible');
    this.card_1.isButton = false;
    this.card_2.setCard('invisible');
    this.card_2.isButton = false;
    this.card_3.setCard('invisible');
    this.card_3.isButton = false;
    this.card_4.setCard('invisible');
    this.card_4.isButton = false;
  }
}
