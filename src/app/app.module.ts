import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { Geolocation } from '@ionic-native/geolocation';

import { MapComponent }from '../components/map/map';

import {
  GoogleMaps
} from '@ionic-native/google-maps';

import { AngularFireDatabaseModule, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { EditableComponent } from '../components/editable/editable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapComponent,
    EditableComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule {}
