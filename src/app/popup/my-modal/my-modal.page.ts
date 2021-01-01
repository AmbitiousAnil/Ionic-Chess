import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {

  message: string;
  modelId: number;
  type:string;
  battleTimer:number = 10;

  constructor(private modalController: ModalController,private navParams: NavParams, private router:Router) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.message = this.navParams.data.paramMessage;
    this.type = this.navParams.data.type;

    if(this.type == "timer"){
      this.startBattleTimer();
    }

  }

  async confirmPayment() {

    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  
    this.router.navigateByUrl("tabs/player-match");
  }


  
  startBattleTimer(){
    setInterval(() => {
    this.battleTimer--;
      if(this.battleTimer == 0){
        this.modalController.dismiss();
      }
    },1000);
  }

}
