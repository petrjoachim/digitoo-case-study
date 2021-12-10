import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabase } from '../../test/utils/postgres.modules';
import { getConnection } from 'typeorm';
import { MembershipModule } from '../membership/membership.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestDatabase(), MembershipModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
