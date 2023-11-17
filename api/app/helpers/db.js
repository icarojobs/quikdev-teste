import { env } from './env.js';
import mysql from 'mysql';

export const db = mysql.createConnection({
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    user: env('DB_USER'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
});