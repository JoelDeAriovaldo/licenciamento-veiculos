import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LicenseService } from '../../core/services/license.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-create-license',
  templateUrl: './create-license.page.html',
  styleUrls: ['./create-license.page.scss'],
})
export class CreateLicensePage implements OnInit {
  licenseForm: FormGroup;
  userId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private licenseService: LicenseService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.licenseForm = this.formBuilder.group({
      vehiclePlate: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      vehicleModel: ['', [Validators.required]],
      vehicleYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      documentNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.userId = user?.id || null;
    });
  }

  async onSubmit() {
    console.log('Form Valid:', this.licenseForm.valid);
    console.log('Form Value:', this.licenseForm.value);
    console.log('User ID:', this.userId);

    if (this.licenseForm.valid && this.userId) {
      const loading = await this.loadingController.create({
        message: 'Criando licença...'
      });
      await loading.present();

      try {
        const licenseData = {
          ...this.licenseForm.value,
          userId: this.userId,
          status: 'PENDING', // Adiciona o status inicial
          createdAt: new Date(),
          updatedAt: new Date()
        };
        console.log('License Data:', licenseData);
        await this.licenseService.createLicense(licenseData);
        await this.router.navigate(['/tabs/home']);
        await this.showSuccess();
      } catch (error) {
        console.error('Erro ao criar licença:', error);
        await this.showError('Erro ao criar licença. Tente novamente.');
      } finally {
        await loading.dismiss();
      }
    } else {
      this.licenseForm.markAllAsTouched();
    }
  }

  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Licença criada com sucesso!',
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
}
