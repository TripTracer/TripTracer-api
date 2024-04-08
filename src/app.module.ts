import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MarketModule } from './market/market.module';
import { MarketController } from './market/market.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schemas/schema.gql'),
    }),
    MarketModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, MarketController],
  providers: [AppService, AuthModule],
})
export class AppModule {}
