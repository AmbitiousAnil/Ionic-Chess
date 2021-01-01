import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerMatchPage } from './player-match.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerMatchPageRoutingModule {}
