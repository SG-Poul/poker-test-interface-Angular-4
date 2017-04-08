/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Component} from '@angular/core';
import {Player} from '../../tools/player';

// TEMP CONST FOR DEBUG
const PLAYERS: Player[] = [
  {position: 0},
  {position: 1},
  {position: 2},
  {position: 3},
  {position: 4},
  {position: 5},
  {position: 6},
  {position: 7},
  {position: 8},
  {position: 9},
];

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  title = 'This is play table!';
  players = PLAYERS;

  choosePosition(): void {
    console.log('Position is chosed');
  }
  onSelect(player: Player): void {
    console.warn('selected', player);
  }
}
