import {ApiCookieAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {ScoreService} from "./score.service";
import {ScoreDTO} from "./dto/score.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";

@ApiTags('score')
@Controller('/scores')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) {}

    @ApiOperation({ summary: 'Create score (completed test)' })
    @ApiResponse({ status: 201, description: 'The score has been successfully created.', type: ScoreDTO })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404,  description: 'Not Found.', })
    @Post('/')
    @UseGuards(JwtAuthGuard)
    @ApiCookieAuth()
    async create(@Body() scoreDTO: ScoreDTO) {
        return await this.scoreService.create(scoreDTO);
    }

    @ApiOperation({ summary: 'Get score by id',})
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: 200, description: 'The test was successfully provided', type: ScoreDTO })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404,  description: 'Not Found.', })
    @Get('/id/:id')
    @UseGuards(JwtAuthGuard)
    @ApiCookieAuth()
    async findOneById(@Param('id') id: number) {
        return this.scoreService.findOneById(id);
    }

    @ApiOperation({ summary: 'Get the list of all scores for the user' })
    @ApiResponse({ status: 200, description: 'The scores were successfully provided.', type: [ScoreDTO]})
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404,  description: 'Not Found.', })
    @Get('/:user/')
    @UseGuards(JwtAuthGuard)
    @ApiCookieAuth()
    async findAllByUser(@Param('userId') userId: number) {
        return this.scoreService.findAllByUser(userId);
    }

    @ApiOperation({ summary: 'Get the list of all scores for the test' })
    @ApiResponse({ status: 200, description: 'The scores were successfully provided.', type: [ScoreDTO]})
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404,  description: 'Not Found.', })
    @Get('/:test/')
    @UseGuards(JwtAuthGuard)
    @ApiCookieAuth()
    async findAllByTest(@Param('testId') testId: number) {
        return this.scoreService.findAllByTest(testId);
    }

    @ApiOperation({ summary: 'Delete the score with provided id' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: 200, description: 'The score was successfully deleted' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 404,  description: 'Not Found.', })
    @Delete('/id/:id')
    @UseGuards(JwtAuthGuard)
    @ApiCookieAuth()
    async remove(@Param('id') id: number) {
        return this.scoreService.remove(id);
    }
}