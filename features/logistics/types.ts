export interface Shipment {
  id: string;
  orderId: string;
  senderId: string;
  recipientId: string;
  status: "pending" | "in_transit" | "delivered" | "failed";
  origin: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  destination: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  estimatedDelivery: Date;
  actualDelivery?: Date;
  trackingNumber: string;
  carrier: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  trackingNumber: string;
  status:
    | "picked_up"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "exception";
  location: string;
  timestamp: Date;
  notes?: string;
}

export interface LogisticsReport {
  id: string;
  title: string;
  type: "daily" | "weekly" | "monthly";
  period: string;
  totalShipments: number;
  deliveredOnTime: number;
  avgDeliveryDays: number;
  revenue: number;
  generatedAt: Date;
}
