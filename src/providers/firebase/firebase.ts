import { Injectable } from '@angular/core';
import {HttpModule} from "@angular/http";
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpModule, private afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  fetchDataLogs() {
    return this.afd.object('/');
  }

  getGeofenceData() {
    return this.afd.object('/geofence');
  }

  enableGeofence() {
    this.afd.object('/geofence').update({status: 1});
  }

  disableGeofence() {
    this.afd.object('/geofence').update({status: 0});
  }

  updateGeofence(obj) {
    console.log(obj.latitude, obj.longitude);
    this.afd.object('/geofence').update({latitude: obj.latitude, longitude: obj.longitude,
                                                        radius: obj.radius});
  }
}
