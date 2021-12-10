import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipService } from '../membership/membership.service';
import { Repository } from 'typeorm';
import { MembershipType } from '../membership/membership.model';
import { UserEntity } from './user.entity';
import { NewUserInput, User, UserQuery } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly membershipService: MembershipService,
  ) {}
  public async filterUsers(query: UserQuery): Promise<User[]> {
    query;
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

  public async createUser(user: NewUserInput): Promise<User> {
    user;
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

  public async purgeEverything(): Promise<void> {
    return;
  }
}
