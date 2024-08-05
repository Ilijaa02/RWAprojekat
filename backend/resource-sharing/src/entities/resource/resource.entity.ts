import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';

export enum ResourceType {
  PREDMET = 'predmet',
  VESTINA = 'vestina',
  PROSTOR = 'prostor',
}

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.PREDMET,
  })
  type: ResourceType;

  @CreateDateColumn()
  createdAtL: Date;

  @ManyToOne(() => User, user => user.resources)
  user: User;

  @OneToMany(() => Request, request => request.resource)
  requests: Request[];
}
