import {Controller, Get, Param, Render, UseGuards} from '@nestjs/common';
import {AppService} from "./app.service";
import {JwtAuthGuard} from "./auth/jwt.guard";
import {ApiCookieAuth} from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index.hbs')
  root() {
    return {
      title: 'Главная',
    };
  }

  @Get('/login')
  @Render('login.hbs')
  login() {
    return {
      title: 'Вход',
      logged: false,
    };
  }

  @Get('/registration')
  @Render('registration.hbs')
  registration() {
    return {
      title: 'Регистрация',
      logged: false,
    };
  }

  @Get("/admin")
  @Render("constructor.hbs")
  get() {
    return {
      title: 'Конструктор',
    };
  }

  @Get("/topics")
  @Render("topics_list.hbs")
  topics() {
    return {
      title: 'Темы',
    };
  }

  @Get('/categories/:category')
  @Render("tests_list.hbs")
  getCategory(@Param('category') category: string) {
    return {
      title: category,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Get('/categories/:category/:testName')
  @Render('test.hbs')

  getTest(@Param('testName') testName: string, @Param('category') category: string) {
    return {
      title: testName,
    };
  }

  @Get("/categories/:category/:testName/results/:result")
  @Render('results.hbs')
  showResults(@Param('testName') testName: string, @Param('category') category: string, @Param('result') result: number ) {
    return {
      title: testName,
    };
  }
}