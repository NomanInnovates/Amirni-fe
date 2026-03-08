export interface PaymentMethod {
  id: string;
  userId: string;
  userName: string;
  type: "credit_card" | "debit_card" | "wallet" | "bank_transfer" | "cash";
  provider: string;
  last4?: string;
  isDefault: boolean;
  status: "active" | "expired" | "disabled";
  addedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: "payment" | "refund" | "payout" | "topup";
  amount: number;
  currency: string;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded";
  reference: string;
  description: string;
  createdAt: Date;
}
