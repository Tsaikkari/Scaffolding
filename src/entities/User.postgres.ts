import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import Credential from './Credential.postgres'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userName!: string

  @Column({ nullable: true })
  image!: string

  @Column({ nullable: true})
  heathCheckDate!: string

  @Column({ nullable: true})
  dentistDate!: string

  @Column({ nullable: true})
  gynoDate!: string

  @OneToOne(() => Credential, (credential) => credential.user, {
    cascade: true,
  })
  @JoinColumn()
  credentials!: Credential
}
