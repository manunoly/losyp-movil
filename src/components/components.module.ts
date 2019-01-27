import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header';
import { IonRating } from './ion-rating/ion-rating';
import { ServUpInfoComponent } from './serv-up-info/serv-up-info';

import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [AppHeaderComponent,IonRating,
    ServUpInfoComponent],
	imports: [IonicModule],
	exports: [AppHeaderComponent,IonRating,
    ServUpInfoComponent],
})
export class ComponentsModule {}
