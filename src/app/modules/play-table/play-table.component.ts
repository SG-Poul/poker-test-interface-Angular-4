/**
 * Created by Delvi-U on 08.04.2017.
 */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Player} from '../../tools/player';
import {Banker} from '../../tools/banker';
import {ButtonBase} from '../../tools/buttonBase';
import {Card} from '../../tools/card';
import {CardPanel} from '../../tools/cardPanel';
import {MainService} from '../../main.service';

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

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./css/play-table.component.css', './css/buttons.css', './css/players-positions.css', './css/cards.css'],
  providers: [MainService]
})
export class PlayTableComponent implements AfterViewInit, OnInit {
  title = 'This is play table!';
  state: number;
  displayPositions = true;
  displayAppointeePanel = false;
  displayPlayersPanel = false;
  displaySelectDealer = false;

  displayCardPanel = false;
  cardPanelChooseSuit = false;
  cardPanelChooseCard = false;
  cardPanelCards:  CardPanel[];

  cardPanelSuit: string;


  playerPanelData = {
    name : null,
    balance : null,
  };

  players = PLAYERS;
  currentPlayer: Player;
  currentCard: Card;
  banker = new Banker();

  b_Position = new ButtonBase('position', this.selectPlayerPosition.bind(this), 'player');
  b_Name_appointee = new ButtonBase('name_appointee', this.selectPlayerName.bind(this), 'player');
  b_Name_player = new ButtonBase('name_player', this.selectPlayerName.bind(this), 'player');
  b_Dealer_init = new ButtonBase('dealer', this.selectPlayerDealer.bind(this), 'player');
  b_Dealer_game = new ButtonBase('gamedealer', this.changePlayerDealer.bind(this), 'player');
  b_Ok = new ButtonBase('ok', this.panelSave.bind(this), 'player');
  b_Deny = new ButtonBase('deny', this.panelClose.bind(this), 'player');
  b_Delete = new ButtonBase('delete', this.panelDelete.bind(this), 'player');
  b_suit_d = new ButtonBase('suit-d', this.cardSelectSuit.bind(this), 'player');
  b_suit_h = new ButtonBase('suit-h', this.cardSelectSuit.bind(this), 'player');
  b_suit_s = new ButtonBase('suit-s', this.cardSelectSuit.bind(this), 'player');
  b_suit_c = new ButtonBase('suit-c', this.cardSelectSuit.bind(this), 'player');

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.createPanelCards();
  }

  ngAfterViewInit() {
    this.players.forEach(function(item) {
      item.card_0.getDOMElement();
      item.card_1.getDOMElement();
    });
    this.banker.card_0.getDOMElement();
    this.banker.card_1.getDOMElement();
    this.banker.card_2.getDOMElement();
    this.banker.card_3.getDOMElement();
    this.banker.card_4.getDOMElement();
  }

  selectPlayerPosition(player: Player): void {
    this.currentPlayer = player;
    if (this.needToSetAppointee()) {
      this.displayAppointeePanel = true;
    } else {
      this.displayPlayersPanel = true;
    }
  }
  selectPlayerName(player: Player): void {
    this.currentPlayer = player;
    if (this.currentPlayer.isAppointee) {
      this.playerPanelData.balance = player.balance;
      this.displayAppointeePanel = true;
    } else {
      this.playerPanelData.name = player.name;
      this.playerPanelData.balance = player.balance;
      this.displayPlayersPanel = true;
    }
  }
  selectPlayerDealer(player: Player): void {
    player.isDealer = true;
    this.displaySelectDealer = false;
  }
  changePlayerDealer(player: Player): void {
    player.isDealer = false;
    this.displaySelectDealer = true;
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
          this.displayCardPanel = true;
          this.cardPanelChooseSuit = true;
        }
        break;
      default:
        console.error('Densta: $', 'Method: selectCard - UNKNOWN STATE');
        break;
    }
  }

  createPanelCards(): void {
    this.cardPanelCards = [];
    for (let i = 0; i < 13; i++) {
      this.cardPanelCards.push(new CardPanel(i));
    }
  }

  cardSelectSuit(suit: string): void {
    console.log('Densta: $', 'Method: cardSelectDiamond', suit);
    this.cardPanelSuit = suit;
    this.cardPanelCards.forEach(function(item){
      item.setSuit(suit);
    });
    this.cardPanelChooseSuit = false;
    this.cardPanelChooseCard = true;
  }

  cardSelectId(id: string): void {
    console.log('Densta: $', 'Method: cardSelectId', id);
    this.currentCard.setCard(String(this.cardPanelSuit) + id);
    this.displayCardPanel = false;
    this.cardPanelChooseCard = false;
  }

  panelSave(): void {
    console.log('Densta: $', 'Method: save');
    if (this.displayAppointeePanel) {
      this.currentPlayer.empty = false;
      this.currentPlayer.name = 'YOU';
      this.currentPlayer.balance = this.playerPanelData.balance;
      this.currentPlayer.isAppointee = true;
    } else {
      this.currentPlayer.empty = false;
      this.currentPlayer.empty = false;
      this.currentPlayer.name = this.playerPanelData.name;
      this.currentPlayer.balance = this.playerPanelData.balance;
    }
    this.panelHide();
  }
  panelClose(): void {
    this.panelHide();
  }
  panelDelete(): void {
    this.currentPlayer.empty = true;
    this.currentPlayer.isAppointee = false;
    this.currentPlayer.isDealer = false;
    this.currentPlayer.name = null;
    this.currentPlayer.balance = null;
    this.panelHide();
  }
  panelHide(): void {
    this.displayPlayersPanel = false;
    this.displayAppointeePanel = false;
    this.playerPanelData.name = null;
    this.playerPanelData.balance = null;
  }

  /** check if there are no players to define appointee position */
  needToSetAppointee(): any {
    let answer = true;
    this.players.forEach(function (item) {
      if (!item.empty) {answer = false; }
    });
    return answer;
  }
}
