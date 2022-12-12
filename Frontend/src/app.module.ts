import { join } from 'path';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'authentication',
        entities: [User],
        synchronize: true,
    }),
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
