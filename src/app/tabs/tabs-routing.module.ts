import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'create-license',
        loadChildren: () => import('../pages/create-license/create-license.module').then(m => m.CreateLicensePageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../pages/payments/payment-list/payment-list.module').then(m => m.PaymentListPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../pages/history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'payment-detail/:id',
        loadChildren: () => import('../pages/payments/payment-detail/payment-detail.module').then(m => m.PaymentDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
