import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Payment, PaymentProvider, PaymentStatus } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private payments = new BehaviorSubject<Payment[]>([]);

  constructor(private storage: StorageService) {
    this.loadPayments();
  }

  private async loadPayments() {
    const payments = await this.storage.get('payments') || [];
    this.payments.next(payments);
  }

  async initiatePayment(
    userId: string,
    licenseId: string,
    amount: number,
    provider: PaymentProvider,
    phoneNumber: string
  ): Promise<Payment> {
    const payments = await this.storage.get('payments') || [];
    const payment: Payment = {
      id: Date.now().toString(),
      userId,
      licenseId,
      amount,
      provider,
      phoneNumber,
      reference: `REF-${Date.now()}`,
      status: PaymentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    payments.push(payment);
    await this.storage.set('payments', payments);
    this.payments.next(payments);
    return payment;
  }

  async updatePayment(updatedPayment: Payment): Promise<void> {
    const payments = await this.storage.get('payments') || [];
    const index = payments.findIndex((payment: Payment) => payment.id === updatedPayment.id);
    if (index !== -1) {
      payments[index] = updatedPayment;
      await this.storage.set('payments', payments);
      this.payments.next(payments);
    }
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    const payments = await this.storage.get('payments') || [];
    return payments.filter((payment: Payment) => payment.userId === userId);
  }

  async getPaymentByLicense(licenseId: string): Promise<Payment | undefined> {
    const payments = await this.storage.get('payments') || [];
    return payments.find((payment: Payment) => payment.licenseId === licenseId);
  }
}
