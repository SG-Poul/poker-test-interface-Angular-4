/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Component} from '@angular/core';
import {Player} from '../../tools/player';
import {ButtonBase} from '../../tools/buttonBase';

// TEMP CONST FOR DEBUG
const PLAYERS: Player[] = [
  {position: 0, empty: true, isAppointee: false, isDealer: false},
  {position: 1, empty: true, isAppointee: false, isDealer: false},
  {position: 2, empty: true, isAppointee: false, isDealer: false},
  {position: 3, empty: true, isAppointee: false, isDealer: false},
  {position: 4, empty: true, isAppointee: false, isDealer: false},
  {position: 5, empty: true, isAppointee: false, isDealer: false},
  {position: 6, empty: true, isAppointee: false, isDealer: false},
  {position: 7, empty: true, isAppointee: false, isDealer: false},
  {position: 8, empty: true, isAppointee: false, isDealer: false},
  {position: 9, empty: true, isAppointee: false, isDealer: false},
];

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  title = 'This is play table!';
  displayPositions = true;
  displayAppointeePanel = false;
  displayPlayersPanel = false;
  displaySelectDealer = true;
  playerPanelData = {
    name : null,
    balance : null,
  };

  players = PLAYERS;
  currentPlayer: Player;

  b_Position = new ButtonBase('position', this.selectPlayerPosition.bind(this), 'player');
  b_Name_appointee = new ButtonBase('name_appointee', this.selectPlayerName.bind(this), 'player');
  b_Name_player = new ButtonBase('name_player', this.selectPlayerName.bind(this), 'player');
  b_Dealer_init = new ButtonBase('dealer', this.selectPlayerDealer.bind(this), 'player');

  b_Ok = new ButtonBase('ok', this.panelSave.bind(this), 'player');
  b_Deny = new ButtonBase('deny', this.panelClose.bind(this), 'player');
  b_Delete = new ButtonBase('delete', this.panelDelete.bind(this), 'player');

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
    console.log('Densta: $', 'Method: DEALER');
  }

  panelSave(player): void {
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
  panelClose(player): void {
    this.panelHide();
  }
  panelDelete(player): void {
    console.log('Densta: $', 'Method: delete');
    this.displayPlayersPanel = false;
    this.displayAppointeePanel = false;
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
