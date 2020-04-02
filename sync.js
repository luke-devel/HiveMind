require("dotenv").config();
var db = require("./pages/api/models");

// =============================================================
// Syncs database
// add db.sequelize.sync({ force: true }) if you want to drop all current tables.
db.sequelize.sync().then(function() {
  console.log(`done`);
});
