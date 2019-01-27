import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariosPage } from './comentarios';

@NgModule({
  declarations: [
    ComentariosPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ComentariosPage),
  ],
})
export class ComentariosPageModule {}
 
