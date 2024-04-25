import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AnswerOptionEntity} from "./entities/answer-option.entity";
import {AnswerOptionService} from "./answer-option.service";

@Module({
    imports: [TypeOrmModule.forFeature([AnswerOptionEntity])],
    providers: [AnswerOptionService],
    exports: [AnswerOptionService],
})
export class AnswerOptionModule {}