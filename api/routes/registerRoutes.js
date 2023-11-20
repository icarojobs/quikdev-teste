import express from "express";
import { storeUser } from "../app/controllers/auth/registerController.js";

const router = express.Router();

router.post('/', storeUser);

export default router;