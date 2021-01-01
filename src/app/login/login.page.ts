// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { HttpAuthService } from '../services/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private httpService: HttpAuthService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  loginUser(formData) {
    console.log(formData);
    this.httpService.login(formData)
      .subscribe(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('tabs/dashboard');
      }, err => {
        this.errorMessage = err.message;
        this.navCtrl.navigateForward('tabs/dashboard');
      }) 
  }


  
  /* loginUser(value) {
    this.navCtrl.navigateForward('tabs/dashboard');
    /** this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/dashboard');
      }, err => {
        this.errorMessage = err.message;
    }) 
  } **/

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
