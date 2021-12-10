import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import { TestDatabase } from '../../test/utils/postgres.modules';
import { MembershipService } from './membership.service';

describe('MembershipService', () => {
  let service: MembershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestDatabase()],
      providers: [MembershipService],
    }).compile();

    service = module.get<MembershipService>(MembershipService);
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
