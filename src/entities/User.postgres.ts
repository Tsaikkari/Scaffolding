import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm'

import Credential from './Credential.postgres'
import HealthCheck from './HealthCheck.postgres'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userName!: string

  @Column({ nullable: true })
  image!: string

  @OneToOne(() => Credential, (credential) => credential.user, {
    cascade: true,
  })
  @JoinColumn()
  credentials!: Credential

  @ManyToMany(() => HealthCheck, (healthCheck) => healthCheck.users, {
      cascade: true
  })
  @JoinTable()
  healthChecks!: HealthCheck[]
}
