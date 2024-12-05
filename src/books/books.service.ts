import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepositoryInterface } from './repositories/books.repository.interface';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BooksPersistenceRepository')
    private booksPersistenceRepository: BooksRepositoryInterface,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = Object.assign(new Book(), createBookDto);

    return this.booksPersistenceRepository.create(book);
  }

  findAll() {
    return this.booksPersistenceRepository.findAll();
  }

  findOne(id: number) {
    return this.booksPersistenceRepository.findById(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksPersistenceRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.booksPersistenceRepository.delete(id);
  }
}
