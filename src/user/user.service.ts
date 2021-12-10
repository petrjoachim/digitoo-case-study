import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipService } from '../membership/membership.service';
import { Between, FindConditions, Repository } from 'typeorm';
import { UserEntity } from './db/user.entity';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { UserQuery, User, NewUserInput } from './graphql/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly membershipService: MembershipService,
  ) {}

  public async filterUsers(query: UserQuery): Promise<User[]> {
    const where: FindConditions<UserEntity> = {};

    const qb = this.users
      .createQueryBuilder('user')
      .innerJoinAndSelect('membership', 'M', 'user.id = M.userId')
      .groupBy('user.id, M.id');

    if (query.birthDate) {
      where.birthDate = Between(
        startOfDay(parseISO(query.birthDate)),
        endOfDay(parseISO(query.birthDate)),
      );
    }

    if (query.email) {
      where.email = query.email;
    }

    qb.where(where);

    if (query.membershipType !== undefined) {
      qb.having('M.tarif = :tarif', { tarif: query.membershipType });
    }

    return (await qb.execute()).map((row: any) => ({
      id: row.user_id,
      birthDate: row.user_birthDate,
      email: row.user_email,
      firstName: row.user_firstName,
      lastName: row.user_lastName,
      ...(row.M_id && {
        membership: {
          id: row.M_id,
          createdAt: row.M_createdAt,
          tarif: row.M_tarif,
        },
      }),
    }));
  }

  public async createUser(userInput: NewUserInput): Promise<User> {
    let user = new UserEntity();
    user.email = userInput.email;
    user.firstName = userInput.firstName;
    user.lastName = userInput.lastName;
    user.birthDate = parseISO(userInput.birthDate);
    user = await this.users.save(user);

    const membership = await this.membershipService.createMembership(
      user,
      userInput.membershipType,
    );

    return {
      ...user,
      membership: membership,
    };
  }

  public async purgeEverything(): Promise<void> {
    this.users.delete({});
  }
}
