import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Resource } from '../resource/resource.entity';
import { Request } from '../request/request.entity';

export enum UserRole{
  USER = 'user',
  ADMIN = 'admin'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole

  @OneToMany(() => Resource, resource => resource.user)
  resources: Resource[];

  @OneToMany(() => Request, request => request.user)
  requests: Request[];
}
