import { ConnectionOptions } from 'typeorm'

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

const DB_PASSWORD = process.env['DB_PASSWORD'] as string

export const ormConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: DB_PASSWORD,
  database: 'scaffolding',
  syncronize: true,
  logging: false,
  //entities: Entities,
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
    subscribersDir: 'subscribers',
  },
}

export default ormConfig as ConnectionOptions
