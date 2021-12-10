import { parseISO } from 'date-fns';
import { UserEntity } from '../user/db/user.entity';
import { Repository } from 'typeorm';
import { MembershipEntity } from './db/membership.entity';
import { MembershipType } from './graphql/membership.model';
import { MembershipService } from './membership.service';

describe('MembershipService', () => {
  let service: MembershipService;
  let memberships: Repository<MembershipEntity>;

  beforeEach(async () => {
    memberships = new Repository<MembershipEntity>();
    service = new MembershipService(memberships);
  });

  describe('createMembership()', () => {
    it('creates membership for a user', async () => {
      const user = new UserEntity();
      const saveSpy = jest.spyOn(memberships, 'save').mockResolvedValue({
        id: '5f2b8f38-2aef-4cee-8f98-e30ecb9be858',
        createdAt: parseISO('1975-01-01T12:00:00.000Z'),
        user: user,
        tarif: MembershipType.PROFI,
      });

      const membership = await service.createMembership(
        user,
        MembershipType.PROFI,
      );

      expect(membership.id).toBe('5f2b8f38-2aef-4cee-8f98-e30ecb9be858');
      expect(saveSpy).toBeCalledTimes(1);
    });
  });
});
