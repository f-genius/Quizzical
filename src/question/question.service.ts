import {Injectable} from '@nestjs/common';
import {QuestionDTO} from './dto/question.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {QuestionEntity} from "./entities/question.entity";
import {AnswerOptionService} from "../answer-option/answer-option.service";
import {TestEntity} from "../test/entities/test.entity";

@Injectable()
export class QuestionService {
  constructor(
      @InjectRepository(QuestionEntity)
      private readonly questionRepository: Repository<QuestionEntity>,
      private readonly answerService: AnswerOptionService,
  ) {}

  async create(questionDTO: QuestionDTO, testId: number): Promise<QuestionEntity> {
      let question = new QuestionEntity();
      question.text = questionDTO.text;
      question = await this.questionRepository.save(question);
      question.answers = [];
      question.testId = testId;

      for (let i = 0; i < questionDTO.answers.length; i++) {
          console.log(questionDTO.answers[i])
          const ans = await this.answerService.create(questionDTO.answers[i], question.id);
          question.answers.push(ans);
      }

      return this.questionRepository.save(question);
  }

  async findAll(): Promise<QuestionEntity[]> {
    return this.questionRepository.find();
  }

  async findAllByTest(testId: number): Promise<QuestionEntity[]> {
    return this.questionRepository.find({ where: {testId}});
  }

  findOne(id: number) {
    return this.questionRepository.findOne({
        where: {
            id: id,
        }
    });
  }

  remove(id: number) {
    return this.questionRepository.delete(id);
  }

}
