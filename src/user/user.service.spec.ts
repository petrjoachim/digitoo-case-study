import { MembershipService } from '../membership/membership.service';
import { Repository } from 'typeorm';
import { UserEntity } from './db/user.entity';
import { UserService } from './user.service';
import { MembershipType } from '../membership/graphql/membership.model';
import { parseISO } from 'date-fns';

describe('UserService', () => {
  let service: UserService;
  let users: Repository<UserEntity>;
  let membershipService: MembershipService;

  beforeEach(async () => {
    users = new Repository<UserEntity>();
    membershipService = new MembershipService(undefined);
    service = new UserService(users, membershipService);
  });

  describe('createUser()', () => {
    it('creates user entity and membership', async () => {
      const saveSpy = jest.spyOn(users, 'save').mockResolvedValue({
        id: '5f2b8f38-2aef-4cee-8f98-e30ecb9be858',
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'luke@jedi.org',
        birthDate: parseISO('1975-01-01T12:00:00.000Z'),
        memberships: [],
      });
      const membershipSpy = jest
        .spyOn(membershipService, 'createMembership')
        .mockResolvedValue({
          id: 'dff7c066-12bd-4fa2-a5f7-477bbc38433d',
          createdAt: parseISO('2021-01-01T12:00:00.000Z'),
          tarif: MembershipType.BASIC,
        });
      const user = await service.createUser({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'luke@jedi.org',
        birthDate: '3000-01-01T12:00:00.000Z',
        membershipType: MembershipType.BASIC,
      });

      expect(user.id).toBe('5f2b8f38-2aef-4cee-8f98-e30ecb9be858');
      expect(membershipSpy).toBeCalledTimes(1);
      expect(saveSpy).toBeCalledTimes(1);
    });
  });
  describe('filterUsers()', () => {
    // => to be done in E2E tests
  });
  describe('purgeEverything()', () => {
    it('clears the user database', async () => {
      const clearSpy = jest.spyOn(users, 'delete').mockResolvedValue(undefined);
      expect(service.purgeEverything()).resolves.not.toThrow();
      expect(clearSpy).toBeCalledTimes(1);
      expect(clearSpy).toBeCalledWith({});
    });
  });
});
