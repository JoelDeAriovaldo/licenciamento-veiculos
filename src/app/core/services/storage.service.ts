import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<void> {
    console.log(`Setting key ${key} with value`, value);
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    const value = await this._storage?.get(key);
    console.log(`Getting key ${key} with value`, value);
    return value;
  }

  async remove(key: string): Promise<void> {
    console.log(`Removing key ${key}`);
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    console.log('Clearing storage');
    await this._storage?.clear();
  }
}