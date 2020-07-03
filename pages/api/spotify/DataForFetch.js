// import bcrypt from "bcrypt";
import db from "../../../pages/api/models";
const { QueryTypes, Sequelize } = require("sequelize");

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

export default async function (req, res) {
  console.log("user email: ", req.headers.useremail);
  let userEmail = req.headers.useremail;
  console.log("now on server-side in dataforfetch");
  // thrid normal form
  const artistString = await sequelize.query(
    `SELECT distinct topartists
    FROM hivemind.userdata
    WHERE userid IN (SELECT id FROM hivemind.users WHERE email='${userEmail}')
    LIMIT 1`,
    {
      raw: true,
      type: QueryTypes.SELECT,
    }
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json", "email", req.headers.email);
  // console.log(artistString);
  // const topArtists = artistString
  // console.log(JSON.parse(artistString[0].topartists));
  res.json(JSON.parse(artistString[0].topartists));
}
