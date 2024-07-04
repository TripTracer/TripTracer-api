export const userMockData = {
  id: 'sample-user-id',
  username: 'john_doe',
  mobile: '+1234567890',
  email: 'johndoe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'hashed_password_string',
  role: 'user',
  isVerified: false,
  status: null,
  DOB: new Date('1990-01-01T00:00:00.000Z'),
  address: '123 Main St, Anytown, AN',
  cratedAt: new Date('2023-01-01T00:00:00.000Z'),
  updatedAt: new Date('2023-01-01T00:00:00.000Z'),
  lastLogin: new Date('2023-01-01T00:00:00.000Z'),
  twoFactorEnabled: false,
  language: 'English',
  timeZone: 'GMT',
};

export type UserMockType = typeof userMockData;
