import {Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { CategoryTestService } from './category-test.service';
import { CreateCategoryTestDto } from './dto/create-category-test.dto';
import {ApiCookieAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt.guard";

@ApiTags('category-test')
@Controller('category-test')
export class CategoryTestController {
  constructor(private readonly categoryTestService: CategoryTestService) {}

  @ApiOperation({ summary: 'Create test category' })
  @ApiResponse({ status: 201, description: 'The test category has been successfully created.', type: CreateCategoryTestDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  create(@Body() createCategoryTestDto: CreateCategoryTestDto) {
    return this.categoryTestService.create(createCategoryTestDto);
  }

  @ApiOperation({ summary: 'Get the list of all test categories',})
  @ApiResponse({ status: 200, description: 'The test categories were successfully provided.', type: [CreateCategoryTestDto]})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Get('/')
  findAll() {
    return this.categoryTestService.findAll();
  }

  @ApiOperation({ summary: 'Get test category by id',})
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The test category was successfully provided', type: CreateCategoryTestDto})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.categoryTestService.findOneByName(name);
  }


  @ApiOperation({ summary: 'Delete the test category with provided id',})
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The test category was successfully deleted',})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404,  description: 'Not Found.', })
  @Delete('/id/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  remove(@Param('id') id: number) {
    return this.categoryTestService.remove(+id);
  }
}
