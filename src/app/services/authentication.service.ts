// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  /*verify( verificationId, code) {
    const signInCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    firebase.auth().signInWithCredential(signInCredential).then((info) => {
      console.log(info);
      // this.navCtrl.navigateRoot('/home'); 
    }, (error) => {
      console.log(error);
    });
  }

  sendSmsVerification(phoneNumber): Promise <firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {

        firebase.auth().useDeviceLanguage();
        var verificationId;
        var code;
        const timeOutDuration = 60;
        const tell = '+54' + phoneNumber;
        this.FireBase.verifyPhoneNumber(tell, timeOutDuration).then(async (credential) => {
            // alert(credential.instantVerification);
            if (credential.verificationId) {
                console.log("Android credential: ", credential);
                verificationId = credential.verificationId;
            } else {
                console.log("iOS credential: ", credential);
                verificationId = credential;
            }
          });          
        })
  } 
  */ 
  userDetails() {
    return this.afAuth.user
  } 
}
