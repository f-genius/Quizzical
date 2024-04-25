import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
    @ApiProperty()
    public password: string;

    @IsString()
    @ApiProperty()
    public name: string;
}