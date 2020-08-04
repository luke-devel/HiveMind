import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql2 from "mysql2";
import Cookie from "js-cookie";

export default async function (req, res) {
  // console.log(req.body);
  switch (req.method) {
    case "POST":
      let user;
      try {
        try {
          user = await db.user.findOne({
            where: {
              email: req.body.userinput,
            },
          });
          if (!user) {
            throw err;
          }
        } catch (e) {
          user = await db.user.findOne({
            where: {
              username: req.body.userinput,
            },
          });
          if (!user) {
            throw err;
          }
        }
      } catch (e) {
        console.log("caught correct");
        console.log(e);
        res.end("invalid username or email");
      }

      if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // if password is correct
          const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.secretKey
          );
          res.status(201);
          res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
          });
        } else {
          console.log("invalid password");
          res.end("invalid password");
        }
      }
      break;

    default:
      res.end("you need to post");
      break;
  }
}
