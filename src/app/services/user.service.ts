import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  userDetails = {
    "rating":1200,
    "userName":"Anil_D_Knight23",
    "userId":3,
    "userBio":"I am a Chess Player",
    "country":"in",
    "profileImageUrl":"",
    "walletAmount":100,
    "walletTokens":50
  }
  
}