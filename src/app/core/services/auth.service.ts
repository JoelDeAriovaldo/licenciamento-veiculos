import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private storage: StorageService) {
    this.loadUser();
  }

  private async loadUser() {
    const user = await this.storage.get('currentUser');
    this.currentUserSubject.next(user);
  }

  async login(email: string, password: string): Promise<boolean> {
    // Simula validação com dados locais
    const users = await this.storage.get('users') || [];
    const user = users.find((u: User) => u.email === email);

    if (user) {
      await this.storage.set('currentUser', user);
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  async register(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const users = await this.storage.get('users') || [];
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    await this.storage.set('users', users);
    return newUser;
  }

  async logout(): Promise<void> {
    await this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.storage.get('currentUser');
    return !!user;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }
}
