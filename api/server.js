import { env } from './app/helpers/env.js';
import { db } from './app/helpers/db.js';
import { ResponseMessage } from './app/helpers/ResponseMessage.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import userRoutes from "./routes/userRoutes.js";
import defaultRoutes from "./routes/defaultRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: [`${env('APP_PROTOCOL')}://${env('APP_URL')}:${env('APP_PORT')}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

app.use('/', defaultRoutes);
app.use('/users', userRoutes);
app.use('/register', registerRoutes);


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], (error, data) => {
        if (error || data.length === 0) {
            return res.json({ status: false, message: `${ResponseMessage.LOGIN_ERROR}: ${error.message}` });
        }

        bcrypt.compare(req.body.password.toString(), data[0].password, (error, response) => {
            if (error) {
                return res.json({ status: false, message: `${ResponseMessage.PASSWORD_ERROR}: ${error.message}` });
            }

            if (!response) {
                return res.json({ status: false, message: `${ResponseMessage.PASSWORD_ERROR}: ${error.message}` });
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