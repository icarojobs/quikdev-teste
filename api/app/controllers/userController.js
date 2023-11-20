import { db } from "../helpers/db.js";

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (error, data) => {
        if (error) {
            return res.json({ status: false, message: error.message });
        }

        return res.json({ status: true, data });
    });
};