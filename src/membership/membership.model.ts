import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType({ description: 'Membership' })
export class Membership {
  @Field(() => ID)
  id: string;

  @Field(() => MembershipType)
  type: MembershipType;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

export enum MembershipType {
  BASIC,
  PROFI,
}

registerEnumType(MembershipType, {
  name: 'MembershipType',
});
