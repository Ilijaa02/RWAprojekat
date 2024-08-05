import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.responses)
  user: User;

  @ManyToOne(() => Request, request => request.response)
  request: Request;
}
