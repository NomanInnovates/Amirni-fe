import { z } from "zod";

export const DocumentUploadSchema = z.object({
  documentType: z.enum([
    "passport",
    "id_card",
    "driver_license",
    "utility_bill",
  ]),
  documentFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    ),
  documentNumber: z.string().min(1, "Document number is required"),
  expiryDate: z
    .date()
    .refine((date) => date > new Date(), "Document must not be expired"),
});

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.date().refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
  }, "Must be at least 18 years old"),
  nationality: z.string().min(2, "Nationality is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export const KYCApplicationSchema = z.object({
  personalInfo: PersonalInfoSchema,
});

export type DocumentUploadFormData = z.infer<typeof DocumentUploadSchema>;
export type PersonalInfoFormData = z.infer<typeof PersonalInfoSchema>;
export type KYCApplicationFormData = z.infer<typeof KYCApplicationSchema>;
