import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabMapaPage } from './tab-mapa';

@NgModule({
  declarations: [
    TabMapaPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TabMapaPage),
  ],
})
export class TabMapaPageModule {}

