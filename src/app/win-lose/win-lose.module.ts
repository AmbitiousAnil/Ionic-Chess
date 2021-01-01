import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinLosePageRoutingModule } from './win-lose-routing.module';

import { WinLosePage } from './win-lose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WinLosePageRoutingModule
  ],
  declarations: [WinLosePage]
})
export class WinLosePageModule {}
