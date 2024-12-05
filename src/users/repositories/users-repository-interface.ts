import { User } from '../entities/user.entity';

export interface UsersRepositoryInterface {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User>;
  findAll(): Promise<User[]>;
  update(id: number, user: Partial<User>): Promise<User>;
  delete(id: number): Promise<User>;
}
