import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {AppService, TypeOrmConfigService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config"
import { CategoryTestModule } from './category-test/category-test.module';
import { QuestionModule } from './question/question.module';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import {AnswerOptionModule} from "./answer-option/answer-option.module";
import {ScoreModule} from "./score/score.module";
import {AuthModule} from "./auth/auth.module";
import {AppGateway} from "./app.gateway";
import {TestService} from "./test/test.service";


@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UserModule,
    TestModule,
    QuestionModule,
    CategoryTestModule,
    AuthModule,
    AnswerOptionModule, ScoreModule
  ],
  providers: [AppService, AppGateway],
})

export class AppModule {
}