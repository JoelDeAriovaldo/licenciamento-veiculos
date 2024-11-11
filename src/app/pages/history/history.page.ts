import { Component, OnInit } from '@angular/core';
import { LicenseService } from '../../core/services/license.service';
import { AuthService } from '../../core/services/auth.service';
import { License } from '../../core/models/license.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  licenses: License[] = [];

  constructor(
    private licenseService: LicenseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadPaidLicenses();
  }

  async loadPaidLicenses() {
    const currentUser = await this.authService.getCurrentUser().toPromise();
    if (currentUser?.id) {
      this.licenses = await this.licenseService.getPaidLicensesByUser(currentUser.id);
    }
  }
}
