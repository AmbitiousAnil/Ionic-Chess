import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomBattlePage } from './custom-battle.page';

const routes: Routes = [
  {
    path: '',
    component: CustomBattlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomBattlePageRoutingModule {}
