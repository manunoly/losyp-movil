import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, ViewController, App, AlertController, ToastController} from "ionic-angular";
import {ServiceProvider} from '../../providers/service/service.service';
// import {ServicePage} from '../service/service';
import {PhotoViewer} from '@ionic-native/photo-viewer';
// import {Create1Page} from '../create1/create1';
import {PagarPage} from '../pagar/pagar';

@IonicPage()
@Component({
  selector: 'page-myservices',
  templateUrl: 'myservices.html',

})
export class MyservicesPage {
  // declaracion de variables
  services = [];
  temp = []
  email: any;
  token: any;

  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public appCtrl: App,
              public servProv: ServiceProvider, private photoViewer: PhotoViewer,
              public load: LoadingController, private alertCtrl: AlertController) {
                this.loadServises();
  }

  loadServises(){
    let loading = this.load.create({
      content: "Cargando..."
    });
    loading.present();
    this.servProv.getMyServices().then(
      (serv) => {
        this.services = serv['data'];
        this.temp = this.services;
        loading.dismiss();
      }
    ).catch(
      (error) => {
        loading.dismiss();
      }
    );
  }

  back() {
    this.navCtrl.pop();
  }

  getSearchValue(value) {
    this.services = this.temp;
    if (value && value.trim() == '') {
      this.services = this.temp;
    }
    if (value && value.trim() != '') {
      this.services = this.services.filter((item) => {
        return (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }
  }

  delete(id) {
    let confirm = this.alertCtrl.create({
      title: "¿Está seguro que desea eliminar el servicio? ",
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
            this.servProv.deleteService(id).then(
              response => {
                // this.services = this.services.filter(service => service.id !== id);
                this.loadServises();
                  let toast = this.toastCtrl.create({
                          message: "Servicio eliminado correctamente",
                          duration: 5000,
                          position: "bottom",
                          showCloseButton: true,
                          closeButtonText: "Cerrar",
                        });
                        toast.present();

              }
            ).catch(error => {
              console.log(error);
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
  }

  viewImg(img) {
    this.photoViewer.show(img);
  }

  openServicePage(id, serv) {
    // this.navCtrl.push("ServicePage",{
    //   serviceId: id,
    //   service:serv
    // });
    // this.viewCtrl.dismiss();
    this.navCtrl.push("ServicePage", {
      serviceId: id,
      service: serv
    });
    // this.appCtrl.getActiveNavs()[0].push(ServicePage, {
    //   serviceId: id,
    //   service:serv
    // });

  }

  pagarServicio(id,titulo) {
    let toast = this.toastCtrl.create({
      message: "La forma de pago esta siendo modificada, estamos trabajando!",
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "Cerrar"
    });
    toast.present();
    // this.navCtrl.push(PagarPage, {
    //   id: id,
    //   name: titulo
    // });
  }
  becomePro(){
    let toast = this.toastCtrl.create({
      message: "Próximamente te brindaremos más funciones!",
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "Cerrar"
    });
    toast.present();
  }

  editService(serv) {
    this.navCtrl.push("Create1Page", {
      service: serv
    });
  }

}
