/**
 * Created by Delvi-U on 14.04.2017.
 */
import {PlayTableComponent} from '../play-table.component';
import {Button} from './button';
import {Player} from './classes/player';
import {Card} from './classes/card';
import {Banker} from './classes/banker';
// TEMP CONST FOR DEBUG
const PLAYERS: Player[] = [
  new Player(0),
  new Player(1),
  new Player(2),
  new Player(3),
  new Player(4),
  new Player(5),
  new Player(6),
  new Player(7),
  new Player(8),
  new Player(9)
];
export class PlayersBlock {
  parent: PlayTableComponent;
  players = PLAYERS;
  banker = new Banker;

  currentPlayer: Player;
  currentCard: Card;

  b_Position = new Button('position', this.selectPlayerPosition.bind(this), 'player');
  b_Name_appointee = new Button('name_appointee', this.selectPlayerName.bind(this), 'player');
  b_Name_player = new Button('name_player', this.selectPlayerName.bind(this), 'player');
  b_Name_selected = new Button('name_selected', this.selectPlayerName.bind(this), 'player');
  b_Name_blocked = new Button('name_blocked', this.selectPlayerName.bind(this), 'player');
  b_Dealer_init = new Button('dealer', this.selectPlayerDealer.bind(this), 'player');
  b_Dealer_game = new Button('gamedealer', this.changePlayerDealer.bind(this), 'player');
  b_Token = new Button('token', this.changeBet.bind(this), 'player');

  displayPositions = false;
  displaySelectDealer = false;

  actionPlayerIndex: number;
  panelBet: number;
  tableBet: number;

  constructor(parent: PlayTableComponent) {
    this.parent = parent;
  }

  selectPlayerPosition(player: Player): void {
    this.currentPlayer = player;
    if (this.checkSetAppointee()) {
      this.parent.panelBlock.displayAppointeePanel = true;
    } else {
      this.parent.panelBlock.displayPlayersPanel = true;
    }
  }

  selectPlayerName(player: Player): void {
    this.currentPlayer = player;
    if (this.currentPlayer.isAppointee) {
      this.parent.panelBlock.playerPanelData.balance = player.balance;
      this.parent.panelBlock.displayAppointeePanel = true;
    } else {
      this.parent.panelBlock.playerPanelData.name = player.name;
      this.parent.panelBlock.playerPanelData.balance = player.balance;
      this.parent.panelBlock.displayPlayersPanel = true;
    }
  }

  selectPlayerDealer(player: Player): void {
    player.isDealer = true;
    this.displaySelectDealer = false;
    this.parent.checkGameReady();
  }

  selectCard(card: Card, state: string): void {
    switch (state) {
      case 'over':
        card.onOver();
        break;
      case 'down':
        card.onDown();
        break;
      case 'leave':
        card.onOut();
        break;
      case 'up':
        if (card.isButton) {
          this.currentCard = card;
          card.onUp();
          this.parent.panelBlock.displayCardPanel = true;
          this.parent.panelBlock.cardPanelChooseSuit = true;
        }
        break;
      default:
        console.error('Densta: $', 'Method: selectCard - UNKNOWN STATE');
        break;
    }
  }

  changePlayerDealer(player: Player): void { // TODO: remove
    player.isDealer = false;
    this.displaySelectDealer = true;
    this.parent.checkGameReady();
  }

  changeBet() {
    console.log('Densta: $', 'Method: changeBet');
  }

  /** game stages handler*/
  payBlinds(): void {
    for (const player of this.players) {
      if (player.isActive) {
        player.balance -= this.parent.blindAnte;
        this.banker.balance += this.parent.blindAnte;
      }
    }
    this.actionPlayerIndex = this.getDealer();
    this.setNextActionPlayerIndex();
    this.players[this.actionPlayerIndex].setBet(Number(this.parent.blindSmall));
    this.setNextActionPlayerIndex();
    this.players[this.actionPlayerIndex].setBet(Number(this.parent.blindBig));
  }

  giveCardsPreflop(): void {
    for (const player of this.players) {
      if (player.isActive) {
        if (player.isAppointee) {
          player.selectCards();
        } else {
          player.unknownCards();
        }
      }
    }
  }

  preflopHandler(): void {
    for (const player of this.players) {
        player.doneAction = false;
    }
    this.tableBet = this.parent.blindBig;
    this.actionPlayerIndex = this.getDealer();
    this.setNextActionPlayerIndex(3);
    this.setSelected(this.actionPlayerIndex);
  }
  mainHandler(): void {
    for (const player of this.players) {
      player.doneAction = false;
    }
    this.tableBet = 0;
    this.actionPlayerIndex = this.getDealer();
    this.nextPlayer();
  }

  closeRound(): void {
    for (const player of this.players) {
        this.banker.balance += player.bet;
        player.bet = 0;
    }
    this.actionPlayerIndex = null;
    this.tableBet = 0;
  }

  /** ACTIONS */

  setSelected(index: number): void {
    this.players[index].isSelected = true;
    this.currentPlayer = this.players[index];
    this.panelBet = this.tableBet < this.currentPlayer.balance ? this.tableBet : this.currentPlayer.balance;
    this.parent.panelBlock.displayAction = true;
  }

  actionCall() {
    this.currentPlayer.setBet(this.tableBet);
    this.currentPlayer.doneAction = true;
    this.nextPlayer();
  }

  actionRaise() {
    if (this.panelBet === 0) {
      this.panelBet = this.parent.blindBig;
    }
    if (this.panelBet < this.tableBet * 2 && this.panelBet !== this.currentPlayer.balance + this.currentPlayer.bet) {
      this.panelBet = this.tableBet * 2 < this.currentPlayer.balance + this.currentPlayer.bet ? this.tableBet * 2 : this.currentPlayer.bet + this.currentPlayer.balance;
    } else {
      this.currentPlayer.setBet(this.panelBet);
      this.currentPlayer.doneAction = true;
      this.tableBet = this.panelBet;
      this.nextPlayer();
    }
  }

  actionFold() {
    this.currentPlayer.isActive = false;
    this.currentPlayer.hideCards();
    this.nextPlayer();
  }

  /** CHECKERS */
  checkSetAppointee(): any {
    let answer = true;
    this.players.forEach(function (item) {
      if (!item.empty) {
        answer = false;
      }
    });
    return answer;
  }

  checkActivePlayersBeforeStart() {
    for (let i in this.players) {
      if (this.players[i].balance < this.parent.blindBig + this.parent.blindAnte) {
        this.players[i].isActive = false;
        this.players[i].hideCards();
      }
    }
  }

  checkAppointeHaveCards(): boolean {
    let answer = false;
    this.players.forEach(function (player) {
      if (player.isAppointee) {
        answer = player.checkCards();
      }
    });
    return answer;
  }

  checkActivePlayers(): number {
    let answer = 0;
    this.players.forEach(function (player) {
      if (player.isActive) {
        answer++;
      }
    });
    return answer;
  }

  /** TOOLS */
  private convertIndex(index: number): number {
    return index % this.players.length;
  }

  private setNextActionPlayerIndex(step: number = 1): void { // TODO: sure to use only on init
    for (let i = 0; i < step; i++) {
      this.actionPlayerIndex++;
      this.actionPlayerIndex = this.convertIndex(this.actionPlayerIndex);
      while (!this.players[this.actionPlayerIndex].isActive) {
        this.actionPlayerIndex++;
        this.actionPlayerIndex = this.convertIndex(this.actionPlayerIndex);
      }
    }
  }

  private nextPlayer(): void {
    this.currentPlayer.isSelected = false;
    this.panelBet = 0;
    this.parent.panelBlock.displayAction = false;

    this.actionPlayerIndex++;
    this.actionPlayerIndex = this.convertIndex(this.actionPlayerIndex);
    let checkCount = 0;
    let countAllIn = 0;
    while (checkCount <= this.players.length && (!this.players[this.actionPlayerIndex].isActive || this.players[this.actionPlayerIndex].allIn)) {
      checkCount++;
      this.actionPlayerIndex++;
      this.actionPlayerIndex = this.convertIndex(this.actionPlayerIndex);
    }
    for (const player of this.players) {
      if (player.allIn) {
        countAllIn++;
      }
    }
    if (checkCount > this.players.length) {
      console.warn('Densta: nextPlayer$', 'checkCount > this.players.length', checkCount, this.players.length);
      this.parent.nextState();
      return null;
    }
    if (countAllIn + 1 === this.checkActivePlayers()) {
      console.warn('Densta: nextPlayer$', 'countAllIn + 1 === this.checkActivePlayers()', countAllIn + 1, this.checkActivePlayers());
      this.parent.nextState();
      return null;
    }
    if (this.checkActivePlayers() <= 1) {
      console.warn('Densta: nextPlayer$', 'this.checkActivePlayers() <= 1', this.checkActivePlayers());
      this.parent.nextState();
      return null;
    }

    if (this.players[this.actionPlayerIndex].doneAction && this.players[this.actionPlayerIndex].bet === this.tableBet) {
      console.warn('Densta: nextPlayer$', 'this.players[this.actionPlayerIndex].doneAction', this.players[this.actionPlayerIndex].doneAction,
      'this.players[this.actionPlayerIndex].bet === this.tableBet', this.players[this.actionPlayerIndex].bet, this.tableBet);
      this.parent.nextState();
    } else {
      this.setSelected(this.actionPlayerIndex);
    }
  }

  getDealer(): number {
    let answer = -1;
    this.players.forEach(function (item) {
      if (item.isDealer) {
        answer = item.position;
      }
    });
    return answer;
  }
}
