import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { InMemoryBooksRepository } from './repositories/books.repository.memory';
import { BooksRepositoryInterface } from './repositories/books.repository.interface';

describe('BooksService', () => {
  let service: BooksService;
  let booksDBRep: BooksRepositoryInterface;

  beforeEach(async () => {
    booksDBRep = new InMemoryBooksRepository();
    service = new BooksService(booksDBRep);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async () => {
    const newBook = await service.create({
      title: 'metafisica',
      author: 'aristoteles',
      pages: 300,
      category: 'filosofia',
    });

    expect(await service.findAll()).toEqual([newBook]);
  });

  it('should delete a book', async () => {
    const newBook = await service.create({
      title: 'metafisica',
      author: 'aristoteles',
      pages: 300,
      category: 'filosofia',
    });

    await service.remove(newBook.id);

    expect(await service.findAll()).toEqual([]);
  });

  it('should edit a book', async () => {
    const newBook = await service.create({
      title: 'metafisica',
      author: 'aristoteles',
      pages: 300,
      category: 'filosofia',
    });

    await service.update(newBook.id, { title: 'updated metafisica' });

    expect(await service.findOne(newBook.id)).toEqual({
      id: newBook.id,
      title: 'updated metafisica',
      author: 'aristoteles',
      pages: 300,
      category: 'filosofia',
    });
  });

  it('should get a book by ID', async () => {
    const newBook = await service.create({
      title: 'metafisica',
      author: 'aristoteles',
      pages: 300,
      category: 'filosofia',
    });

    expect(await service.findOne(newBook.id)).toEqual(newBook);
  });
});
