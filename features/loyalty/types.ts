export interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  pointsPerDollar: number;
  minRedemption: number;
  status: "active" | "inactive" | "draft";
  membersCount: number;
  totalPointsIssued: number;
  createdAt: Date;
}

export interface PointsVoucher {
  id: string;
  code: string;
  type: "points" | "voucher" | "coupon";
  value: number;
  description: string;
  userId?: string;
  userName?: string;
  status: "active" | "used" | "expired" | "revoked";
  expiresAt: Date;
  createdAt: Date;
  usedAt?: Date;
}

export interface Membership {
  id: string;
  userId: string;
  userName: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  points: number;
  totalSpent: number;
  status: "active" | "expired" | "suspended";
  joinedAt: Date;
  expiresAt: Date;
  benefits: string[];
}
