export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
  idleTimeoutAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
