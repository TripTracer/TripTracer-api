import { UserStatus } from 'src/users/users.entity';

export const userMockData = {
  username: 'john_doe',
  mobile: '+1234567890',
  email: 'johndoe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'hashed_password_string',
  role: 'user',
  isVerified: false,
  status: UserStatus.PENDING,
  DOB: '1990-01-01T00:00:00.000Z',
  address: '123 Main St, Anytown, AN',
  cratedAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  lastLogin: '2023-01-01T00:00:00.000Z',
  twoFactorEnabled: false,
  language: 'English',
  timeZone: 'GMT',
};

export type UserMockType = typeof userMockData;
