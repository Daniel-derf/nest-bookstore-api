import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositoryInterface } from './repositories/users-repository-interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersPersistenceRepository')
    private usersPersistenceRepository: UsersRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = Object.assign(new User(), createUserDto);

    return await this.usersPersistenceRepository.create(newUser);
  }

  async findAll() {
    return await this.usersPersistenceRepository.findAll();
  }

  async findOne(id: number) {
    return await this.usersPersistenceRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdates: Partial<User> = Object.assign({}, updateUserDto);
    return await this.usersPersistenceRepository.update(id, userUpdates);
  }

  async remove(id: number) {
    return await this.usersPersistenceRepository.delete(id);
  }
}
