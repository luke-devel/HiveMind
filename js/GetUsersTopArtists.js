import axios from "axios";
import mysql2 from "mysql2";
import db from "../pages/api/models";
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

export default async function GetUsersTopArtists(token, useremail) {
  console.log("IN GetUsersTopArtists", useremail);
  try {
    await axios
      .get(
        // "https://api.spotify.com/v1/me/tracks?limit=50",
        // "https://api.spotify.com/v1/me/tracks?limit=50&offset=5",
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.items);
        const spotifyAPIArtistObj = res.data.items.map(
          ({ name, genres, images }, i) => ({
            id: i + 1,
            name,
            genres,
            images,
          })
        );
        return spotifyAPIArtistObj;
      })
      .then(async (spotifyAPIArtistObj) => {
        // console.log(artistObject);
        console.log("now in GetUsersTopArtists");
        await sequelize
          .query(`SELECT id FROM hivemind.users WHERE email='${useremail}'`, {
            type: QueryTypes.SELECT,
          })
          .then(async (id) => {
            await db.userdata
              .findOne({ where: { userid: id[0].id } })
              .then(async (found) => {
                if (found == null) {
                  console.log("its null!");
                  await db.userdata.create({
                    userid: id[0].id,
                    topartists: JSON.stringify(spotifyAPIArtistObj),
                  });
                  console.log(
                    `top artists object written to db for user: ${id[0].id}`
                  );
                } else {
                  console.log(
                    `userdata row found for user ${id[0].id}, updating row now.`
                  );
                  db.userdata
                    .destroy({ where: { userid: id[0].id } })
                    .then((result) =>
                      console.log(`row removed for ${id[0].id}`)
                    )
                    .catch((err) =>
                      console.log("err in removing existing userdata row", err)
                    );
                }
              });
          });
      })
      .catch(function (error) {
        // handle error
        console.log("error in GetUsersTopArtists.js", error);
      });
  } catch (e) {
    console.log(`it failed in GetUsersTopArtists.js`, e);
  }
}
