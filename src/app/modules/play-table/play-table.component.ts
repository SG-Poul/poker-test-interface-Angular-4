/**
 * Created by Delvi-U on 08.04.2017.
 */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Banker} from './tools/banker';
import {MainService} from '../../main.service';
import {PanelBlock} from './tools/panelBlock';
import {PlayersBlock} from './tools/playersBlock';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./css/play-table.component.css', './css/buttons.css', './css/players-positions.css', './css/cards.css'],
  providers: [MainService]
})
export class PlayTableComponent implements AfterViewInit, OnInit {
  panelBlock: PanelBlock;
  playersBlock: PlayersBlock;
  banker = new Banker();

  gameState: number;

  server: number;
  serverNames = [
    {name: 'Real Game', value: 0},
    {name: 'Poker Stars', value: 1}
  ];
  gameTypeList = [
    {name: 'Real Money', value: 0},
    {name: 'Tournament', value: 1},
    {name: 'Free', value: 2},
  ];
  gameBetTypeList  = [
    {name: 'No limit', value: 0},
    {name: 'Fixed limit', value: 1},
    {name: 'Pot limit', value: 2},
    {name: 'Mixed', value: 3},
  ];
  gameType: string;
  gameBetType: string;
  blindSmall: number;
  blindBig: number;
  blindAnte: number;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.gameState = 0;
    this.playersBlock = new PlayersBlock(this);
    this.panelBlock = new PanelBlock(this);
  }

  ngAfterViewInit() {
    this.playersBlock.players.forEach(function(item) {
      item.card_0.getDOMElement();
      item.card_1.getDOMElement();
    });
    this.banker.card_0.getDOMElement();
    this.banker.card_1.getDOMElement();
    this.banker.card_2.getDOMElement();
    this.banker.card_3.getDOMElement();
    this.banker.card_4.getDOMElement();
  }

  updateState(state) {
    console.log('Densta: $', 'updateState: ', state);
    this.gameState = state;
    console.log('Densta: $', 'Method: ', this.server, this.gameType, this.gameBetType, this.blindSmall, this.blindBig, this.blindAnte);
  }
}
export const STATE_INIT = 0;
export const STATE_SELECT_PLAYERS = 1;
