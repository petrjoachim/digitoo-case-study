import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/db/user.entity';
import { MembershipEntity } from './db/membership.entity';
import { Membership, MembershipType } from './graphql/membership.model';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly memberships: Repository<MembershipEntity>,
  ) {}

  public async createMembership(
    user: UserEntity,
    membershipType: MembershipType,
  ): Promise<Membership> {
    let membership = new MembershipEntity();
    membership.createdAt = new Date();
    membership.user = user;
    membership.tarif = membershipType;

    membership = await this.memberships.save(membership);

    return { ...membership, createdAt: new Date(membership.createdAt) };
  }
}
