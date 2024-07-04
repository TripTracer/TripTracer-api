import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userSchema } from '../../application/dtos/userType';
import { ok } from 'neverthrow';

const newUserMock: userSchema = {
  username: 'newuser',
  userId: 'theNewUserId',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get All users', () => {
    it('should return all users', () => {
      const result = service.getAllUsers();
      expect(result).resolves.toHaveLength(2);
    });
  });

  describe('Add new User', () => {
    it('should add a new user', () => {
      const result = service.addNewUser(newUserMock);
      expect(result).toEqual(ok(newUserMock));
    });
  });

  describe('Get a user by username', () => {
    it('should get a user by username', async () => {
      jest
        .spyOn(service, 'findUserByUserName')
        .mockResolvedValue(ok(newUserMock));
      const result = await service.findUserByUserName(newUserMock.username);
      if (result.isOk()) expect(result.value).toEqual(newUserMock);
    });

    it('should return undefined', async () => {
      const result = await service.findUserByUserName(newUserMock.username);
      expect(result).toEqual({ value: undefined });
    });

    it('should return the first user', async () => {
      const result = await service.findUserByUserName('john');
      if (result.isOk()) expect(result.value.userId).toBe('1');
    });
  });
});
