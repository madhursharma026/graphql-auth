import {UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginResponse } from './dto/login-response';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { Resolver, Mutation,Args } from '@nestjs/graphql';
import { UserTokenInput } from './dto/userToken';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(()=> LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput){
        return this.authService.login(loginUserInput)
    }

    @Mutation(()=>User)
    signup(@Args("loginUserInput") loginUserInput: LoginUserInput){
        return this.authService.signup(loginUserInput)
    }

    @Mutation(()=> LoginResponse)
    userVerify(@Args('userToken') userTokenInput: UserTokenInput){
        return this.authService.userVerify(userTokenInput)
    }
}
