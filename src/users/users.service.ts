import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Daniel', books: [1, 2, 3] },
    { id: 2, name: 'Robert', books: [4, 5, 6] },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };

    this.users.push(newUser);
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
  }

  remove(id: number) {
    const removedUser = this.users.find((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
