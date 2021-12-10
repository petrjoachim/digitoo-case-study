import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { Membership, MembershipType } from '../membership/membership.model';

@ObjectType({ description: 'User' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => GraphQLISODateTime)
  birthDate: Date;

  @Field(() => Membership, { nullable: true })
  membership?: Membership;
}

@InputType()
export class NewUserInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birthDate: string;

  @Field(() => MembershipType)
  membershipType?: MembershipType;
}
