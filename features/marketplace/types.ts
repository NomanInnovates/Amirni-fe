export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  status: "draft" | "active" | "inactive";
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  vendorId: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  serviceOrProduct: string;
  type: "service" | "product";
  status: "pending" | "scheduled" | "inprogress" | "completed" | "cancelled";
  scheduledAt: Date;
  amount: number;
  vendorName: string;
  notes?: string;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: "individual" | "company";
  category: string;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  status: "active" | "inactive" | "suspended";
  joinedAt: Date;
}
