import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AnswerOptionEntity} from "./entities/answer-option.entity";
import {AnswerDto} from "./dto/answer.dto";
import {QuestionService} from "../question/question.service";
import {QuestionEntity} from "../question/entities/question.entity";

@Injectable()
export class AnswerOptionService {
    constructor(
        @InjectRepository(AnswerOptionEntity)
        private readonly answerRepository: Repository<AnswerOptionEntity>
    ) {}

    async create(answerDTO: AnswerDto, question: number): Promise<AnswerOptionEntity> {
        console.log(answerDTO)
        const answer = new AnswerOptionEntity();
        answer.isRight = answerDTO.isRight;

        answer.text = answerDTO.text;
        answer.question = question;
        answer.points = answerDTO.points;
        return this.answerRepository.save(answer);
    }

    async findAll(): Promise<AnswerOptionEntity[]> {
        return this.answerRepository.find();
    }

    async findOneById(id: number): Promise<AnswerOptionEntity> {
        return this.answerRepository.findOneById(id);
    }

    async findAllByQuestion(question: number): Promise<AnswerOptionEntity[]> {
        return this.answerRepository.find({where: {question}})
    }

    async remove(id: number) {
        await this.answerRepository.delete(id);
    }
}