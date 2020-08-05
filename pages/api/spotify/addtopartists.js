import axios from "axios";
import mysql2 from "mysql2";
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
  console.log("now on server-side addtopartists");
  console.log(req.body);
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
            Authorization: `Bearer ${req.body.spotifytoken}`,
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
        console.log("now in GetUsersTopArtists");
        await sequelize
          .query(
            `SELECT id FROM hivemind.users WHERE email='${req.body.useremail}'`,
            {
              type: QueryTypes.SELECT,
            }
          )
          .then(async (id) => {
            await db.userdata
              .findOne({ where: { userid: id[0].id } })
              .then(async (found) => {
                if (found == null) {
                  console.log("its null! adding now");
                  await db.userdata.create({
                    userid: id[0].id,
                    topartists: JSON.stringify(spotifyAPIArtistObj),
                  });
                  console.log(
                    `top artists object written to db for user: ${id[0].id}`
                  );
                  res.status(201);
                } else {
                  console.log(
                    `userdata row found for user ${id[0].id}, updating row now.`
                  );
                  res.status(201);

                  await db.userdata
                    .update(
                      { topartists: JSON.stringify(spotifyAPIArtistObj) },
                      {
                        returning: true,
                        where: { userid: id[0].id },
                        plain: true,
                      }
                    )
                    .catch((err) =>
                      console.log("err in removing existing userdata row")
                    );
                }
              });
          });
      })
      .catch(function (error) {
        // handle error
        console.log("error in addtotopartists: ", error);
        res.status(200);
      });
  } catch (e) {
    console.log(`it failed in GetUsersTopArtists.js`);
  }
  // console.log(topArtists);
  res.end("hello");
}
