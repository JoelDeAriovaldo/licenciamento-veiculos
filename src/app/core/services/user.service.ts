import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storage: StorageService) { }

  async updateUser(user: User): Promise<User> {
    const users = await this.storage.get('users') || [];
    const index = users.findIndex((u: User) => u.id === user.id);

    if (index !== -1) {
      users[index] = {
        ...user,
        updatedAt: new Date()
      };
      await this.storage.set('users', users);

      const currentUser = await this.storage.get('currentUser');
      if (currentUser && currentUser.id === user.id) {
        await this.storage.set('currentUser', users[index]);
      }
    }

    return user;
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const users = await this.storage.get('users') || [];
    return users.find((u: User) => u.id === userId);
  }
}
