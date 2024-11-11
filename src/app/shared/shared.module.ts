import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../shared/components/header/header/header.module';
import { LoadingModule } from '../shared/components/loading/loading/loading.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    LoadingModule,
    PipesModule
  ],
  exports: [
    HeaderModule,
    LoadingModule,
    PipesModule
  ]
})
export class SharedModule { }
