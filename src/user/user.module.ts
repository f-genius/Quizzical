import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserEntity} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
