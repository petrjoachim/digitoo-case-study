import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MembershipModule } from './membership/membership.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
      include: [UserModule],
    }),
    UserModule,
    MembershipModule,
  ],
})
export class AppModule {}
