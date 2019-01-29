import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatePage } from './rate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RatePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RatePage),
  ],
})
export class RatePageModule {}

