import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm'

import User from './User.postgres'

@Entity()
export default class HealthCheck extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @ManyToMany(() => User, (user) => user.healthChecks)
    users!: User[]
}