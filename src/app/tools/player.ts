/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Card} from "./card";
export class Player {
  position: number;
  empty: boolean;
  isAppointee: boolean;
  isDealer: boolean;
  card_0: Card;
  card_1: Card;
  name?: string;
  balance?: number;

  constructor(position: number) {
    this.position = position;
    this.empty = true;
    this.isAppointee = false;
    this.isDealer = false;
    this.card_0 = new Card(this.position, 0);
    this.card_1 = new Card(this.position, 1);
  }
}
