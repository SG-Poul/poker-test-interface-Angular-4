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
  displayPlayersPanel = false;
  players = PLAYERS;
  currentPlayer: Player;

  b_Position = new ButtonBase('position', this.selectPlayer.bind(this), 'player');
  b_Ok = new ButtonBase('ok', this.panelSave.bind(this), 'player');
  b_Deny = new ButtonBase('deny', this.panelClose.bind(this), 'player');
  b_Delete = new ButtonBase('delete', this.panelDelete.bind(this), 'player');

  selectPlayer(player: Player): void {
    console.log('Position', player.position,  'is chosed');
    this.currentPlayer = player;
    this.displayPlayersPanel = true;
    // player.empty = false;
  }

  panelSave(player): void {
    console.error('Densta: $', 'Method: save');
  }
  panelClose(player): void {
    console.error('Densta: $', 'Method: close');
    this.displayPlayersPanel = false;
  }
  panelDelete(player): void {
    console.error('Densta: $', 'Method: delete');
    this.displayPlayersPanel = false;
  }

  /** btn location*/
  btnLocationOver(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_1.png');
  }
  btnLocationDown(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_2.png');
  }
  btnLocationUp(event, player: Player): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_0.png');
    this.selectPlayer(player);
  }
  btnLocationOut(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_0.png');
  }
}
