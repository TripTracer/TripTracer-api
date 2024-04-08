export interface iUser {
  _id: string;
  username: string;
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  isVerified: boolean;
  status: UserStatus;
  DOB: Date;
  address: string;
  cratedAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  twoFactorEnabled: boolean;
  language: string;
  timeZone: string;
}

export enum UserStatus {
  ACTIVE,
  INACTIVE,
  PENDING,
  SUSPENDED,
}
