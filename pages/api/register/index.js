import bcrypt from "bcrypt";
import db from "../models";

export default async function (req, res) {
  let user;
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    user = await db.user.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    res.status(201);
  } catch (err) {
    console.log("err in api/regiter/index.js sequelize,", err)
    res.status(200);
  }
  res.end(JSON.stringify(user));

}
