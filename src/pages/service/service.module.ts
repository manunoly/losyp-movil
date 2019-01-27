import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePage } from './service';

@NgModule({
  declarations: [
    ServicePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ServicePage),
  ],
})
export class ServicePageModule {}
 
