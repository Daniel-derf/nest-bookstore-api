import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { InMemoryUsersRepository } from './repositories/users-repository-in-memory';

describe('UsersService', () => {
  let service: UsersService;
  let usersDBRep: InMemoryUsersRepository;

  beforeEach(async () => {
    usersDBRep = new InMemoryUsersRepository();
    service = new UsersService(usersDBRep);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUser = await service.create({ name: 'Daniel', books: [] });
    expect(await usersDBRep.findAll()).toEqual([newUser]);
  });
});
