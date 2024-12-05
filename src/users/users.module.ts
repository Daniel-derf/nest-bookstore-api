import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersRepository } from './repositories/users-repository-in-memory';
import { PrismaUsersRepository } from './repositories/users-repository-prisma';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    InMemoryUsersRepository,
    PrismaUsersRepository,
    {
      provide: 'UsersPersistenceRepository',
      useExisting: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
