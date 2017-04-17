/**
 * Created by Delvi-U on 08.04.2017.
 */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MainService} from '../../main.service';
import {PanelBlock} from './tools/panelBlock';
import {PlayersBlock} from './tools/playersBlock';

export const STATE_INIT = 0;
export const STATE_SELECT_PLAYERS = 1;
export const STATE_SELECT_DEALER = 2;
export const STATE_PAY_BLINDS = 3;
export const STATE_PREFLOP_SELECT_APPOINTEE_CARD = 4;
export const STATE_PREFLOP_SELECT_PLAYERS_ACTIONS = 5;
export const STATE_PREFLOP_CLOSE = 6;
export const STATE_FLOP_SELECT_DESK_CARDS = 7;
export const STATE_FLOP_SELECT_PLAYERS_ACTIONS = 8;
export const STATE_FLOP_CLOSE = 9;
export const STATE_TURN_SELECT_DESK_CARDS = 10;
export const STATE_TURN_SELECT_PLAYERS_ACTIONS = 11;
export const STATE_TURN_CLOSE = 12;
export const STATE_RIVER_SELECT_DESK_CARDS = 13;
export const STATE_RIVER_SELECT_PLAYERS_ACTIONS = 14;
export const STATE_RIVER_CLOSE = 15;
export const STATE_SHOWDOWN = 16;
export const STATE_GAMEOVER = 17;


@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./css/play-table.component.css', './css/buttons.css', './css/players-positions.css', './css/cards.css'],
  providers: [MainService]
})
export class PlayTableComponent implements AfterViewInit, OnInit {
  panelBlock: PanelBlock;
  playersBlock: PlayersBlock;

  server: number;
  gameType: number;
  gameBetType: number;
  blindSmall: number;
  blindBig: number;
  blindAnte: number;
  state: number;

  serverNames = [
    {name: 'Real Game', value: 0},
    {name: 'Poker Stars', value: 1}
  ];
  gameTypeList = [
    {name: 'Real Money', value: 0},
    {name: 'Tournament', value: 1},
    {name: 'Free', value: 2},
  ];
  gameBetTypeList = [
    {name: 'No limit', value: 0},
    {name: 'Fixed limit', value: 1},
    {name: 'Pot limit', value: 2},
    {name: 'Mixed', value: 3},
  ];

  constructor(private mainService: MainService) {
    this.playersBlock = new PlayersBlock(this);
    this.panelBlock = new PanelBlock(this);

    this.state = 0;
    this.blindAnte = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.playersBlock.players.forEach(function (item) {
      item.card_0.getDOMElement();
      item.card_1.getDOMElement();
    });
    this.playersBlock.banker.card_0.getDOMElement();
    this.playersBlock.banker.card_1.getDOMElement();
    this.playersBlock.banker.card_2.getDOMElement();
    this.playersBlock.banker.card_3.getDOMElement();
    this.playersBlock.banker.card_4.getDOMElement();
  }

  updateState(state) {
    this.state = state;
    this.panelBlock.displaySysGo = false;
    console.log('Densta: $', 'updateState: ', state);
    switch (state) {
      case STATE_INIT:
        this.server = null;
        this.gameType = null;
        this.gameBetType = null;
        this.blindSmall = null;
        this.blindBig = null;
        this.blindAnte = null;
        // Players block
        this.playersBlock.players.forEach(function (item) {
          item.empty = true;
          item.name = null;
          item.balance = null;
          item.isDealer = false;
          item.isAppointee = false;
          item.isActive = false;
          item.doneAction = false;
          item.allIn = false;
          item.bet = 0;
          item.hideCards();
        });
        this.playersBlock.banker.balance = 0;
        this.playersBlock.banker.hideCards();
        this.playersBlock.displayPositions = false;
        this.playersBlock.displaySelectDealer = false;
        this.playersBlock.panelBet = null;
        // Panel block
        this.panelBlock.displaySysGo = false;
        this.panelBlock.displaySysReset = false;
        this.panelBlock.displayInitialPanel = true;
        this.panelBlock.displayAppointeePanel = false;
        this.panelBlock.displayPlayersPanel = false;
        this.panelBlock.displayCardPanel = false;
        this.panelBlock.displayAction = false;
        this.panelBlock.cardPanelChooseSuit = false;
        this.panelBlock.cardPanelChooseCard = false;
        break;
      case STATE_SELECT_PLAYERS:
        // Players block
        this.playersBlock.displayPositions = true;
        // Panel block
        this.panelBlock.displaySysReset = true;
        this.panelBlock.displayInitialPanel = false;
        this.panelBlock.displayAppointeePanel = false;
        this.panelBlock.displayPlayersPanel = false;
        this.panelBlock.displayCardPanel = false;
        this.panelBlock.cardPanelChooseSuit = false;
        this.panelBlock.cardPanelChooseCard = false;
        break;
      case STATE_SELECT_DEALER:
        this.playersBlock.displayPositions = false;
        this.playersBlock.checkActivePlayersBeforeStart();
        this.playersBlock.displaySelectDealer = true;
        break;
      case STATE_PAY_BLINDS:
        this.playersBlock.displaySelectDealer = false;
        this.playersBlock.payBlinds();
        this.nextState();
        break;
      case STATE_PREFLOP_SELECT_APPOINTEE_CARD:
        // Players block
        this.playersBlock.giveCardsPreflop();
        break;
      case STATE_PREFLOP_SELECT_PLAYERS_ACTIONS:
        this.playersBlock.preflopHandler();
        break;
      case STATE_PREFLOP_CLOSE:
        this.playersBlock.closeRound();
        this.nextState();
        break;
      case STATE_FLOP_SELECT_DESK_CARDS:
        this.playersBlock.banker.selectFlop();
        break;
      case STATE_FLOP_SELECT_PLAYERS_ACTIONS:
        this.playersBlock.mainHandler();
        break;
      case STATE_FLOP_CLOSE:
        this.playersBlock.closeRound();
        this.nextState();
        break;
      case STATE_TURN_SELECT_DESK_CARDS:
        this.playersBlock.banker.selectTurn();
        break;
      case STATE_TURN_SELECT_PLAYERS_ACTIONS:
        this.playersBlock.mainHandler();
        break;
      case STATE_TURN_CLOSE:
        this.playersBlock.closeRound();
        this.nextState();
        break;
      case STATE_RIVER_SELECT_DESK_CARDS:
        this.playersBlock.banker.selectRiver();
        break;
      case STATE_RIVER_SELECT_PLAYERS_ACTIONS:
        this.playersBlock.mainHandler();
        break;
      case STATE_RIVER_CLOSE:
        this.playersBlock.closeRound(true);
        this.nextState();
        break;
      case STATE_SHOWDOWN:
        this.playersBlock.showDownHandler();
        break;
      case STATE_GAMEOVER:
        console.error('Densta: $', 'STATE_GAMEOVER');
        break;
      default:
        console.error('Densta: $', 'checkGameReady: no such stage');
        break;
    }
  }

  nextState() {
    this.updateState(this.state + 1);
  }

  checkGameReady(): void {
    switch (this.state) {
      case STATE_INIT:
        break;
      case STATE_SELECT_PLAYERS:
        if (this.playersBlock.checkActivePlayers() >= 2) {
          this.panelBlock.displaySysGo = true;
        }
        break;
      case STATE_SELECT_DEALER:
        if (this.playersBlock.getDealer() >= 0) {
          this.nextState();
        }
        break;
      case STATE_PAY_BLINDS:
        break;
      case STATE_PREFLOP_SELECT_APPOINTEE_CARD:
        console.log('Densta: $', 'checkGameReady: ', this.state);
        if (this.playersBlock.checkAppointeHaveCards()) {
          this.nextState();
        }
        break;
      case STATE_PREFLOP_SELECT_PLAYERS_ACTIONS:
        break;
      case STATE_PREFLOP_CLOSE:
        break;
      case STATE_FLOP_SELECT_DESK_CARDS:
        if (this.playersBlock.banker.checkFlopHaveCards()) {
          this.nextState();
        }
        break;
      case STATE_FLOP_SELECT_PLAYERS_ACTIONS:
        break;
      case STATE_FLOP_CLOSE:
        break;
      case STATE_TURN_SELECT_DESK_CARDS:
        if (this.playersBlock.banker.checkTurnHaveCards()) {
          this.nextState();
        }
        break;
      case STATE_TURN_SELECT_PLAYERS_ACTIONS:
        break;
      case STATE_TURN_CLOSE:
        break;
      case STATE_RIVER_SELECT_DESK_CARDS:
        if (this.playersBlock.banker.checkRiverHaveCards()) {
          this.nextState();
        }
        break;
      case STATE_RIVER_SELECT_PLAYERS_ACTIONS:
        break;
      case STATE_RIVER_CLOSE:
        break;
      case STATE_SHOWDOWN:
        if (this.playersBlock.checkAllCards()) {
          this.nextState();
        } else if (this.playersBlock.currentPlayer.checkCards()) {
          this.playersBlock.nextPlayerShowdown();
        }
        break;
      case STATE_GAMEOVER:
        console.error('Densta: $', 'STATE_GAMEOVER');
        break;
      default:
        console.error('Densta: $', 'checkGameReady: no such stage');
        break;
    }
  }
}
