import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm'

import Group from './Group.postgres'
import FitnessProgram from './FitnessProgram.postgres'
import Appointment from './Appointment.postgres'
import Note from './Note.postgres'
import Order from './Order.postgres'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({ nullable: true })
  image!: string

  @Column({ nullable: true})
  weight!: number

  @Column({ nullable: true})
  targetWeight!: number

  @Column({ nullable: true})
  healthCheckDate!: string

  @Column({ nullable: true})
  dentistDate!: string

  @Column({ nullable: true})
  gynoDate!: string

  @Column()
  role!: string

  @Column({ default: false })
  isAdmin!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @ManyToOne(() => Group, (group) => group.members, {
    cascade: ['insert', 'remove'],
  })
  group!: Group

  @ManyToMany(() => FitnessProgram, (fitnessProgram) => fitnessProgram.users, {
    cascade: true, 
    eager: true,
  })
  @JoinTable()
  fitnessPrograms!: FitnessProgram[]

  @OneToMany(() => Appointment, (appointment) => appointment.user, {
    cascade: ['remove'], 
  })
  @JoinTable()
  appointments!: Appointment[]

  @OneToMany(() => Note, (note) => note.user, {
    cascade: ['remove'], 
  })
  @JoinTable()
  notes!: Note[]

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  orders!: Order[]
}
