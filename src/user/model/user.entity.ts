import { BlogEntryEntity } from './../../blog/model/blog-entry.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user.interface';
import { type } from 'os';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(
    (type) => BlogEntryEntity,
    (blogEntryEntity) => blogEntryEntity.author,
  )
  blogEntries: BlogEntryEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
