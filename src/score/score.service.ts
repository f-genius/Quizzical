import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScoreEntity} from "./entities/score.entity";
import {Repository} from "typeorm";
import {ScoreDTO} from "./dto/score.dto";

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(ScoreEntity)
        private readonly scoreRepository: Repository<ScoreEntity>
    ) {}

    async create(scoreDTO: ScoreDTO) {
        let score = new ScoreEntity();
        score.userId = scoreDTO.userId;
        score.testId = scoreDTO.testId;
        score.value = scoreDTO.value;
        return this.scoreRepository.save(score);
    }

    async findOneById(id: number) {
        return this.scoreRepository.findOne({
            where: {
                id: id,
            }
        })
    }

    async findAllByUser(id: number) {
        return this.scoreRepository.find({
            where: {
                userId: id,
            }
        })
    }

    async findAllByTest(id: number) {
        return this.scoreRepository.find({
            where: {
                testId: id,
            }
        })
    }

    async remove(id: number) {
        return this.scoreRepository.delete(id);
    }
}