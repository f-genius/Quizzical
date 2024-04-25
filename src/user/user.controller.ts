import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiCookieAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "./dto/user.dto";
import {AuthDTO} from "../auth/dto/auth.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  create(@Body() authDTO: AuthDTO) {
    return this.userService.create(authDTO);
  }

  @ApiOperation({ summary: 'Get the list of all users' })
  @ApiResponse({ status: 200, description: 'The users were successfully provided.', type: [UserDto] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id', })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The user was successfully provided', type: UserDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.', })
  @Get('/id/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  findOneById(@Param('id') id: number) {
    return this.userService.findOneById(+id);
  }

  @ApiOperation({ summary: 'Delete the user with provided id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The user was successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.', })
  @Delete('/id/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
