import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [UserModule, MembershipModule],
})
export class AppModule {}
