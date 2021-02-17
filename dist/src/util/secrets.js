"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = exports.ENVIRONMENT = void 0;
exports.ENVIRONMENT = process.env.NODE_ENV;
var prod = exports.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
var DB_PASSWORD = process.env['DB_PASSWORD'];
exports.ormConfig = {
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
};
exports.default = exports.ormConfig;
