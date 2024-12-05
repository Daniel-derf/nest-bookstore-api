import { Book } from '../entities/book.entity';

export interface BooksRepositoryInterface {
  create(book: Book): Promise<Book>;
  findById(id: number): Promise<Book>;
  findAll(): Promise<Book[]>;
  update(id: number, book: Partial<Book>): Promise<Book>;
  delete(id: number): Promise<Book>;
}
