/**
 * Created by Delvi-U on 15.04.2017.
 */
import {PlayTableComponent} from '../play-table.component';
import {Banker} from './classes/banker';

export class Game {
  parent: PlayTableComponent;
  banker: Banker;

  server: number;
  gameType: number;
  gameBetType: number;
  blindSmall: number;
  blindBig: number;
  blindAnte: number;
  state: number;

  constructor(parent) {
    this.parent = parent;
    this.banker = new Banker;
    this.state = 0;
  }

  updateState(state) {
    this.state = state;
    switch (state) {
      case 0:
        this.server = null;
        this.gameType = null;
        this.gameBetType = null;
        this.blindSmall = null;
        this.blindBig = null;
        this.blindAnte = null;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        console.error('Densta: $', 'checkGameReady: no such stage');
        break;
    }
  }

  checkGameReady() {
    switch (this.state) {
      case 0:
        break;
      case 1:
        if (this.parent.playersBlock.getActivePlayers() >= 2 && this.parent.playersBlock.getDealer() >= 0) {
          this.parent.panelBlock.displaySysGo = true;
        }
        break;
      case 2:
        console.log('Densta: $', 'checkGameReady: ', this.state);
        if (this.parent.playersBlock.getAppointeHaveCards()) {
          this.parent.panelBlock.displaySysGo = true;
        }
        break;
      case 3:
        break;
      default:
        console.error('Densta: $', 'checkGameReady: no such stage');
        break;
    }
  }
}

export const STATE_INIT = 0;
export const STATE_SELECT_PLAYERS = 1;
export const STATE_PREFLOP_SELECT_APPOINTEE_CARD = 2;
export const STATE_PREFLOP_SELECT_PLAYERS_ACTIONS = 3;

