import {BadRequestException, ForbiddenException, Injectable,} from '@nestjs/common';
import {AuthDTO} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {jwtSecret} from 'src/auth/constants';
import {Request, Response} from 'express';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwt: JwtService) {}

    async signup(dto: AuthDTO) {
        const { email, password,name } = dto;

        let userExists = await this.userService.findOneByEmail(email);

        if (userExists) {
            throw new BadRequestException('Email already exists');
        }

        dto.password = await this.hashPassword(password);
        await this.userService.create(dto);

        return { message: 'User created successfully' };
    }

    async signin(dto: AuthDTO, req: Request, res: Response) {
        const email = dto.email;
        const password = dto.password

        let foundUser = await this.userService.findOneByEmail(email);

        if (!foundUser) {
            throw new BadRequestException('Wrong email');
        }

        const compareSuccess = await this.comparePasswords({
            password,
            hash: foundUser.password,
        });

        if (!compareSuccess) {
            throw new BadRequestException('Wrong password');
        }

        const token = await this.signToken({
            userId: foundUser.id.toString(),
            email: foundUser.email,
        });

        if (!token) {
            throw new ForbiddenException('Could not signin');
        }

        res.cookie('token', token, {});
        return res.send({ message: 'Logged in successfully' });
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token');

        return res.send({ message: 'Logged out succefully' });
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;

        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(args: { hash: string; password: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: { userId: string; email: string }) {
        const payload = {
            id: args.userId,
            email: args.email,
        };

        return await this.jwt.signAsync(payload, {
            secret: jwtSecret,
        });
    }
}