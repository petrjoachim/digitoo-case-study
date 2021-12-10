import { parseISO } from 'date-fns';
import { MembershipType } from '../../membership/graphql/membership.model';
import { UserResolver } from './user.resolver';
import { UserService } from '../user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    service = new UserService(undefined, undefined);
    resolver = new UserResolver(service);
  });

  describe('Query: users', () => {
    it('searches all users', async () => {
      const spy = jest.spyOn(service, 'filterUsers').mockResolvedValue([]);
      expect(resolver.users({})).resolves.toHaveLength(0);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('Manipulation: createUser', () => {
    it('creates user', async () => {
      const spy = jest.spyOn(service, 'createUser').mockResolvedValue({
        id: '5f2b8f38-2aef-4cee-8f98-e30ecb9be858',
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'luke@jedi.org',
        birthDate: parseISO('1975-01-01T12:00:00.000Z'),
        membership: {
          id: 'fa0f58c9-690a-431f-9479-7c40f1a5a6ef',
          createdAt: parseISO('2021-01-01T12:00:00.000Z'),
          tarif: MembershipType.BASIC,
        },
      });

      const user = await resolver.createUser({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'luke@jedi.org',
        birthDate: '1975-01-01T12:00:00.000Z',
        membershipType: MembershipType.BASIC,
      });
      expect(spy).toBeCalled();
      expect(user.id).toBe('5f2b8f38-2aef-4cee-8f98-e30ecb9be858');
    });
  });
});
