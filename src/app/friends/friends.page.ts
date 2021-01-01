import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friendsList = [];
  friendRequestsList = [];
  openTab:string = "Friends";

  constructor() { }

  ngOnInit() {
    let friend = {
      "name":"",
      "profileImg":"",
      "lastActive":"",
      "challengeSentFlag":false
    }

    let friendRequest = {
      "name":"",
      "profileImg":"",
      "lastActive":"",
      "requestFlag":""
    }
    this.friendsList.push(friend);
    this.friendsList.push(friend);
  }

  SelectTab(tab: string) {
    this.openTab = tab;
  }

}
