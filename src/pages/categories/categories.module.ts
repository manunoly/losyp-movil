import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
// import { AppHeaderComponent } from '../../components/app-header/app-header';


@NgModule({
  declarations: [
    CategoriesPage,
    // AppHeaderComponent
  ]
  ,
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CategoriesPage),
    // AppHeaderComponent
  ]
})
export class CategoriesPageModule {}
