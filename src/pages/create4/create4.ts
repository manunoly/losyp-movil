import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { sendService } from "../../models/sendService";
import { ServiceProvider } from "../../providers/service/service.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Position } from "../../models/position";
// import { ServicePage } from "../service/service";
import { AuthProvider } from "../../providers/auth/auth";
import { Geolocation } from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: "page-create4",
  templateUrl: "create4.html"
})
export class Create4Page {
  edit: boolean;
  distanceM: any;
  directionsDisplay: any;
  directionsService: any;
  infowindow: any;
  // cantAdd:boolean;
  service: sendService;
  positions: Position[] = [];
  titulo: any;

  cant_c: any;
  latLng: any;
  // infowindow = new google.maps.InfoWindow;
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;
  // distanceM = new google.maps.DistanceMatrixService();
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  currentPosition: any;
  markers: any;
  latitude: number;
  longitude: number;
  flagPosition = false;

  constructor(
    public auth: AuthProvider,
    private geolocation: Geolocation,
    public load: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public servProv: ServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.service = this.navParams.get("service");
    this.service.positions = [];
    this.markers = [];
    if (this.navParams.get("service").id) {
      this.edit = true;
      this.positions = this.navParams.get("service").positionsList;
    }
  }

  goToCreate3() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    if (typeof google !== "undefined") {
      this.infowindow = new google.maps.InfoWindow();
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.distanceM = new google.maps.DistanceMatrixService();
      let loading = this.load.create({
        content: "Cargando mapa..."
      });
      loading.present();

      if (this.auth.getlastPosition()) {
        this.latLng = new google.maps.LatLng(
          this.auth.getlastPosition().coords.latitude,
          this.auth.getlastPosition().coords.longitude
        );
      } else {
        this.latLng = new google.maps.LatLng(-0.22985, -78.52495);
      }
      this.initMap();
      loading.dismiss();
    }
  }

  crearService() {
    let loading;
    if (this.edit) {
      loading = this.load.create({
        content: "Editando servicio..."
      });
    } else {
      loading = this.load.create({
        content: "Creando servicio..."
      });
    }
    loading.present();
    this.service.positions = this.positions;
    this.servProv.createFullService(this.service).then(
      data => {
        setTimeout(() => {
          this.navCtrl.push("ServicePage", {
            service: data, //paso el service
            serviceId: data.id //si paso el id del servicio para la peticion
          });
        }, 0);
        this.navCtrl.popToRoot();
        loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        console.log("error en el servidor");
        loading.dismiss();
      }
    );
  }

  addInfoWindow(marker, content) {
    if (typeof google !== "undefined") {
      google.maps.event.addListener(marker, "click", () => {
        this.infowindow.setContent(content);
        this.infowindow.open(this.map, marker);
      });
    }
  }

  initMap() {
    // if (typeof google !== 'undefined') {
    let mapOptions = {
      center: this.latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    for (let i = 0; i < this.positions.length; i++) {
      let marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(
          this.positions[i].latitude,
          this.positions[i].longitude
        )
      });
      let content = "<h4>" + this.positions[i].title + "</h4>";
      this.addInfoWindow(marker, content);
    }
    google.maps.event.addListener(this.map, "click", this.addMarker(this));
    // }
  }

  addMarker(that) {
    if (typeof google !== "undefined") {
      return function(event) {
        let marker = new google.maps.Marker({
          position: event.latLng,
          map: that.map,
          draggable: true,
          animation: google.maps.Animation.DROP
        });

        that.latitude = marker.getPosition().lat();
        that.longitude = marker.getPosition().lng();

        that.map.panTo(event.latLng);

        that.markers.push(marker);
        that.flagPosition = true;
        // that.zone.run(() => {
        // });

        google.maps.event.addListener(marker, "dragend", function() {
          that.latitude = marker.getPosition().lat();
          that.longitude = marker.getPosition().lng();
          that.map.panTo(marker.getPosition());
        });
        // that.cantAdd=true;
        google.maps.event.clearListeners(that.map, "click");
      };
    }
  }

  addPosition() {
    if (typeof google !== "undefined") {
      this.positions.push({
        latitude: this.latitude,
        longitude: this.longitude,
        title: this.titulo
      });
      const content = '<h6 class="tc-blue">' + this.titulo + "</h6>";
      this.addInfoWindow(this.markers[this.markers.length - 1], content);

      this.markers[this.markers.length - 1].draggable = false;
      google.maps.event.addListener(this.map, "click", this.addMarker(this));

      this.flagPosition = false;

      this.titulo = null;
      this.longitude = null;
      this.latitude = null;
    }
  }

  deletePosition(pos: number) {
    let confirm = this.alertCtrl.create({
      title: "¿Está seguro que desea eliminar la ubicación? ",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {}
        },
        {
          text: "Si",
          handler: () => {
            this.positions.splice(pos, 1);
            if (typeof google !== "undefined") this.markers[pos].setMap(null);
            this.markers.splice(pos, 1);
          }
        }
      ]
    });
    confirm.present();
  }
}
