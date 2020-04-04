"use strict";
const user = require("./User");
const userdata = require("./UserData");

// console.log(user);
const Sequelize = require("sequelize");

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false
  }
);

const db = {
  user: user(sequelize, Sequelize),
  userdata: userdata(sequelize, Sequelize)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
