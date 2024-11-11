export enum PaymentProvider {
  MPESA = 'MPESA',
  EMOLA = 'E-MOLA',
  MKESH = 'M-KESH'
}

export enum PaymentStatus {
  PENDING = 'PENDENTE',
  PROCESSING = 'PROCESSANDO',
  COMPLETED = 'CONCLUÍDO',
  FAILED = 'FALHOU'
}

export interface Payment {
  id: string;
  userId: string;
  licenseId: string;
  amount: number;
  provider: PaymentProvider;
  phoneNumber: string;
  reference: string;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}