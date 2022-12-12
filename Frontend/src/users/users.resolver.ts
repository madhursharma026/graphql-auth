import { UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Resolver, Query, Args, Context } from '@nestjs/graphql';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }
}
