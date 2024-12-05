import { PrismaClient } from '@prisma/client';
import { UsersRepositoryInterface } from './users-repository-interface';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepositoryInterface {
  private prisma = new PrismaClient();

  async create(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        books: user.books.join(','), // Serializa a lista de inteiros como uma string
      },
    });
    return {
      ...newUser,
      books: newUser.books.split(',').map(Number), // Converte de volta para uma lista de inteiros
    };
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return {
      ...user,
      books: user.books.split(',').map(Number), // Converte de volta para uma lista de inteiros
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({
      ...user,
      books: user.books.split(',').map(Number), // Converte de volta para uma lista de inteiros
    }));
  }

  async update(id: number, userUpdates: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...userUpdates,
        books: userUpdates.books ? userUpdates.books.join(',') : undefined, // Serializa a lista de inteiros se existir
      },
    });
    return {
      ...updatedUser,
      books: updatedUser.books.split(',').map(Number), // Converte de volta para uma lista de inteiros
    };
  }

  async delete(id: number): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return {
      ...deletedUser,
      books: deletedUser.books.split(',').map(Number), // Converte de volta para uma lista de inteiros
    };
  }
}
