import { db } from "../../helpers/db.js";
import bcrypt from 'bcryptjs';
import { ResponseMessage } from "../../helpers/ResponseMessage.js";
import jwt from "jsonwebtoken";

export const checkUser = (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [req.body.email], (error, data) => {
        if (error || data?.length === 0) {
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

            return res.json({ status: true, message: `Olá ${data[0].name}!`, token, user: data[0] });
        });
    });
};