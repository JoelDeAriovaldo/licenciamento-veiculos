import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLicensePage } from './create-license.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLicensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLicensePageRoutingModule {}
