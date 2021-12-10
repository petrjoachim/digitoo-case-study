import { Test, TestingModule } from '@nestjs/testing';
import { MembershipModule } from '../membership/membership.module';
import { TestDatabase } from '../../test/utils/postgres.modules';
import { getConnection } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestDatabase(), MembershipModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
