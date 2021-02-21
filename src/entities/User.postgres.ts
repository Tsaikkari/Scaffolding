import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm'

import Credential from './Credential.postgres'
import FitnessProgram from './FitnessProgram.postgres'
import Appointment from './Appointment.postgres'
import Note from './Note.Postgres'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userName!: string

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

  @OneToOne(() => Credential, (credential) => credential.user, {
    cascade: true,
  })
  @JoinColumn()
  credentials!: Credential

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
}
