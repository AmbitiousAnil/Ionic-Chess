import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
})
export class AchievementsPage implements OnInit {

  constructor() { }

  openTab:string = "Achievements";
  progressValue:number = 50;
  ngOnInit() {
  }

  SelectTab(tab: string) {
    this.openTab = tab;
  }

}
