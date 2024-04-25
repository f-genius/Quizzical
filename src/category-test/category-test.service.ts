import {Injectable} from '@nestjs/common';
import {CreateCategoryTestDto} from './dto/create-category-test.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoryTestEntity} from "./entities/category-test.entity";

@Injectable()
export class CategoryTestService {
  constructor(
      @InjectRepository(CategoryTestEntity)
      private readonly categoryRepository: Repository<CategoryTestEntity>,
  ) {}
  create(createCategoryTestDto: CreateCategoryTestDto) {
    return 'This action adds a new categoryTest';
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOneByName(name: string) {
    return this.categoryRepository.findOne({
      where: {
        name: name,
      },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} categoryTest`;
  }
}
