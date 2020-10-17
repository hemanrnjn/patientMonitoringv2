import { Component } from '@angular/core';
import {Item, ModalController, NavController} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ModalPage} from "../modal/modal";
import {Observable} from "rxjs/Observable";
import {AngularFireObject} from "angularfire2/database";

@Component({
  selector: 'page-geofence',
  templateUrl: 'geofence.html'
})

export class GeofencePage {
  status: any;
  data: AngularFireObject<Item>;
  itemObservable: Observable<Item>;
  fenceData: any;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {
    this.data = this.firebaseProvider.getGeofenceData();
    this.itemObservable = this.data.valueChanges();
    this.itemObservable.subscribe((res) => {
      this.fenceData = res;
      console.log(res, 'geofence');
    });
  }

  updateStatus() {
    if(this.status == true)  this.firebaseProvider.enableGeofence();
    else this.firebaseProvider.disableGeofence();
  }

  presentGeofenceModal() {
    let modal = this.modalCtrl.create(ModalPage, {data: this.fenceData});
    modal.present();
  }

  sendMessage() {

  }
}
