import { Injectable } from '@nestjs/common';
import { MembershipType } from '../membership/membership.model';
import { User } from './user.model';

@Injectable()
export class UserService {
  public async filterUsers(query: {
    membership?: string;
    email?: string;
    birthDate?: string;
  }): Promise<User[]> {
    return [
      {
        id: '1',
        email: 'luke@jedi.org',
        firstName: 'Luke',
        lastName: 'Skywalker',
        birthDate: new Date(),
        membership: {
          id: '100',
          type: MembershipType.BASIC,
          createdAt: new Date(),
        },
      },
      {
        id: '2',
        email: 'obiwan@jedi.org',
        firstName: 'Obi Wan',
        lastName: 'Kenobi',
        birthDate: new Date(),
      },
    ];
  }

  public async createUser(): Promise<User> {
    return {
      id: '1',
      email: 'luke@jedi.org',
      firstName: 'Luke',
      lastName: 'Skywalker',
      birthDate: new Date(),
      membership: {
        id: '100',
        type: MembershipType.BASIC,
        createdAt: new Date(),
      },
    };
  }
}
