import { env } from './env.js';
import { createConnection } from 'mysql2';

export const db = createConnection({
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    port: env('DB_PORT'),
    host: env('DB_HOST'),
    user: env('DB_USERNAME'),
});