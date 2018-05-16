import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Platform} from 'ionic-angular';//, Platform
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { _trans } from '../../app/app.translation';

import leaflet from 'leaflet';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { MapComponent } from '../../components/map/map';
//import { Geolocation } from '@ionic-native/geolocation';

//import { } from '@types/googlemaps';

declare var google: any;

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  //@ViewChild('map') mapElement: ElementRef;
  //map: any;
  
  // Google Maps
  //map: google.maps.Map;
  /*bounds: google.maps.LatLngBounds;
  markers: google.maps.Marker[];
  infoWindow: google.maps.InfoWindow;*/

  //map: GoogleMap;

  @ViewChild('dynamicMap') child:ElementRef;
  @ViewChild('dynamicMap2') child2:ElementRef;
  //@ViewChild(mapComponent) mapContainer: ElementRef;
  map: any;
  marker: any;

  user: Object = {id:10};
  user$: any;
  trans: Object;
  //markers = [];

  
  constructor(public navCtrl: NavController, private af: AngularFireDatabase, private chRef: ChangeDetectorRef) { //@Query(MapComponent) children:QueryList<MapComponent>    ///, private geolocation: Geolocation, public platform: Platform
    this.trans = _trans;
    
    //this.child.init();
    /*platform.ready().then(() => {
      this.initMap();
    });*/
  }

  ngOnInit(){
    this.user$ = this.af.database.ref("/users/dave/").on('value', (snapshot) => {
      this.user = snapshot.val();
      //this.tracer();
    });
    console.log(this.child);
    this.child.init();
    this.child2.init();
    console.log("boo");
    /*var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);*/

    /*this.map.load().then(() => {
      console.log("map is ready");
      this.page$.subscribe(page => {
          if (page && page.content) {
              this.latLngBounds = new google.maps.LatLngBounds();

              page.content.forEach(w => this.latLngBounds.extend(new google.maps.LatLng(lat, lng)));
          }
      });

    }*/
    //this.mapper();
    //setTimeout(this.mapper.bind(this), 2000);
  //}
  /*ionViewDidLoad() {
    this.loadMap();
  }
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });*/
    
    /*let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
     };
 
    this.map = GoogleMaps.create('map_canvas');//, mapOptions
 
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
         console.log('Map is ready!');
 
         // Now you can use all methods safely.
         this.map.addMarker({
           title: 'Ionic',
           icon: 'blue',
           animation: 'DROP',
           position: {
             lat: 43.0741904,
             lng: -89.3809802
           }
         })
         .then(marker => {
           marker.on(GoogleMapsEvent.MARKER_CLICK)
             .subscribe(() => {
               alert('clicked');
             });
         });
 
      });*/
   }
  /*mapper(){
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
    console.log("dun");
    console.log(google);
  }*/
  ionViewDidEnter() {
    this.loadmap();
  }

  
  loadmap() {
    this.map = leaflet.map("map", {
      preferCanvas: false,
      attributionControl:false,
      zoomControl:false
    });//.fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      this.marker = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(this.marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    }).on("move", (e) => {
        console.log(this.map.containerPointToLatLng(new leaflet.point(100, 50)));

    }).on("moveend", (e) => {
      let center: any = this.map.containerPointToLatLng(new leaflet.point(100, 50));
      if(this.marker){
        this.marker.setLatLng(center);
        this.turnOffMap();
      }
    })
  }

  turnOffMap(){
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    if (this.map.tap) this.map.tap.disable();
    document.getElementById('map').style.cursor='default';
  }
  turnOnMap(){
    this.map.dragging.enable();
    this.map.touchZoom.enable();
    this.map.doubleClickZoom.enable();
    this.map.scrollWheelZoom.enable();
    this.map.boxZoom.enable();
    this.map.keyboard.enable();
    if (this.map.tap) this.map.tap.enable();
    document.getElementById('map').style.cursor='grab';
    console.log(this.child);
  }
  latLngToLayerPoint (latlng: any) {
      //var projectedPoint = this.project(L.latLng(latlng))._round();
      //return projectedPoint._subtract(this.getPixelOrigin());

      //var aPoint = map1.latLngToLayerPoint(aLocation);
       //alert (aPoint); 
  }
  tracer(){
    this.chRef.detectChanges();
  }

  /*ionViewDidLoad(){
    //this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

  loadMapzz() {
    console.log("boo");
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      //this.map = this.google.create('map_canvas');
    }, (err) => {
      console.log(err);
    });
  }

  addMarker() { // To Add Marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h3>My New Location!</h3><h5>by Anish youtube - Please subscribe</h5>";
    this.addInfoWindow(marker, content);
  }
 
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }*/
}



//ionic cordova plugin add cordova-plugin-googlemaps \ --variable API_KEY_FOR_ANDROID="AIzaSyDZ5eT79ZSTfchOYRYNDpfU7vIGa38FCE8" \ --variable API_KEY_FOR_IOS="AIzaSyDZ5eT79ZSTfchOYRYNDpfU7vIGa38FCE8"