import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerMatchPageRoutingModule } from './player-match-routing.module';

import { PlayerMatchPage } from './player-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerMatchPageRoutingModule
  ],
  declarations: [PlayerMatchPage]
})
export class PlayerMatchPageModule {}
