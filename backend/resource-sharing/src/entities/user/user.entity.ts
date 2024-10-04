import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Resource } from '../resource/resource.entity';
import { Request } from '../request/request.entity';
import { Response } from '../response/response.entity';

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

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  numberOfRatings: number;

  @OneToMany(() => Resource, resource => resource.user)
  resources: Resource[];

  @OneToMany(() => Request, request => request.user)
  requests: Request[];

  @OneToMany(() => Response, response => response.user)
  responses: Response[];
}
