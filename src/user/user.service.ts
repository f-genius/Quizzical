import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {AuthDTO} from "../auth/dto/auth.dto";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity)
      private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(authDTO: AuthDTO): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = authDTO.name;
    user.scores = [];
    user.password = authDTO.password;
    user.email = authDTO.email;
    return this.usersRepository.save(user);
  }


  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      }
    });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
