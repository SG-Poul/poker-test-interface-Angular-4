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
  }
}
