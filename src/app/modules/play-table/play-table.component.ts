/**
 * Created by Delvi-U on 08.04.2017.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./css/play-table.component.css']
})
export class PlayTableComponent {
  title = 'This is play table!';
  state: number;
}
export const G_STATE_INIT = 0;
export const G_STATE_SET_PLAYERS = 1;
