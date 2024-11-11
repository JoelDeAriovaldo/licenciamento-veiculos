import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { License } from '../models/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  constructor(private storage: StorageService) { }

  async createLicense(license: License): Promise<License> {
    const licenses = await this.storage.get('licenses') || [];
    license.id = Date.now().toString();
    license.createdAt = new Date();
    license.updatedAt = new Date();
    licenses.push(license);
    await this.storage.set('licenses', licenses);
    return license;
  }

  async getLicenses(): Promise<License[]> {
    return await this.storage.get('licenses') || [];
  }

  async getLicensesByUser(userId: string): Promise<License[]> {
    const licenses = await this.storage.get('licenses') || [];
    return licenses.filter((license: License) => license.userId === userId);
  }

  async getLicenseById(licenseId: string): Promise<License | undefined> {
    const licenses = await this.storage.get('licenses') || [];
    return licenses.find((license: License) => license.id === licenseId);
  }

  async getPaidLicensesByUser(userId: string): Promise<License[]> {
    const licenses = await this.storage.get('licenses') || [];
    return licenses.filter((license: License) => license.userId === userId && license.status === 'PAID');
  }

  async updateLicense(updatedLicense: License): Promise<void> {
    const licenses = await this.storage.get('licenses') || [];
    const index = licenses.findIndex((license: License) => license.id === updatedLicense.id);
    if (index !== -1) {
      licenses[index] = updatedLicense;
      await this.storage.set('licenses', licenses);
    }
  }
}
