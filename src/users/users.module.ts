import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersRepository } from './repositories/users-repository-in-memory';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    InMemoryUsersRepository,
    {
      provide: 'UsersPersistenceRepository',
      useExisting: InMemoryUsersRepository,
    },
  ],
})
export class UsersModule {}
