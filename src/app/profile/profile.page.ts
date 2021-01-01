import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyModalPage } from '../popup/my-modal/my-modal.page';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userProfile = {
    "name":"",
    "rating":"",
    "bio":"",
    "profileImageUrl":"",
    "country":""
  }


  editProfile ={
    "userName":"",
    "email":"",
    "phoneNumber":"",
    "age":"",
    "emailVerifiedFlag":true,
    "phoneNumberVerifiedFlag":true
  }


  

  achievements ={
    "completed":0,
    "pending":0,
    "achievement":[{
      "type":"",
      "name":"",
      "description":"",
      "completePercentage":20,
      "completedUnits":""
    }]
  }

  constructor( private router: Router,private modalController: ModalController,private userService:UserService) { }

  ngOnInit() {
    this.fetchUserDetails();
  }

  fetchUserDetails(){
    let userDetails = this.userService.userDetails;

    if(!!userDetails){
      this.userProfile.name = userDetails.userName;
      this.userProfile.bio = userDetails.userBio;
      this.userProfile.country = userDetails.country;
      this.userProfile.rating = userDetails.rating.toString();
      this.userProfile.profileImageUrl = userDetails.profileImageUrl;

    }
  }
  dataReturned:any;
  async openFriendRequestModal() {
    const modal = await this.modalController.create({
      component: MyModalPage,
      cssClass:"modal-class",
      componentProps: {
        "paramID": 123,
        "paramMessage": 'xyz',
        "type":'friend-request-sent'
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

}
