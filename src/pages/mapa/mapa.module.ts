import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MapaPage),
  ],
})
export class MapaPageModule {}

