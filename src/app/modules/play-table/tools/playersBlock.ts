/**
 * Created by Delvi-U on 14.04.2017.
 */
import {PlayTableComponent} from '../play-table.component';
import {Button} from './button';
import {Player} from './classes/player';
import {Card} from './classes/card';
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
  currentPlayer: Player;
  currentCard: Card;

  b_Position: Button;
  b_Name_appointee: Button;
  b_Name_player: Button;
  b_Name_selected: Button;
  b_Name_blocked: Button;
  b_Dealer_init: Button;
  b_Dealer_game: Button;
  b_Token: Button;

  displayPositions = false;
  displaySelectDealer = false;

  constructor(parent: PlayTableComponent) {
    this.parent = parent;
    this.b_Position = new Button('position', this.selectPlayerPosition.bind(this), 'player');
    this.b_Name_appointee = new Button('name_appointee', this.selectPlayerName.bind(this), 'player');
    this.b_Name_player = new Button('name_player', this.selectPlayerName.bind(this), 'player');
    this.b_Name_selected = new Button('name_selected', this.selectPlayerName.bind(this), 'player');
    this.b_Name_blocked = new Button('name_blocked', this.selectPlayerName.bind(this), 'player');
    this.b_Dealer_init = new Button('dealer', this.selectPlayerDealer.bind(this), 'player');
    this.b_Dealer_game = new Button('gamedealer', this.changePlayerDealer.bind(this), 'player');
    this.b_Token = new Button('token', this.changeBet.bind(this), 'player');
  }

  selectPlayerPosition(player: Player): void {
    this.currentPlayer = player;
    if (this.needToSetAppointee()) {
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
  changePlayerDealer(player: Player): void {
    player.isDealer = false;
    this.displaySelectDealer = true;
    this.parent.checkGameReady();
  }

  changeBet() {
    console.log('Densta: $', 'Method: changeBet');
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

  /** check if there are no players to define appointee position */
  needToSetAppointee(): any {
    let answer = true;
    this.players.forEach(function (item) {
      if (!item.empty) {answer = false; }
    });
    return answer;
  }

  giveCardsPreflop(): void {
    console.log('Densta: $', 'Method: giveCardsPreflop');
    this.players.forEach(function (item) {
      if (item.isActive) {
        if (item.isAppointee) {
          item.selectCards();
        } else {
          item.unknownCards();
        }
      }
    });
  }

  checkActivePlayersBeforeStart() {
    for (let i in this.players) {
      if (this.players[i].balance < this.parent.blindBig + this.parent.blindAnte) {
        this.players[i].isActive = false;
        this.players[i].hideCards();
      }
    }
  }

  getActivePlayers(): Player[] {
    let answer = [];
    this.players.forEach(function (player) {
      if (!player.empty && player.isActive) {
        answer.push(player);
      }
    });
    return answer;
  }

  getDealer(): number {
    let answer = -1;
    this.players.forEach(function (item) {
      if (!item.empty && item.isActive && item.isDealer) {
        answer = item.position;
      }
    });
    return answer;
  }

  getAppointeHaveCards(): boolean {
    let answer = false;
    this.players.forEach(function (player) {
      if (!player.empty && player.isAppointee &&
        player.card_0.name !== 'invisible' && player.card_0.name !== 'back' && !player.card_0.isButton &&
        player.card_1.name !== 'invisible' && player.card_1.name !== 'back' && !player.card_1.isButton) {
          answer = true;
      }
    });
    console.log('Densta: $', 'getAppointeHaveCards: ', answer);
    return answer;
  }
}
