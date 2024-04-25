import { Injectable } from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {UserEntity} from "./user/entities/user.entity";
import {AnswerOptionEntity} from "./answer-option/entities/answer-option.entity";
import {QuestionEntity} from "./question/entities/question.entity";
import {TestEntity} from "./test/entities/test.entity";
import {ScoreEntity} from "./score/entities/score.entity";
import {CategoryTestEntity} from "./category-test/entities/category-test.entity";

@Injectable()
export class AppService {

}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const config = require('pg-connection-string').parse(process.env.DATABASE_URL);
        return {
            type: 'postgres',
            host: config.host,
            username: config.user,
            password: config.password,
            database: config.database,
            entities: [AnswerOptionEntity, QuestionEntity, TestEntity, UserEntity, ScoreEntity, CategoryTestEntity],
            synchronize: true,
            ssl: true
        };
    }
}
