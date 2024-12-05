import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersGatewayInterface } from './gateways/users-gateway-interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersPersistenceGateway')
    private usersPersistenceGateway: UsersGatewayInterface,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser: User = new User();

    newUser.name = createUserDto.name;
    newUser.books = createUserDto.books;

    return await this.usersPersistenceGateway.create(newUser);
  }

  async findAll() {
    return await this.usersPersistenceGateway.findAll();
  }

  async findOne(id: number) {
    return await this.usersPersistenceGateway.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdates: Partial<User> = {};

    if (updateUserDto.name) {
      userUpdates.name = updateUserDto.name;
    }

    if (updateUserDto.books) {
      userUpdates.books = updateUserDto.books;
    }

    return await this.usersPersistenceGateway.update(id, userUpdates);
  }

  async remove(id: number) {
    return await this.usersPersistenceGateway.delete(id);
  }
}
