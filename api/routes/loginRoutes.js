import express from "express";
import { checkUser } from "../app/controllers/auth/loginController.js";

const router = express.Router();

router.post('/', checkUser);

export default router;