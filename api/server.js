import { env } from './app/helpers/env.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import defaultRoutes from "./routes/defaultRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

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
app.use('/login', loginRoutes);


app.listen(env('APP_PORT'), () => {
    console.log(`API Server is running at ${env('APP_PROTOCOL')}://${env('APP_URL')}:${env('APP_PORT')}`);
});