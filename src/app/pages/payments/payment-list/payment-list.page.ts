import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicenseService } from '../../../core/services/license.service';
import { License } from '../../../core/models/license.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.page.html',
  styleUrls: ['./payment-list.page.scss'],
})
export class PaymentListPage implements OnInit {
  licenses: License[] = [];

  constructor(private licenseService: LicenseService, private router: Router) { }

  ngOnInit() {
    this.loadLicenses();
  }

  async loadLicenses() {
    this.licenses = await this.licenseService.getLicenses();
  }

  viewPaymentDetail(licenseId: string) {
    this.router.navigate(['/tabs/payment-detail', licenseId]);
  }
}
