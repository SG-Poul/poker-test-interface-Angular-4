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

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
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
}
