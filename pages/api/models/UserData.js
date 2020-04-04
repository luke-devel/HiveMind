(JsonField = require("sequelize-json")),
  (module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "userdata",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userid: {
          type: Sequelize.INTEGER
        },
        topartists: {
          type: Sequelize.TEXT("long")
        },
        toptracks: {
          type: Sequelize.TEXT("long")
        },
        songsfromplaylists: {
          type: Sequelize.TEXT("long")
        },
        savedtracks: {
          type: Sequelize.TEXT("long")
        },
        savedalbums: {
          type: Sequelize.TEXT("long")
        },
        created: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      },
      {
        timestamps: false
      }
    );

    return User;
  });
