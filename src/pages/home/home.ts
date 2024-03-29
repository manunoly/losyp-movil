// componetes angular

import {Component, ViewChild} from "@angular/core";
// providers
import {SubCategoryProvider} from '../../providers/sub-category/sub-category';
import {AuthProvider} from '../../providers/auth/auth';
import {ServiceProvider} from "../../providers/service/service.service";
import {ApiProvider} from "../../providers/api/api";
// import { NotificacionesPushProvider } from './../../providers/notificaciones-push/notificaciones-push';

// Paginas
import {PopoverPage} from '../pop-over/pop-over';
import {ServicesPage} from '../services/services';
// import {CategoriesPage} from '../categories/categories';
import 'rxjs/add/operator/map';
// componetes ionic 
import {IonicPage, PopoverController, NavController, AlertController, ModalController, LoadingController,} from 'ionic-angular';
import {
  NavParams,
  Keyboard,
  Platform,
  ViewController
} from "ionic-angular";
// native components
import {SplashScreen} from '@ionic-native/splash-screen';
// import {ServicePage} from "../service/service";
import {HttpErrorResponse} from "@angular/common/http";
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {StatusBar} from "@ionic-native/status-bar";
import {SearchPage} from "../search/search";
import {OpenNativeSettings} from '@ionic-native/open-native-settings';
import {Diagnostic} from '@ionic-native/diagnostic';
import {Geoposition} from "@ionic-native/geolocation";
import {FiltroModalPage} from '../filtro-modal/filtro-modal';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    subCategories = [];
    services = [];
    para: any;
    connetionDown: boolean;
    filtro: boolean;
    loggedIn: boolean;
    noFound: boolean;
    filter_city: any = [];
    filter_category: any = [];
    busqueda: boolean;
    @ViewChild('search') search;


    constructor(public modalCtrl: ModalController,
                private alertCtrl: AlertController,
                private openNativeSettings: OpenNativeSettings,
                private diagnostic: Diagnostic,
                public auth: AuthProvider,
                private popoverCtrl: PopoverController,
                public load: LoadingController,
                public subCat: SubCategoryProvider,
                public navCtrl: NavController,
                public api: ApiProvider,
                public servProv: ServiceProvider,
                private photoViewer: PhotoViewer,
                public keyboard: Keyboard,
                public viewCtrl: ViewController,
                public navParams: NavParams, public splashScreen: SplashScreen, public platform: Platform, statusBar: StatusBar,
                // private push: NotificacionesPushProvider
    ) {



      this.platform.ready().then(() => {
        // this.auth.currentPosition.subscribe(
        //   (data: Geoposition) => {
        //     console.log(data.coords);
        //   },
        //   (error: Geoposition) => {
        //     alert(error);
        //   },
        // );

        // if(this.diagnostic.isLocationAuthorized())
        // {
        //   alert("isLocationAvailable");
        // }
        // else{
        //   alert("no esta avaliable");
        // }
        // if (this.diagnostic.isLocationAvailable() && this.diagnostic.isLocationEnabled()) {
        //   // this.openNativeSettings.open('location');
        //   this.diagnostic.switchToLocationSettings();
        // }
        //statusBar.hide();
        //statusBar.backgroundColorByHexString('#ffffff');
        this.platform.registerBackButtonAction((readySource) => {
          if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
          }
          else {
           if (this.viewCtrl.isLast()){
              this.exitApp();
            }
            else{
              this.viewCtrl.dismiss();
            }
          }

        });

        this.subCat.topSubcategories().then(
          data => {
            this.subCategories = data['data'];
            this.splashScreen.hide();
            this.connetionDown = false;
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.connetionDown = true;
              this.splashScreen.hide();
            } else {
              this.connetionDown = true;
              this.splashScreen.hide();
            }
          });
      });
    }

    goToMap(){
      this.navCtrl.push("TabMapaPage");
    }

    filterServices(){
        const profileModal = this.modalCtrl.create(FiltroModalPage, {
            filter_city: this.filter_city,
            filter_category: this.filter_category,
        });
        profileModal.onDidDismiss(data => {
          if (data && !data["close"]) {
            this.filter_city = data.filter_city;
            this.filter_category = data.filter_category;
            if (data.clear != undefined) {
                this.deleteFilter();
            }
            console.log(data.filter_category);
            if (data.filter_category != undefined || data.filter_city != undefined ){
                this.buscar();
            }
          }
        });

        profileModal.present();
    }

    ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.auth.currentUser.subscribe(user => {
        this.loggedIn = user;
      });
      this.auth.currentPosition.subscribe(
        (data: Geoposition) => {
          console.log("cambio coorrdenadas");
          },
        (error: Geoposition) => { alert(error); },
      );
      // this.push.subcribe();

    });
  }

    ionViewDidEnter() {
    if (this.navParams.get('connetionDown')) {
      this.connetionDown = true;
    }
  }

    ionViewWillEnter() {
    this.search.value = "";
  }

    viewImg(img) {
    this.platform.ready().then(() => {
      this.photoViewer.show(img);
    });
  }

    exitApp() {
    let confirm = this.alertCtrl.create({
      title: "¿Desea salir de la aplicación? ",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
          }
        },
        {
          text: "Si",
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }

    buscar() {
        this.navCtrl.push("SearchPage", {
          buscar: this.search.value,
            filter_city: this.filter_city,
            filter_category: this.filter_category
        });
  }

    deleteFilter() {
         this.filtro = false;
         this.filter_city = [];
         this.filter_category = [];
        //  this.filter_distance = 0;
    }

    goSearch(keyCode) {
    if (keyCode === 13) {
      this.navCtrl.push("SearchPage", {
        buscar: this.search.value
      });
    }
  }

    openServicePage(id, index) {
      this.navCtrl.push("ServicePage", {
        service: this.services[index], //paso el service
        serviceId: id,  //si paso el id del servicio para la peticion
        parentPage: this
      });
  }

    delete(chip: Element) {
      chip.remove();
    }

    presentPopover(ev) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
        ev: ev,

      });
    }

    openCategoriesPage() {
      this.navCtrl.push("CategoriesPage")
    }

    openServicesPage(id, title) {
      this.navCtrl.push("SearchPage", {
        buscar: "",
          filter_city: [],
          filter_category: [id],
          hide_category: true,
          subCategoriaTitutlo: title
      });
      // this.api.test().then(
      //   () => {
      // this.navCtrl.push(ServicesPage, {
      //   subCatId: id
      // });
      // },
      // (err: HttpErrorResponse) => {
      //   // no hay conexion
      //     this.connetionDown = true;
      // });

    }

    reConnect() {
      this.subCat.topSubcategories()
        .then(
          (cat) => {
            this.busqueda = false;
            this.connetionDown = false;
            this.subCategories = cat['data'];
          }
        ).catch(
        (error) => {
          this.connetionDown = true;
        }
      );
    }

    toogleFavorite(index, id) {
      if (this.services[index].favorite == 1) {
        this.servProv.diskMarkfavorite(id).then(
          data => {
            this.services[index].favorite = 0;
          });
      }
      else {
        this.servProv.markfavorite(id).then(
          data => {
            this.services[index].favorite = 1;
          });
      }

    }
}

