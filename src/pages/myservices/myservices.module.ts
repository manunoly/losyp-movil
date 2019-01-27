import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyservicesPage } from './myservices';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyservicesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MyservicesPage),
  ],
})
export class MyservicesPageModule {}

