import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ShareService {

  locationData: any;

  constructor(private _http: Http) {
    this.locationData = null;
  }

  sendSMS(data) {
    const obj = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    const body = JSON.stringify(obj);
    return this._http.post('http://localhost/simpleSMS/sendsms.php', body);
  }

  setInbound(val) {
    this.locationData= val;
    console.log(val);
  }

  getInbound() {
    return this.locationData;
  }
}
