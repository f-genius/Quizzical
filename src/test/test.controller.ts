import {Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { TestService } from './test.service';
import { TestDTO } from './dto/test.dto';
import {ApiCookieAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TestEntity} from "./entities/test.entity";
import {JwtAuthGuard} from "../auth/jwt.guard";

@ApiTags('test')
@Controller('/tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOperation({ summary: 'Create test' })
  @ApiResponse({ status: 201, description: 'The test has been successfully created.', type: TestDTO })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Post('/')
  async create(@Body() testDto: TestDTO) {
    return await this.testService.create(testDto);
  }

  @ApiOperation({ summary: 'Get the list of all tests from specific category' })
  @ApiResponse({ status: 200, description: 'The tests were successfully provided.', type: [TestDTO]})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Get('/:category/')
  findAllByCategory(@Param('category') category: string) {
    return this.testService.findAllByCategory(category);
  }

  @ApiOperation({ summary: 'Get test by id',})
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The test was successfully provided', type: TestDTO })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Get('/id/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  findOneById(@Param('id') id: number) {
    return this.testService.findOneById(+id);
  }


  @ApiOperation({ summary: 'Get test by name',})
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({ status: 200, description: 'The test was successfully provided', type: TestDTO })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Get('/name/:name')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async findOneByName(@Param('name') name: string): Promise<TestEntity | null> {
    return this.testService.findOneByName(name);
  }

  @ApiOperation({ summary: 'Delete the test with provided id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The test was successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Delete('/id/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  remove(@Param('id') id: number) {
    return this.testService.remove(+id);
  }
}
