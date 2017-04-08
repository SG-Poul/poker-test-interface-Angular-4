import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PlayTableComponent} from './modules/play-table/play-table.component';
import {PlayersComponent} from './modules/play-table/players.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayTableComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
