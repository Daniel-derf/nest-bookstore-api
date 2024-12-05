import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersRepositoryInterface } from './users-repository-interface';

@Injectable()
export class InMemoryUsersRepository implements UsersRepositoryInterface {
  private users: User[] = []; // Armazenamento em memória

  async create(user: User): Promise<User> {
    user.id = this.users.length + 1; // Gera um ID sequencial simples
    this.users.push(user);
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(id: number, userUpdates: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = { ...this.users[userIndex], ...userUpdates };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    const [deletedUser] = this.users.splice(userIndex, 1); // Remove e retorna o usuário deletado
    return deletedUser;
  }
}
