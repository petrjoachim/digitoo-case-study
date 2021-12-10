import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUserInput, User } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async users(
    @Args('membership', { nullable: true }) membership?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('birthDate', { nullable: true }) birthDate?: string,
  ): Promise<User[]> {
    this.logger.debug('Resolving users', {
      query: { membership, birthDate, email },
    });

    return this.userService.filterUsers({ membership, email, birthDate });
  }

  @Mutation(() => User)
  public async createUser(@Args('user') user: NewUserInput): Promise<User> {
    this.logger.debug('Creating user', { user });
    return this.userService.createUser();
  }
}
