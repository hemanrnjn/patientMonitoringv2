import { Injectable } from '@angular/core';
import { Firebase } from "@ionic-native/firebase";
import {HttpModule} from "@angular/http";
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(public http: HttpModule, public firebaseNative: Firebase,
              private afd: AngularFireDatabase) {
    console.log('Hello FcmProvider Provider');
  }

  // getToken() {
  //   let token;
  //   token = this.firebaseNative.getToken();
  //   this.afd.object('/devices').update({token: token});

    // if(this.platform.is('android')) {
    //   this.afd.object('/devices').update({token: 'chala bc'});
    // } else{
    //   token = "p9j67gf855555473gfhej";
    // }

    // if(this.platform.is('cordova')) {
    //   token = "p9j67gf8473gfhej";
    // }else{
    //   token = "p9j67gf855555473gfhej";
    // }
    // return this.saveTokenToFirebase(token);
  // }

  // saveTokenToFirestore(token) {
  //   if(!token) return;
  //   const devicesRef = this.afs.collection('devices');
  //   const docData = {
  //     token,
  //     userId : 'testUser',
  //   };
  //   return devicesRef.doc(token).set(docData)
  // }

  saveTokenToFirebase(token) {
    console.log('sent');
    this.afd.object('/devices').update({token});
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
