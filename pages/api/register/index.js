// import bcrypt from 'bcrypt'
import db from "../../../models/index.js"

export default async function (req, res) {
    // const hash = await bcrypt.hash(req.body.password, 10);

    const user = await db.user.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

    });

    if (user.errno === 1062) {
        user = {
            errno: 1062,
            errormessage: "Email already exists"
        }
    }
    res.end(JSON.stringify(user));
}