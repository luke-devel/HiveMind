import axios from "axios";
import db from "../pages/api/models";
const { QueryTypes, Sequelize } = require("sequelize");
import fs from "fs";

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
  try {
    const topArtists = await axios
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
        const artistObject = res.data.items.map(
          ({ name, genres, images }, i) => ({
            id: i + 1,
            name,
            genres,
            images,
          })
        );
        return artistObject;
      })
      .then(async (artistObject) => {
        // console.log(artistObject);
        console.log("now in GetUsersTopArtists");
        const id = await sequelize.query(
          `SELECT id FROM hivemind.users WHERE email='${useremail}'`,
          {
            type: QueryTypes.SELECT,
          }
        );
        // console.log("id", id[0].id);
        // console.log(JSON.stringify(artistObject, null, 4));
        // fs.writeFile(
        //   "./test.json",
        //   JSON.stringify(artistObject, null, 4),
        //   function(err) {
        //     if (err) {
        //       return console.log(err);
        //     }

        //     console.log("The file was saved!");
        //   }
        // );
        await db.userdata.create({
          userid: id[0].id,
          topartists: JSON.stringify(artistObject),
        });
        console.log("artist object written to db");
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  } catch (e) {
    console.log(`it failed in GetUsersTopArtists.js`, e);
  }
}
