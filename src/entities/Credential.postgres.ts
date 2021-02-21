import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
  } from 'typeorm'
  
  import User from './User.postgres'
  
  @Entity()
  export default class Credential extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    email!: string
  
    @Column()
    password!: string
  
    @OneToOne(() => User, (user) => user.credentials)
    user!: User
}