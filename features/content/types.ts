export interface Ad {
  id: string;
  title: string;
  type: "reel" | "video" | "banner" | "story";
  vendorName: string;
  mediaUrl: string;
  likes: number;
  views: number;
  status: "active" | "paused" | "expired" | "draft";
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: "published" | "draft";
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationType {
  id: string;
  name: string;
  key: string;
  description: string;
  channel: "push" | "email" | "sms" | "in_app";
  category: "order" | "booking" | "payment" | "promotion" | "system";
  isEnabled: boolean;
  template: string;
  createdAt: Date;
}
