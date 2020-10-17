import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Item, Platform} from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";

import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Observable} from "rxjs/Observable";
import {AngularFireObject} from "angularfire2/database";
import {ShareService} from "../../services/share.service";

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  data: AngularFireObject<Item>;
  geofenceStatus: AngularFireObject<Item>;
  itemObservable: Observable<Item>;
  geofenceStatusObservable: Observable<Item>;
  latLng: any;
  mapOptions: any;
  marker: any;
  result = {
    geofence: [],
    heart_rate: [],
    location: []
  };


  constructor(public platform: Platform,private geolocation: Geolocation,
              private firebaseProvider: FirebaseProvider, private _ref: ChangeDetectorRef,
              private _shareService: ShareService) {


  }

  ionViewDidLoad(){
    // this.platform.ready().then(() => {

      // // Get a FCM token
      // this.fcm.getToken();
      //
      // // Listen to incoming messages
      // this.fcm.listenToNotifications().pipe(
      //   tap(msg => {
      //     // show a toast
      //     const toast = this.toastCtrl.create({
      //       message: msg.body,
      //       duration: 3000
      //     });
      //     toast.present();
      //   })
      // ).subscribe();
    // });


    this.loadMap();
    this.data = this.firebaseProvider.fetchDataLogs();
    this.geofenceStatus = this.firebaseProvider.getGeofenceData();
    this.itemObservable = this.data.valueChanges();
    this.geofenceStatusObservable = this.geofenceStatus.valueChanges();

    this.itemObservable.subscribe((res) => {
      if (this.marker) {
        this.marker.setMap(null);
      }
      const data: any = res;

      this.geofenceStatusObservable.subscribe( (res: any) => {
        const data = res;
        if (data.status === 1 && !data.inbound) {
          console.log('works');
          this._shareService.sendSMS(res).subscribe( (result) => {
            console.log(result);
          });
        }
      });

      const len = data.location.length - 1;
      // console.log(data.location[len], len);
      this.latLng = new google.maps.LatLng(data.location[len].latitude, data.location[len].longitude);
      this.mapOptions = {
        center: this.latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.marker = new google.maps.Marker({
        position: this.latLng,
        map: this.map,
        draggable: false,
        title: "Patient"});


      // this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        const bounds = new google.maps.LatLngBounds();
        // var infowindow = new google.maps.InfoWindow();
        bounds.extend(this.marker.position);
        setTimeout( () => {
          if (this.map) {
            this.map.fitBounds(bounds);
            this.map.setZoom(13);
          }
        },0);

        this.marker.setMap(this.map);

      this._ref.markForCheck();
    });
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      this.mapOptions = {
        center: this.latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

        this.marker = new google.maps.Marker({
          position: this.latLng,
          map: this.map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          title: "Patient"});


      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      console.log('Map loads for 1st time');
      // this.marker.setMap(this.map);

    }, (err) => {
      console.log(err);
    });

  }

}
