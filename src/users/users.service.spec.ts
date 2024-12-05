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
    expect(await service.findAll()).toEqual([newUser]);
  });

  it('should delete a user', async () => {
    await service.create({ name: 'Maria', books: [] });
    await service.remove(1);

    expect(await service.findAll()).toEqual([]);
  });

  it('should edit a user', async () => {
    await service.create({ name: 'Roberto', books: [] });

    await service.update(1, { name: 'edited Roberto' });

    expect(await service.findOne(1)).toEqual({
      name: 'edited Roberto',
      id: 1,
      books: [],
    });
  });

  it('should get a user by ID', async () => {
    await service.create({ name: 'Roberto', books: [] });

    const user = await service.findOne(1);

    expect(user).toEqual({
      name: 'Roberto',
      id: 1,
      books: [],
    });
  });
});
