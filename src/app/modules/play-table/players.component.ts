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

  b_Ok = new ButtonBase('ok', this.savePanel.bind(this), 'player');

  selectPlayer(player: Player): void {
    console.log('Position', player.position,  'is chosed');
    this.currentPlayer = player;
    this.displayPlayersPanel = true;
    // player.empty = false;
  }

  savePanel(event, player): void {
    console.error('Densta: $', 'Method: savePanel');
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
