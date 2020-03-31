import db from "../../../models";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"

export default async function(req, res) {
  console.log(req.body);
  switch (req.method) {
    case "POST":
      let user;
      try {
        try {
          user = await db.user.findOne({
            where: {
              email: req.body.email
            }
          });
          if (!user) {
              throw err;
          }
        } catch(e) {
          user = await db.user.findOne({
            where: {
              username: req.body.username
            }
          });
          if (!user) {
            throw err;
        }
        }
      } catch (e) {
        console.log('caught correct');
        res.end("invalid username or email");

      }
    //   console.log(user);

      if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // const token = jwt.sign({ id: user.id, email: user.email }, process.env.secretKey)
          // res.json({
          //     id: user.id,
          //     email: user.email,
          //     token
          // })
          res.end(JSON.stringify(user));
        } else {
          res.end("login failed");
        }
    }
      break;

    default:
      res.end("you need to post");
      break;
  }
}
