import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubcategoriesPage } from './subcategories';
@NgModule({
  declarations: [
    SubcategoriesPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SubcategoriesPage)
  ]
})
export class SubcategoriesPageModule {}
 
