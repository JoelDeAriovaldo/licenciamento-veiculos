export interface License {
  id: string;
  userId: string;
  vehiclePlate: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleYear: number;
  documentNumber: string;
  expiryDate: Date;
  amount: number;
  paymentId?: string;
  status: 'PENDING' | 'PAID' | 'EXPIRED';
  createdAt: Date;
  updatedAt: Date;
}
