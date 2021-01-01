import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import {UtilService} from '../services/util.service';
import { ModalController } from '@ionic/angular';
import { MyModalPage } from '../popup/my-modal/my-modal.page';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.page.html',
  styleUrls: ['./game-selection.page.scss'],
})
export class GameSelectionPage implements OnInit {

  constructor(private navCtrl: NavController,private socket: Socket,private userService:UserService,private utils: UtilService,private modalController: ModalController) {
    
   }

   loggedInUser ={
    "userName":"abc",
    "rating":1200,
    "country":"IN"
  }

  ngOnInit() {
    //this.socket.connect();
  }

  dataReturned:any;
  async openFeesModal(type:string) {
    console.log("modal");
    let gameType = type;

    const modal = await this.modalController.create({
      component: MyModalPage,
      cssClass:"modal-class",
      componentProps: {
        "paramID": 123,
        "paramMessage": 'xyz',
        "type":'game-payment'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  game(type){
   this.userService.userDetails.userName = this.loggedInUser.userName;
  }

  createBattle(){
    this.navCtrl.navigateForward('tabs/custom-battle');
  }

  addMoney() {
    this.navCtrl.navigateForward('tabs/add-money');
  }
}
