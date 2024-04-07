import {
  ObjectType,
  Field,
  registerEnumType,
  ID,
  InputType,
} from '@nestjs/graphql';

@ObjectType()
export class CheckIfUserExistsResponse {
  @Field()
  isUser: boolean;
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  mobile: string;

  @Field()
  role: string;

  @Field()
  isVerified: boolean;

  @Field()
  status: UserStatus;

  @Field({ nullable: true })
  DOB?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  twoFactorEnabled: boolean;

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  timeZone?: string;

  @Field()
  cratedAt: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  lastLogin?: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

// Register the enum with GraphQL
registerEnumType(UserStatus, {
  name: 'UserStatus',
});

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  mobile: string;

  @Field(() => UserStatus)
  status: UserStatus;
}

// id: string;
// : Date;
// : Date;
// : Date;
