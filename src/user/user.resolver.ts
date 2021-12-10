import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUserInput, User, UserQuery } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async users(@Args('query') query: UserQuery): Promise<User[]> {
    this.logger.debug('Resolving users', { query });

    return this.userService.filterUsers(query);
  }

  @Mutation(() => User)
  public async createUser(@Args('user') user: NewUserInput): Promise<User> {
    this.logger.debug('Creating user', { user });
    return this.userService.createUser(user);
  }
}
