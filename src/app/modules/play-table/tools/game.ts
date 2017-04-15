/**
 * Created by Delvi-U on 15.04.2017.
 */
import {PlayTableComponent} from '../play-table.component';
import {Banker} from './classes/banker';
import {Player} from './classes/player';

export class Game {
  parent: PlayTableComponent;
  banker: Banker;

  actionPlayer: number;

  constructor(parent) {
    this.parent = parent;
    this.banker = new Banker;
  }

  preflopHanfler(): void {
    let dealerIndex = this.getDealerIndex();
    this.setActionPlayer(this.convertActivePlayersIndex(dealerIndex + 3));
    console.log('Densta: $', 'actionPlayerIndex: ', this.actionPlayer);
  }

  payBlinds() {
    let activePlayers = this.parent.playersBlock.getActivePlayers();
    let dealerIndex = this.getDealerIndex();
    for (let i in activePlayers) {
      activePlayers[i].setBet(this.parent.blindAnte);
    }
    activePlayers[this.convertActivePlayersIndex(dealerIndex + 1)].setBet(Number(this.parent.blindSmall));
    activePlayers[this.convertActivePlayersIndex(dealerIndex + 2)].setBet(Number(this.parent.blindBig));
  }

  private convertActivePlayersIndex(index: number) {
    let activePlayers = this.parent.playersBlock.getActivePlayers();
    let value = index;
    while (value > activePlayers.length - 1) {
      value -= activePlayers.length;
    }
    return value;
  }

  private setActionPlayer(index?: number) {
    let activePlayers = this.parent.playersBlock.getActivePlayers();
    let value: number;
    if (index) {
      value = index;
      while (value > activePlayers.length) {
        value -= activePlayers.length;
      }
      this.actionPlayer = value;
    } else {
      value = this.actionPlayer + 1;
      while (index > activePlayers.length) {
        index -= activePlayers.length;
      }
      this.actionPlayer = value;
    }
  }

  private getDealerIndex(): number {
    let activePlayers = this.parent.playersBlock.getActivePlayers();
    for (let i in activePlayers) {
      if (activePlayers[i].isDealer) {
        return Number(i);
      }
    }
  }
}
