import { Component, ChangeDetectorRef, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Platform} from 'ionic-angular';
import leaflet from 'leaflet';
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  @ContentChild('div', {read:ElementRef}) mapContainer: ElementRef;
  //mapContainer: any;
  map: any;
  marker: any;

  constructor(public dom: ElementRef) {
  }

  ionViewDidEnter() {
    this.loadmap();
    console.log("baboooom");
  }
  public init(){
    console.log("inited");
    this.loadmap();
  }
  
  loadmap() {
    this.map = leaflet.map(this.dom.nativeElement.firstElementChild, {
      preferCanvas: false,
      attributionControl:false,
      zoomControl:false
    });//.fitWorld();/**/
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
    })/**/
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
  }
  latLngToLayerPoint (latlng: any) {
      //var projectedPoint = this.project(L.latLng(latlng))._round();
      //return projectedPoint._subtract(this.getPixelOrigin());

      //var aPoint = map1.latLngToLayerPoint(aLocation);
       //alert (aPoint); 
  }
}
