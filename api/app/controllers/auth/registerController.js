import { db } from "../../helpers/db.js";
import bcrypt from 'bcryptjs';
import moment from "moment";
import { ResponseMessage } from "../../helpers/ResponseMessage.js";

const salt = 10;

export const storeUser = (req, res) => {
    const sql = "INSERT INTO users (`name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?)";

    bcrypt.hash(req.body.password, salt, (error, hash) => {
        if (error) {
            return res.json({ status: false, message: `${ResponseMessage.ENCRYPTION_ERROR}: ${error.message}` });
        }

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

        db.query(sql, [req.body.name, req.body.email, hash, req.body.role, currentDateTime, currentDateTime], (error, result) => {
            if (error) {
                return res.json({ status: false, message: `${ResponseMessage.INSERT_ERROR}: ${error.message}` });
            }

            return res.json({ status: true, message: ResponseMessage.INSERT_USER_SUCCESS });
        });
    });
};