/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Component} from '@angular/core';
import {Player} from '../../tools/player';
import {ButtonBase} from '../../tools/buttonBase';

// TEMP CONST FOR DEBUG
const PLAYERS: Player[] = [
  {position: 0, empty: true},
  {position: 1, empty: true},
  {position: 2, empty: true},
  {position: 3, empty: true},
  {position: 4, empty: true},
  {position: 5, empty: true},
  {position: 6, empty: true},
  {position: 7, empty: true},
  {position: 8, empty: true},
  {position: 9, empty: true},
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
  playerPanelData = {
    name : null,
    balance : null,
  };

  players = PLAYERS;
  currentPlayer: Player;

  b_Position = new ButtonBase('position', this.selectPlayer.bind(this), 'player');
  b_Ok = new ButtonBase('ok', this.panelSave.bind(this), 'player');
  b_Deny = new ButtonBase('deny', this.panelClose.bind(this), 'player');
  b_Delete = new ButtonBase('delete', this.panelDelete.bind(this), 'player');

  selectPlayer(player: Player): void {
    this.currentPlayer = player;
    if (this.needToSetAppointee()) {
      this.displayAppointeePanel = true;
    } else {
      this.displayPlayersPanel = true;
    }
    console.log('Densta: $', 'Method: selectPlayer', this.needToSetAppointee());
    player.empty = false;
  }

  panelSave(player): void {
    console.log('Densta: $', 'Method: save');
  }
  panelClose(player): void {
    this.displayPlayersPanel = false;
    this.displayAppointeePanel = false;

    this.playerPanelData.name = null;
    this.playerPanelData.balance = null;
  }
  panelDelete(player): void {
    console.log('Densta: $', 'Method: delete');
    this.displayPlayersPanel = false;
    this.displayAppointeePanel = false;
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
