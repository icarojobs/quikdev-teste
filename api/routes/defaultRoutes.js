import express from "express";
import { defaultMessage } from "../app/controllers/defaultController.js";

const router = express.Router();

router.get('/', defaultMessage);

export default router;