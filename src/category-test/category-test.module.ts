import {Module} from '@nestjs/common';
import {CategoryTestService} from './category-test.service';
import {CategoryTestController} from './category-test.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryTestEntity} from "./entities/category-test.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTestEntity])],
  controllers: [CategoryTestController],
  providers: [CategoryTestService],
  exports: [CategoryTestService],
})
export class CategoryTestModule {}
