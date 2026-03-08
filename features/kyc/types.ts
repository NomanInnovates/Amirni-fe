export interface KYCDocument {
  id: string;
  userId: string;
  userName: string;
  type: "passport" | "id_card" | "driver_license" | "vehicle_registration";
  documentNumber: string;
  expiryDate: Date;
  issuingCountry: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: Date;
  verifiedAt?: Date;
  rejectionReason?: string;
}

export interface DriverVerification {
  id: string;
  driverId: string;
  driverName: string;
  driverType: "solo" | "company";
  documentsSubmitted: number;
  documentsApproved: number;
  documentsRejected: number;
  overallStatus: "pending" | "approved" | "rejected" | "incomplete";
  rejectionReason?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}

export interface KYCApplication {
  id: string;
  userId: string;
  status: "incomplete" | "pending" | "approved" | "rejected";
  documents: KYCDocument[];
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    nationality: string;
    address: string;
  };
  verificationLevel: "level0" | "level1" | "level2" | "level3";
  submittedAt?: Date;
  completedAt?: Date;
}
