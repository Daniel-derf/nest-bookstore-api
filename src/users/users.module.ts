import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersGateway } from './gateways/users-gateway-in-memory';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    InMemoryUsersGateway,
    {
      provide: 'UsersPersistenceGateway',
      useExisting: InMemoryUsersGateway,
    },
  ],
})
export class UsersModule {}
