const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var db = require("../pages/api/models");

console.log( process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,);
// =============================================================
// Syncs database
// add db.sequelize.sync({ force: true }) if you want to drop all current tables.
db.sequelize.sync({ force: true }).then(function () {
  console.log(`done`);
});
