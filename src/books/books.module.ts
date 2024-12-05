import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { InMemoryBooksRepository } from './repositories/books.repository.memory';
import { PrismaBooksRepository } from './repositories/books.repository.prisma';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    InMemoryBooksRepository,
    PrismaBooksRepository,
    {
      provide: 'BooksPersistenceRepository',
      useExisting: PrismaBooksRepository,
    },
  ],
})
export class BooksModule {}
