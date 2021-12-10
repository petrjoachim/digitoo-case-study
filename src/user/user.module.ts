import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipModule } from '../membership/membership.module';
import { UserEntity } from './db/user.entity';
import { UserResolver } from './graphql/user.resolver';
import { UserController } from './rest/user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MembershipModule],
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
