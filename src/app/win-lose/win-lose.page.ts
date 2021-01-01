import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win-lose',
  templateUrl: './win-lose.page.html',
  styleUrls: ['./win-lose.page.scss'],
})
export class WinLosePage implements OnInit {

  gameOverObj = {
    "winner":false,
    "winningPlayer":{},
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

  newGame(){
    this.router.navigateByUrl("tabs/game-selection");
  }

}
