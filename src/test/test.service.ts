import {Injectable} from '@nestjs/common';
import {TestDTO} from './dto/test.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TestEntity} from "./entities/test.entity";
import {QuestionService} from "../question/question.service";
import {CategoryTestService} from "../category-test/category-test.service";
import {CategoryTestEntity} from "../category-test/entities/category-test.entity";

@Injectable()
export class TestService {

  constructor(
      @InjectRepository(TestEntity)
      private readonly testRepository: Repository<TestEntity>,

      private readonly categoryService: CategoryTestService,
      private readonly questionService: QuestionService,
  ) {}

  async create(testDto: TestDTO) {
    let newTest = new TestEntity();
    newTest.name = testDto.name;
    newTest.category = await this.categoryService.findOneByName(testDto.category);
    newTest.questions = [];
    newTest = await this.testRepository.save(newTest);

    for (let i = 0; i < testDto.questions.length; i++) {
      newTest.questions.push(await this.questionService.create(testDto.questions[i], newTest.id));
    }

    return this.testRepository.save(newTest);
  }

  async findAllByCategory(category: string) {
    const c= await this.categoryService.findOneByName(category);
    return this.testRepository.find({
      where: {
        category: c,
      }
    })
  }

  findOneById(id: number) {
    return this.testRepository.findOne({
      where: {
        id: id,
      }
    })
  }

  findOneByNameAndId(id: number, name: string) {
    return this.testRepository.findOne({
      where: {
        id: id,
        name: name,
      }
    })
  }

  async findOneByName(name: string) {
    return this.testRepository.createQueryBuilder('test')
        .leftJoinAndSelect('test.questions', 'question')
        .leftJoinAndSelect('question.answers', 'answer')
        .where("test.name = :name", { name: name })
        .getOne();
  }

  remove(id: number) {
    return this.testRepository.delete(id);
  }
}
