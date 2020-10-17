import {Component, ElementRef, SimpleChanges, ViewChild} from '@angular/core';
import {Item, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {AngularFireObject} from "angularfire2/database";
import { Geolocation } from "@ionic-native/geolocation";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import { ToastController } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latLng: any;
  mapOptions: any;
  marker: any;
  result = {
    geofence: [],
    heart_rate: [],
    location: []
  };
  circle: any;
  data: AngularFireObject<Item>;
  itemObservable: Observable<Item>;
  radius = 50;
  locationObj = {
    latitude: null,
    longitude: null,
    radius: this.radius
  };
  geofenceData :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseProvider: FirebaseProvider,
              public geolocation: Geolocation, public viewCtrl: ViewController, private toastCtrl: ToastController) {
    this.geofenceData =  this.navParams.get('data');
    this.radius = this.geofenceData.radius;
    this.locationObj.latitude = this.geofenceData.latitude;
    this.locationObj.longitude = this.geofenceData.longitude;
  }

  ionViewDidLoad() {
    setTimeout(this.loadMap.bind(this), 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.radius) {
      this.setRadius(this.radius);
    }
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.latLng = new google.maps.LatLng(this.geofenceData.latitude, this.geofenceData.longitude);

      this.mapOptions = {
        center: this.latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.marker = new google.maps.Marker({
        position: this.latLng,
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: "Patient"});

      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

      this.marker.setMap(this.map);

      this.circle = new google.maps.Circle({
        center: this.latLng,
        map: this.map,
        radius: this.geofenceData.radius,
        strokeColor: "blue",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "blue",
        clickable: true,
      });

      this.circle.bindTo('center', this.marker, 'position');

      google.maps.event.addListener(this.marker, 'dragend', (e) => {
        this.locationObj.latitude = parseFloat(e.latLng.lat().toFixed(6));
        this.locationObj.longitude = parseFloat(e.latLng.lng().toFixed(6));
        this.locationObj.radius = this.radius;
        console.log(e.latLng.lat(), e.latLng.lng(), this.locationObj);
      });

      console.log('Map loads for 1st time');

    }, (err) => {
      console.log(err);
    });

  }

  setRadius(value) {
    this.circle.radius = this.radius;
    this.circle.bindTo('center', this.marker, 'position');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveChanges(){
    this.locationObj.radius = this.radius;
    // console.log(this.locationObj);
    this.firebaseProvider.updateGeofence(this.locationObj);
    let toast = this.toastCtrl.create({
      message: 'Changes Saved',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();

    toast.onDidDismiss(() => {
      this.dismiss();
    });
  }

}
