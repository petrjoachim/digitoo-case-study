import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {
  Membership,
  MembershipType,
} from '../../membership/graphql/membership.model';

@ObjectType({ description: 'User' })
export class User {
  @Field(() => ID)
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
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsDateString()
  birthDate: string;

  @Field(() => MembershipType)
  membershipType?: MembershipType;
}

@InputType()
export class UserQuery {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @Field(() => MembershipType, { nullable: true })
  @IsOptional()
  membershipType?: MembershipType;
}
