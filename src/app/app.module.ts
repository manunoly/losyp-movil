import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {EqualValidator} from '../_directive/validate-password.directive';


import { MyApp } from './app.component';
//paginas
// import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/pop-over/pop-over';
// import { CategoriesPage } from '../pages/categories/categories';
// import { SubcategoriesPage } from '../pages/subcategories/subcategories';
// import { ServicesPage } from '../pages/services/services';
// import { LoginPage  } from '../pages/login/login';
// import { SignupPage  } from '../pages/signup/signup';
// import { FavoritesPage  } from '../pages/favorites/favorites';
// import { BusquedaPage  } from '../pages/busqueda/busqueda';
// import { MyservicesPage  } from '../pages/myservices/myservices';
// import { ServicePage  } from '../pages/service/service';
// import { RatePage } from "../pages/rate/rate";
// import { InfoPage } from "../pages/info/info";
// import { MapaPage } from "../pages/mapa/mapa";
// import { GaleriaPage } from "../pages/galeria/galeria";
// import { ComentariosPage } from "../pages/comentarios/comentarios";
// import { Create1Page } from "../pages/create1/create1";
import { Create2Page } from "../pages/create2/create2";
import {  TabPage} from "../pages/tab/tab";
// import {  TabMapaPage} from "../pages/tab-mapa/tab-mapa";
// import {CondicionesPage} from "../pages/condiciones/condiciones";
// import { BuzonPage } from './../pages/buzon/buzon';


// Componentes
// import {AppHeaderComponent} from '../components/app-header/app-header';
// import { IonRating } from '../components/ion-rating/ion-rating';
// import { ServUpInfoComponent } from '../components/serv-up-info/serv-up-info';
import { ComponentsModule } from './../components/components.module';

//Servicios
import { SubCategoryProvider } from '../providers/sub-category/sub-category';
import { CategoryProvider } from '../providers/category/category.service';
import { ServiceProvider } from '../providers/service/service.service';
import { AuthProvider } from '../providers/auth/auth';
import { ApiProvider } from '../providers/api/api';

// native
import { FCM } from "@ionic-native/fcm";
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Keyboard } from '@ionic-native/keyboard';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from "@ionic-native/call-number";
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Create3Page } from '../pages/create3/create3';
import { Create4Page } from '../pages/create4/create4';
import { PagarPage } from '../pages/pagar/pagar';
import { FiltroModalPage } from '../pages/filtro-modal/filtro-modal';
import { ModalDenunciaPage } from '../pages/modal-denuncia/modal-denuncia';
// import { ChangePassPage } from '../pages/change-pass/change-pass';
import {ModalHorarioPage} from "../pages/modal-horario/modal-horario";
import { SocialSharing } from '@ionic-native/social-sharing';
// import {SearchPage} from "../pages/search/search";
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { NotificacionesPushProvider } from '../providers/notificaciones-push/notificaciones-push';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    TabPage,
    // HomePage,
    // SearchPage,
    PopoverPage,
    // CondicionesPage,
    // CategoriesPage,
    // SubcategoriesPage,
    // AppHeaderComponent,
    // IonRating,
    // ServUpInfoComponent,
    // ServicesPage,
    FiltroModalPage,
    ModalHorarioPage,
    // FavoritesPage,
    // BusquedaPage,
    // MyservicesPage,
    // ServicePage,
    // RatePage,
    // InfoPage,
    // MapaPage,
    // GaleriaPage,
    // ComentariosPage,
    // Create1Page,
    Create2Page,
    Create3Page,
    Create4Page,
    PagarPage,
    // TabMapaPage,
    ModalDenunciaPage,
      EqualValidator,
    // ChangePassPage,
    // BuzonPage
    // LoginPage,
    // SignupPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true, //estaba true
      // autoFocusAssist: false
      // Tabs config
      tabsHideOnSubPages: true,
    }),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabPage,
    // HomePage,
    PopoverPage,
    // SearchPage,
    // CondicionesPage,
    // CategoriesPage,
    // SubcategoriesPage,
    // AppHeaderComponent,
    // IonRating,
    // ServUpInfoComponent,
    // ServicesPage,
    FiltroModalPage,
    // LoginPage,
    // SignupPage,
    // FavoritesPage,
    ModalHorarioPage,
    // BusquedaPage,
    // MyservicesPage,
    //  ServicePage,
    // RatePage,
    // InfoPage,
    // MapaPage,
    // GaleriaPage,
    // ComentariosPage,
    // Create1Page,
    Create2Page,
    Create3Page,
    Create4Page,
    PagarPage,
    // TabMapaPage,
    ModalDenunciaPage,
    // ChangePassPage,
    // BuzonPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    File,
    Camera,
    CallNumber,
    Keyboard,
    OpenNativeSettings,
    Diagnostic,
    Geolocation,
    LaunchNavigator,
    FCM,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SubCategoryProvider,
    CategoryProvider,
    ServiceProvider,
    AuthProvider,
    NotificacionesPushProvider,
    ApiProvider,
    Facebook

    ]
})
export class AppModule {

}
