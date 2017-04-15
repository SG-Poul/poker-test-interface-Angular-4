/**
 * Created by Delvi-U on 14.04.2017.
 */
import {PlayTableComponent} from '../play-table.component';
import {Button} from './button';
import {CardPanel} from './cardPanel';

export class PanelBlock {
  parent: PlayTableComponent;

  playerPanelData = {
    name : null,
    balance : null,
  };
  cardPanelCards:  CardPanel[];

  b_sys_go = new Button('sys_go', this.sysGo.bind(this), 'none');
  b_sys_reset = new Button('sys_reset', this.sysReset.bind(this), 'none');

  b_Ok =     new Button('ok',     this.panelSave.bind(this),      'player');
  b_Deny =   new Button('deny',   this.panelClose.bind(this),     'player');
  b_Delete = new Button('delete', this.panelDelete.bind(this),    'player');

  b_suit_d = new Button('suit-d', this.cardSelectSuit.bind(this), 'player');
  b_suit_h = new Button('suit-h', this.cardSelectSuit.bind(this), 'player');
  b_suit_s = new Button('suit-s', this.cardSelectSuit.bind(this), 'player');
  b_suit_c = new Button('suit-c', this.cardSelectSuit.bind(this), 'player');

  displaySysGo = false;
  displaySysReset = false;

  displayInitialPanel = true;
  displayAppointeePanel = false;
  displayPlayersPanel = false;

  displayCardPanel = false;
  cardPanelChooseSuit = false;
  cardPanelChooseCard = false;
  cardPanelSuit: string;

  constructor(parent: PlayTableComponent) {
    this.parent = parent;
    this.createPanelCards();
  }

  createPanelCards(): void {
    this.cardPanelCards = [];
    for (let i = 0; i < 13; i++) {
      this.cardPanelCards.push(new CardPanel(i));
    }
  }

  sysGo(): void {
    this.parent.updateState(this.parent.gameState + 1);
  }

  sysReset(): void {
   this.parent.updateState(0);
  }

  panelSave(): void {
    if (this.displayInitialPanel) {
      this.displayInitialPanel = false;
      this.parent.updateState(1);
    } else if (this.displayAppointeePanel || this.parent.playersBlock.currentPlayer.isAppointee) {
      this.parent.playersBlock.currentPlayer.empty = false;
      this.parent.playersBlock.currentPlayer.name = 'YOU';
      this.parent.playersBlock.currentPlayer.balance = this.playerPanelData.balance;
      this.parent.playersBlock.currentPlayer.isAppointee = true;
    } else {
      this.parent.playersBlock.currentPlayer.empty = false;
      this.parent.playersBlock.currentPlayer.name = this.playerPanelData.name;
      this.parent.playersBlock.currentPlayer.balance = this.playerPanelData.balance;
    }
    this.panelClose();
  }

  panelDelete(): void {
    this.parent.playersBlock.currentPlayer.empty = true;
    this.parent.playersBlock.currentPlayer.isAppointee = false;
    this.parent.playersBlock.currentPlayer.isDealer = false;
    this.parent.playersBlock.currentPlayer.name = null;
    this.parent.playersBlock.currentPlayer.balance = null;
    this.panelClose();
  }

  panelClose(): void {
    this.displayInitialPanel = false;
    this.displayPlayersPanel = false;
    this.displayAppointeePanel = false;
    this.playerPanelData.name = null;
    this.playerPanelData.balance = null;
    this.parent.checkGameReady();
  }

  cardSelectSuit(suit: string): void {
    this.cardPanelSuit = suit;
    this.cardPanelCards.forEach(function(item){
      item.setSuit(suit);
    });
    this.cardPanelChooseSuit = false;
    this.cardPanelChooseCard = true;
  }

  cardSelectId(id: string): void {
    this.parent.playersBlock.currentCard.setCard(String(this.cardPanelSuit) + id);
    this.displayCardPanel = false;
    this.cardPanelChooseCard = false;
    this.parent.checkGameReady();
  }

  updateState(state) {
    switch (state) {
      case 0:
        this.displaySysGo = false;
        this.displaySysReset = false;
        this.displayInitialPanel = true;
        this.displayAppointeePanel = false;
        this.displayPlayersPanel = false;
        this.displayCardPanel = false;
        this.cardPanelChooseSuit = false;
        this.cardPanelChooseCard = false;
        break;
      case 1:
        this.displaySysReset = true;
        this.displayInitialPanel = false;
        this.displayAppointeePanel = false;
        this.displayPlayersPanel = false;
        this.displayCardPanel = false;
        this.cardPanelChooseSuit = false;
        this.cardPanelChooseCard = false;
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
    this.displaySysGo = false;
  }
}
