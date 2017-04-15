/**
 * Created by Delvi-U on 08.04.2017.
 */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Banker} from './tools/classes/banker';
import {MainService} from '../../main.service';
import {PanelBlock} from './tools/panelBlock';
import {PlayersBlock} from './tools/playersBlock';
import {Game} from './tools/game';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./css/play-table.component.css', './css/buttons.css', './css/players-positions.css', './css/cards.css'],
  providers: [MainService]
})
export class PlayTableComponent implements AfterViewInit, OnInit {
  panelBlock: PanelBlock;
  playersBlock: PlayersBlock;
  game: Game;

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

  constructor(private mainService: MainService) {
    this.playersBlock = new PlayersBlock(this);
    this.panelBlock = new PanelBlock(this);
    this.game = new Game(this);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.playersBlock.players.forEach(function(item) {
      item.card_0.getDOMElement();
      item.card_1.getDOMElement();
    });
    this.game.banker.card_0.getDOMElement();
    this.game.banker.card_1.getDOMElement();
    this.game.banker.card_2.getDOMElement();
    this.game.banker.card_3.getDOMElement();
    this.game.banker.card_4.getDOMElement();
  }

  updateState(state) {
    console.log('Densta: $', 'updateState: ', state);
    this.game.updateState(state);
    this.panelBlock.updateState(state);
    this.playersBlock.updateState(state);
  }
  checkGameReady() {
    this.game.checkGameReady();
  }
}
