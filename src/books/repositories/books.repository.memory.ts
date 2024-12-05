import { BooksRepositoryInterface } from './books.repository.interface';
import { Book } from '../entities/book.entity';

export class InMemoryBooksRepository implements BooksRepositoryInterface {
  private books: Book[] = [];
  private nextId: number = 1;

  async create(book: Book): Promise<Book> {
    const newBook = { ...book, id: this.nextId++ };
    this.books.push(newBook);
    return newBook;
  }

  async findById(id: number): Promise<Book> {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async update(id: number, bookUpdates: Partial<Book>): Promise<Book> {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with id ${id} not found`);
    }
    const updatedBook = { ...this.books[bookIndex], ...bookUpdates };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  async delete(id: number): Promise<Book> {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with id ${id} not found`);
    }
    const [deletedBook] = this.books.splice(bookIndex, 1);
    return deletedBook;
  }
}
