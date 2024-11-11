import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  async onSubmit() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'A autenticar...'
      });
      await loading.present();

      try {
        const { email, password } = this.loginForm.value;
        const success = await this.authService.login(email, password);

        if (success) {
          await this.router.navigate(['/tabs/home'], { replaceUrl: true });
        } else {
          await this.showError('Email ou senha incorretos.');
        }
      } catch (error) {
        await this.showError('Erro ao fazer login. Tente novamente.');
      } finally {
        await loading.dismiss();
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
