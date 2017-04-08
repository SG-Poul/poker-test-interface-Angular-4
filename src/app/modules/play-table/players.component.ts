/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Component} from '@angular/core';
import {Player} from '../../tools/player';

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
  players = PLAYERS;

  selectPosition(player: Player): void {
    console.log('Position', player.position,  'is chosed');
    player.empty = false;
  }
  onSelect(player: Player): void {
  }
  /** visual hard coded*/
  btnLocationOver(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_1.png');
  }
  btnLocationDown(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_2.png');
  }
  btnLocationUp(event, player: Player): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_0.png');
    this.selectPosition(player);
  }
  btnLocationOut(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_0.png');
  }
}
