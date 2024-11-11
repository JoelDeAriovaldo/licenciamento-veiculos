import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateLicensePageRoutingModule } from './create-license-routing.module';
import { CreateLicensePage } from './create-license.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateLicensePageRoutingModule
  ],
  declarations: [CreateLicensePage]
})
export class CreateLicensePageModule {}