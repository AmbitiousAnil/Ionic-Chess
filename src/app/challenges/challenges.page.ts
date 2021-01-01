import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpAuthService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})
export class ChallengesPage implements OnInit {

  constructor(private router:Router,private userService:UserService, private httpService: HttpAuthService) { }

  openTab:string = "Open";

  challenges:any = {
      open:[{
        "name":"Opponent1",
        "rating":"1200",
        "amount":"50",
        "type":"PB",
        "date":"23/07",
        "profileImage":""
      }],
      friends:[{
        "name":"Opponent2",
        "rating":"1200",
        "amount":"50",
        "type":"PB",
        "date":"23/07",
        "profileImage":""
      }]
  };

  userProfile = {
    "name":"",
    "id":1,
    "rating":""
  }
  
  loading:boolean = false;

  ngOnInit() {
    this.fetchUserDetails();
  }

  ionViewDidEnter() {
    this.fetchUserChallenges();
  }

  fetchUserDetails(){
    let userDetails = this.userService.userDetails;

    if(!!userDetails){
      this.userProfile.name = userDetails.userName;
     
      this.userProfile.rating = userDetails.rating.toString();
      this.userProfile.id = userDetails.userId;
    }
  }

  fetchUserChallenges(){
    this.loading = true;
    this.challenges.friends = [];
    this.challenges.open = [];
    
    this.httpService.getChallenges(this.userProfile.id).subscribe(response => {
      if (!!response.data) {
        console.log(response.data);
          let challenges = response.data;

          challenges.forEach((challenge) =>{
              var d = new Date(challenge.date);
              challenge.date = d.toLocaleString();

              if(challenge.type == 'F' || challenge.type == 'FR'){
                this.challenges.friends.push(challenge);
              }else{
                this.challenges.open.push(challenge);
              }

          });
      }
      this.loading = false;
  }, error => {
      console.log(error);
      this.loading = false;
  });
  }

  SelectTab(tab: string) {
    this.openTab = tab;
  }
}
