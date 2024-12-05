import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { InMemoryBooksRepository } from './repositories/books.repository.memory';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    InMemoryBooksRepository,
    {
      provide: 'BooksPersistenceRepository',
      useExisting: InMemoryBooksRepository,
    },
  ],
})
export class BooksModule {}
