import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Resource } from '../resource/resource.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  resourceId: number;

  @ManyToOne(() => User, user => user.requests)
  user: User;

  @ManyToOne(() => Resource, resource => resource.requests)
  resource: Resource;
}
