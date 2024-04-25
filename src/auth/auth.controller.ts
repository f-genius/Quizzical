import {Body, Controller, Get, Post, Request, Response} from '@nestjs/common';
import {AuthDTO} from './dto/auth.dto';
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDTO) {
        return this.authService.signup(dto);
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 201, description: 'The user has been successfully logined.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Post('/signin')
    async signin(@Body() dto: AuthDTO, @Request() req, @Response() res) {
        return this.authService.signin(dto, req, res);
    }

    @Get('signout')
    signout(@Request() req, @Response() res) {
        return this.authService.signout(req, res);
    }
}