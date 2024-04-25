import {Module} from '@nestjs/common';
import {TestService} from './test.service';
import {TestController} from './test.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {CategoryTestModule} from "../category-test/category-test.module";
import {QuestionModule} from "../question/question.module";

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity]), CategoryTestModule, QuestionModule],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService]
})
export class TestModule {}
