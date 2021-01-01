import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpAuthService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.page.html',
  styleUrls: ['./game-history.page.scss'],
})
export class GameHistoryPage implements OnInit {

  constructor(private router:Router,private userService:UserService, private httpService: HttpAuthService) { }

  gameHistory = {
    "won":10,
    "lost":12,
    "draw":2,
    "games":[{
      "name":"Opponent1",
      "rating":"1200",
      "amount":"50",
      "type":"5mins",
      "date":"23/07",
      "winFlag":true,
      "profileImage":""
    },{
      "name":"Opponent2",
      "rating":"1200",
      "amount":"10",
      "type":"5mins",
      "date":"23/07",
      "winFlag":true,
      "profileImage":""
    },{
      "name":"Opponent3",
      "rating":"1200",
      "amount":"-20",
      "type":"5mins",
      "date":"23/07",
      "winFlag":false,
      "profileImage":""
    }
  ]
  }

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
    this.fetchUserGames();
  }
  
  fetchUserDetails(){
    let userDetails = this.userService.userDetails;

    if(!!userDetails){
      this.userProfile.name = userDetails.userName;
     
      this.userProfile.rating = userDetails.rating.toString();
      this.userProfile.id = userDetails.userId;
    }
  }

  fetchUserGames(){
    this.loading = true;
    this.httpService.getUserGamesHistory(this.userProfile.id).subscribe(response => {
      if (!!response.data) {
        console.log(response.data);
          this.gameHistory.games = response.data;

          this.gameHistory.games.forEach((games) =>{
              var d = new Date(games.date);
              games.date = d.toLocaleString();
          });
      }
      this.loading = false;
  }, error => {
      console.log(error);
      this.loading = false;
  });
  }
}
