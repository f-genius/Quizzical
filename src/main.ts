import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import * as hbs from 'express-handlebars';
import {LoggingInterceptor} from "./log_interceptor";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import {HttpExceptionFilter} from "./http-exception.filter";
import * as process from "process";
import {AuthInterceptor} from "./auth.interceptor";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new AuthInterceptor()
    );
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter())

    app.engine("hbs", hbs.engine(
        {
            layoutsDir: "views/layouts",
            defaultLayout : "layout",
            partialsDir: join(__dirname, '..', 'views/partials'),
            extname: "hbs"
        }
    ))
    app.setViewEngine('hbs');

    const config = new DocumentBuilder()
        .setTitle('Quizzical spec')
        .setDescription('The quizzical tests API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    console.log(process.env.BASE_URL)

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const port = configService.get('app.port', 3000);
    await app.listen(port);
}
bootstrap();