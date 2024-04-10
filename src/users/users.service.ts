import { Injectable } from '@nestjs/common';
import { Prisma, users as PrismaUser } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  // Load prisma service instance.
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<PrismaUser | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<PrismaUser[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.usersCreateInput): Promise<PrismaUser> {
    return this.prisma.users.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<PrismaUser> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<PrismaUser> {
    return this.prisma.users.delete({
      where,
    });
  }

  async findByUsername(username: string): Promise<PrismaUser | null> {
    if (!username) return null;
    return this.prisma.users.findUnique({
      where: {
        username,
      },
    });
  }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
