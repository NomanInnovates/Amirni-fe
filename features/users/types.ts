export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: "active" | "inactive" | "suspended";
  role: "user" | "vendor" | "driver";
  joinedAt: Date;
  lastActive?: Date;
}

export interface UserAddress {
  id: string;
  userId: string;
  userName: string;
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

export interface UserReferral {
  id: string;
  referrerId: string;
  referrerName: string;
  referredName: string;
  referredEmail: string;
  status: "pending" | "registered" | "completed";
  reward: string;
  referredAt: Date;
  completedAt?: Date;
}
