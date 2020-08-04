// import bcrypt from "bcrypt";
import db from "../models";
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
  // Create const variable of userEmail retreived from request header
  const userEmail = req.headers.useremail;
  // Useing thrid normal form to access user's spotify api data from mysql database
  // Returns raw json data which will be parsed below.
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
  res.json(JSON.parse(artistString[0].topartists));
}
