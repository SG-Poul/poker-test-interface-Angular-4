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

  selectFlop() {
    this.card_0.setButton();
    this.card_1.setButton();
    this.card_2.setButton();
  }

  selectTurn() {
    this.card_3.setButton();
  }

  selectRiver() {
    this.card_4.setButton();
  }

  checkFlopHaveCards() {
    let answer = false;
      if (
        this.card_0.name !== 'invisible' && this.card_0.name !== 'back' && !this.card_0.isButton &&
        this.card_1.name !== 'invisible' && this.card_1.name !== 'back' && !this.card_1.isButton &&
        this.card_2.name !== 'invisible' && this.card_2.name !== 'back' && !this.card_2.isButton) {
        answer = true;
      }
    return answer;
  }

  checkTurnHaveCards() {
    let answer = false;
    if (this.card_3.name !== 'invisible' && this.card_3.name !== 'back' && !this.card_3.isButton) {
      answer = true;
    }
    return answer;
  }

  checkRiverHaveCards() {
    let answer = false;
    if (this.card_4.name !== 'invisible' && this.card_4.name !== 'back' && !this.card_4.isButton) {
      answer = true;
    }
    return answer;
  }
}
