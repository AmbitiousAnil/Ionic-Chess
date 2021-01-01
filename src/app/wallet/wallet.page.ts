import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpAuthService } from '../services/http.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {


  transactionsList = [{
    "description":"Added",
    "type":"AC",
    "transactionDate":"23-08-2020 12:30:22",
    "amount":"100"
  }]

  userProfile = {
    "name":"",
    "id":1,
    "rating":""
  }

  loading:boolean = false;

  constructor( private router:Router, private userService:UserService, private httpService: HttpAuthService) { }

  ngOnInit() {
    this.fetchUserDetails();
    this.fetchUserTransactions();
  }


  fetchUserDetails(){
    let userDetails = this.userService.userDetails;

    if(!!userDetails){
      this.userProfile.name = userDetails.userName;
     
      this.userProfile.rating = userDetails.rating.toString();
      this.userProfile.id = userDetails.userId;
    }
  }

  fetchUserTransactions(){
    this.loading = true;
    this.httpService.getTransactions(this.userProfile.id).subscribe(response => {
      if (!!response.data) {
        console.log(response.data);
          this.transactionsList = response.data;

          this.transactionsList.forEach((transaction) =>{
              var d = new Date(transaction.transactionDate);
              transaction.transactionDate = d.toLocaleString();
          });
      }
      this.loading = false;
  }, error => {
      console.log(error);
      this.loading = false;
  });
  }

  go(page) {
    this.router.navigateByUrl(page);
  }
}
