import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinLosePage } from './win-lose.page';

const routes: Routes = [
  {
    path: '',
    component: WinLosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WinLosePageRoutingModule {}
