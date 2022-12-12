import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserInput: CreateUserInput) {
    const user = await this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(username: string) {
    let user: User = await this.userRepository.findOne({ where: { username: username } });
    return user
  }
}
