import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '365d' },
      secret: 'hide-me'
    })],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
