import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameSelectionPageRoutingModule } from './game-selection-routing.module';

import { GameSelectionPage } from './game-selection.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameSelectionPageRoutingModule
  ],
  declarations: [GameSelectionPage]
})
export class GameSelectionPageModule {}
