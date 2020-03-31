
var db = require("./models/index.js");

// =============================================================
//Syncs database
db.sequelize.sync({}).then(function() {
  console.log(`done`);
});
