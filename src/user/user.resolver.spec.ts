import { Test, TestingModule } from '@nestjs/testing';
import { MembershipModule } from '../membership/membership.module';
import { getConnection } from 'typeorm';
import { TestDatabase } from '../../test/utils/postgres.modules';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestDatabase(), MembershipModule],
      providers: [UserResolver, UserService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
