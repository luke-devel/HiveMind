import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function(req, res) {
  switch (req.method) {
    case "POST":
      let user;
      try {
        try {
          user = await db.user.findOne({
            where: {
              email: req.body.userInput
            }
          });
          if (!user) {
            throw err;
          }
        } catch (e) {
          user = await db.user.findOne({
            where: {
              username: req.body.userInput
            }
          });
          if (!user) {
            throw err;
          }
        }
      } catch (e) {
        console.log("caught correct");
        // console.log(e)
        res.end("invalid username or email");
      }

      if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.secretKey
          );
          // console.log(token)
          res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token
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
