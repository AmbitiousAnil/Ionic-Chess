import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameSelectionPage } from './game-selection.page';

const routes: Routes = [
  {
    path: '',
    component: GameSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameSelectionPageRoutingModule {}
