import { env } from './app/helpers/env.js';
import { db } from './app/helpers/db.js';
import { ResponseMessage } from './app/helpers/ResponseMessage.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const salt = 10;
const app = express();

app.use(express.json());
app.use(cors({
    origin: [`${env('APP_PROTOCOL')}://${env('APP_URL')}:${env('APP_PORT')}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.json({ success: true, message: "QuikDev API Server v1.0.0" });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (error, hash) => {
        if (err) {
            return res.json({ status: false, message: ResponseMessage.ENCRIPTION_ERROR });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash
        ];

        db.query(sql, [values], (error, result) => {
            if (error) {
                return res.json({ status: false, message: ResponseMessage.INSERT_ERROR });
            }

            return res.json({ status: true, message: ResponseMessage.INSERT_USER_SUCCESS });
        });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], (error, data) => {
        if (error || data.length === 0) {
            return res.json({ status: false, message: ResponseMessage.LOGIN_ERROR });
        }

        bcrypt.compare(req.body.password.toString(), data[0].password, (error, response) => {
            if (error) {
                return res.json({ status: false, message: ResponseMessage.PASSWORD_ERROR });
            }

            if (!response) {
                return res.json({ status: false, message: ResponseMessage.PASSWORD_ERROR });
            }

            const token = jwt.sign({
                name: data[0].name
            }, "jwt-secret-key", { expiresIn: '1d' });

            return res.json({ status: true, message: `Olá ${data[0].name}!`, token });
        });
    });
});


app.listen(env('APP_PORT'), () => {
    console.log(`API Server is running at ${env('APP_PROTOCOL')}://${env('APP_URL')}:${env('APP_PORT')}`);
});