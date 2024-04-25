import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {UserModule} from "../user/user.module";

@Module({
    imports: [JwtModule, PassportModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}