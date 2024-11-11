import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^258[82|83|84|85|86|87]\d{7}$/)]],
      documentNumber: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  async onSubmit() {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'A criar conta...'
      });
      await loading.present();

      try {
        const userData = this.registerForm.value;
        await this.authService.register(userData);
        await this.router.navigate(['/login']);
        await this.showSuccess();
      } catch (error) {
        await this.showError('Erro ao criar conta. Tente novamente.');
      } finally {
        await loading.dismiss();
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Conta criada com sucesso! Por favor, faça login.',
      buttons: ['OK']
    });
    await alert.present();
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
