import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from './info';

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(InfoPage),
  ],
})
export class InfoPageModule {}
 
