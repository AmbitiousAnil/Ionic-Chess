import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomBattlePageRoutingModule } from './custom-battle-routing.module';

import { CustomBattlePage } from './custom-battle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomBattlePageRoutingModule
  ],
  declarations: [CustomBattlePage]
})
export class CustomBattlePageModule {}
