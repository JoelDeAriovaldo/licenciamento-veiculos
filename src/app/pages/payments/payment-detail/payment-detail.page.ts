import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../core/services/payment.service';
import { LicenseService } from '../../../core/services/license.service';
import { Payment, PaymentProvider, PaymentStatus } from '../../../core/models/payment.model';
import { License } from '../../../core/models/license.model';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  payment?: Payment;
  license?: License;
  paymentProviders = PaymentProvider;
  selectedProvider?: PaymentProvider;
  phoneNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private licenseService: LicenseService
  ) { }

  ngOnInit() {
    this.loadPayment();
  }

  async loadPayment() {
    const licenseId = this.route.snapshot.paramMap.get('id');
    if (licenseId) {
      this.license = await this.licenseService.getLicenseById(licenseId);
      this.payment = await this.paymentService.getPaymentByLicense(licenseId);
    }
  }

  async initiatePayment() {
    if (this.license && this.selectedProvider && this.phoneNumber) {
      const payment = await this.paymentService.initiatePayment(
        this.license.userId,
        this.license.id,
        this.license.amount,
        this.selectedProvider,
        this.phoneNumber
      );

      // Simular pagamento bem-sucedido
      payment.status = PaymentStatus.COMPLETED;
      payment.updatedAt = new Date();
      await this.paymentService.updatePayment(payment);

      // Atualizar status da licença
      this.license.status = 'PAID';
      this.license.updatedAt = new Date();
      await this.licenseService.updateLicense(this.license);

      this.payment = payment;

      // Navegar para a página de histórico de pagamentos
      this.router.navigate(['/tabs/payments']);
    }
  }
}
