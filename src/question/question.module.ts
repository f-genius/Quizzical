import {Module} from '@nestjs/common';
import {QuestionService} from './question.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionEntity} from "./entities/question.entity";
import {AnswerOptionModule} from "../answer-option/answer-option.module";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity]), AnswerOptionModule],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
