import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {UtilService} from '../services/util.service';
import { UserService } from '../services/user.service';
import { HttpAuthService } from '../services/http.service';

@Component({
  selector: 'app-player-match',
  templateUrl: './player-match.page.html',
  styleUrls: ['./player-match.page.scss'],
})
export class PlayerMatchPage implements OnInit {

  constructor(private router: Router,private socket: Socket,private utils: UtilService ,  private userService:UserService, private httpService: HttpAuthService) { }

  userProfile = {
    "name":"",
    "id":1,
    "rating":500
  }

  ngOnInit() {

    this.fetchUserDetails();
    this.searchGame("type1");

    this.socket.fromEvent("ready").subscribe((data:any) =>{
      console.log(data);

      let clientGame ={
        player:{},
        opponent:{},
        gameId:data.gameId
      }
   

      if(data.player1.name == this.userProfile.name){
        clientGame.player = data.player1;
        clientGame.opponent = data.player2;
      }else  if(data.player2.name == this.userProfile.name){
        clientGame.player = data.player2;
        clientGame.opponent = data.player1;
      }
      
      this.utils.clientGame = clientGame;


      setTimeout(() => {
        this.router.navigateByUrl('board');
      },2000);
    });
  }

  fetchUserDetails(){
    let userDetails = this.userService.userDetails;
  
    if(!!userDetails){
      this.userProfile.name = userDetails.userName;
      this.userProfile.rating = userDetails.rating;
      this.userProfile.id = userDetails.userId;
    }
  }

  searchGame(type){

    let user = {
      "userName":this.userProfile.name,
      "rating":this.userProfile.rating,
      "type":type
    }
    console.log(user);
    this.socket.emit("joinRoom",user);
  }

}
