import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Resource } from '../resource/resource.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, user => user.requests)
  user: User;

  @ManyToOne(() => Resource, resource => resource.requests)
  resource: Resource;
}
