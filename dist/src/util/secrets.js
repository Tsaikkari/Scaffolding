"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = exports.ENVIRONMENT = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = __importDefault(require("./logger"));
var entities_1 = __importDefault(require("../entities"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.error('Please make a .env file');
}
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
    entities: entities_1.default,
    cli: {
        entitiesDir: 'entities',
        migrationsDir: 'migrations',
        subscribersDir: 'subscribers',
    },
};
exports.default = exports.ormConfig;
if (!DB_PASSWORD) {
    logger_1.default.error('No postgres password. Set DB_PASSWORD environment variable.');
}
