import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GeofencePage } from '../pages/geofence/geofence';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalPage } from '../pages/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase} from '@ionic-native/firebase';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { FcmProvider } from '../providers/fcm/fcm';
import { ShareService } from '../services/share.service';

// const config = {
//   apiKey: "AIzaSyBbuY0XUao9_f0E5TipOEEz-5-EotsC0e0",
//   authDomain: "patientmonitoring-66753.firebaseapp.com",
//   databaseURL: "https://patientmonitoring-66753.firebaseio.com",  //my original key
//   projectId: "patientmonitoring-66753",
//   storageBucket: "patientmonitoring-66753.appspot.com",
//   messagingSenderId: "507358375711"
// };

const config = {
  apiKey: "AIzaSyA_DRFo0R8x97u_T3w6rOzTVU3tqLQqmjA",
  authDomain: "major-project-a10e8.firebaseapp.com",
  databaseURL: "https://major-project-a10e8.firebaseio.com", // Saurav's Key
  projectId: "major-project-a10e8",
  storageBucket: "major-project-a10e8.appspot.com",
  messagingSenderId: "981414190665"
};


@NgModule({
  declarations: [
    MyApp,
    GeofencePage,
    AboutPage,
    HomePage,
    TabsPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GeofencePage,
    AboutPage,
    HomePage,
    TabsPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    Firebase,
    FcmProvider,
    ShareService
  ]
})
export class AppModule {}
