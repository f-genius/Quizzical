import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScoreEntity} from "./entities/score.entity";
import {ScoreService} from "./score.service";
import {ScoreController} from "./score.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ScoreEntity])],
    controllers: [ScoreController],
    providers: [ScoreService]
})
export class ScoreModule {}