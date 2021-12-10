import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MembershipType } from './membership.model';

@Entity({ name: 'membership' })
export class MembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column()
  type: MembershipType;

  @ManyToOne(() => UserEntity, (u) => u.memberships)
  user: UserEntity;
}
