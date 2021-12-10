import { UserEntity } from '../../user/db/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MembershipType } from '../graphql/membership.model';

@Entity({ name: 'membership' })
export class MembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column()
  tarif: MembershipType;

  @ManyToOne(() => UserEntity, (u) => u.memberships, { onDelete: 'CASCADE' })
  user: UserEntity;
}
