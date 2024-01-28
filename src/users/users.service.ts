import { Injectable } from '@nestjs/common';
import { Prisma, users as PrismaUser } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UsersService {
  // Load prisma service instance.
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<PrismaUser | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
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
}
