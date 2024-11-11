import { Component, OnInit } from '@angular/core';
import { LicenseService } from '../../core/services/license.service';
import { License } from '../../core/models/license.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  licenses: License[] = [];
  activeLicensesCount = 0;
  pendingLicensesCount = 0;
  expiredLicensesCount = 0;

  constructor(private licenseService: LicenseService) { }

  ngOnInit() {
    this.loadLicenses();
  }

  async loadLicenses() {
    this.licenses = await this.licenseService.getLicenses();
    this.activeLicensesCount = this.licenses.filter(license => license.status === 'PAID').length;
    this.pendingLicensesCount = this.licenses.filter(license => license.status === 'PENDING').length;
    this.expiredLicensesCount = this.licenses.filter(license => license.status === 'EXPIRED').length;
  }
}
