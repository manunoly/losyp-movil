import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesPage } from './services';

@NgModule({
  declarations: [
    ServicesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ServicesPage),
  ],
})
export class ServicesPageModule {}

