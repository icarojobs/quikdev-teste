import { config } from 'dotenv';

config();

export function env(name) {
    return process.env[name];
}