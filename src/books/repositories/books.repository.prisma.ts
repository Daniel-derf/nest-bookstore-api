import { PrismaClient } from '@prisma/client';
import { BooksRepositoryInterface } from './books.repository.interface';
import { Book } from '../entities/book.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaBooksRepository implements BooksRepositoryInterface {
  private prisma = new PrismaClient();

  async create(book: Book): Promise<Book> {
    const newBook = await this.prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        pages: book.pages,
        category: book.category,
      },
    });
    return newBook;
  }

  async findById(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async update(id: number, bookUpdates: Partial<Book>): Promise<Book> {
    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: bookUpdates,
    });
    return updatedBook;
  }

  async delete(id: number): Promise<Book> {
    const deletedBook = await this.prisma.book.delete({
      where: { id },
    });
    return deletedBook;
  }
}
