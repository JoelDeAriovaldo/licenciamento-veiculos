import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user?: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user ?? undefined;
    });
  }

  async updateUserProfile() {
    if (this.user) {
      await this.userService.updateUser(this.user);
      // Adicione lógica para exibir uma mensagem de sucesso ou erro
    }
  }
}
