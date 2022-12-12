import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { UserTokenInput } from './dto/userToken';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)
        if (!user) {
            throw new BadRequestException(`User not exists with ${username}`);
        }

        const valid = await bcrypt.compare(password, user.password)

        if (user && valid) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username)
        const { password, ...result } = user;
        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user.id,
            }),
            user
        }
    }

    async signup(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username)
        if (user) {
            throw new BadRequestException("User already exists!");
        }

        const password = await bcrypt.hash(loginUserInput.password, 10)

        return this.userService.create({
            ...loginUserInput,
            password,
        })
    }

    async userVerify(userTokenInput: UserTokenInput) {
        const access_token = JSON.stringify((this.jwtService.decode(userTokenInput.userToken)).sub)
        return {
           access_token
        }
    }
}
