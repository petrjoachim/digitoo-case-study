import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from '../../src/membership/membership.entity';
import { UserEntity } from '../../src/user/user.entity';

export const TestDatabase = () => [
  ConfigModule.forRoot({ envFilePath: '.env' }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: +configService.get<number>('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: [UserEntity, MembershipEntity],
      synchronize: true,
    }),
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([UserEntity, MembershipEntity]),
];
