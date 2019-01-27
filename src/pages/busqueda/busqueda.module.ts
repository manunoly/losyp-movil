import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusquedaPage } from './busqueda';

@NgModule({
  declarations: [
    BusquedaPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BusquedaPage),
  ],
})
export class BusquedaPageModule {}

