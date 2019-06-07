import {} from "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { theIDs } from "./ids.json";
import { twitchAuth } from "./auth";

const fs = require("fs");
const api = require("twitch-api-v5");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");

const twitchStreams = require("twitch-get-stream")(process.env.clientId);

const app = express();

const corsOptions = ["https://example.com", "https://www.example.com"];

app
  .use("*", cors(corsOptions))
  .use(bodyParser.json())
  .use(twitchAuth)
  .get("/api/get-playlist", (req, res) => {
    const { stream, quality } = req.query;

    const getRawURL = streamName =>
      twitchStreams
        .rawParsed(streamName)
        .then(back => back.filter(s => s.title.includes("audio_only"))[0].file);

    if (
      fs.existsSync(
        `/var/www/example.exam/html/${stream}-${quality || "raw"}.m3u8`
      )
    ) {
      res.json(`https://example.exam/${stream}-${quality || "raw"}.m3u8`);
    } else {
      getRawURL(stream)
        .then(async audioOnly => {
          const audioToStream = !audioOnly
            ? `/var/www/example.exam/html/${stream}.m3u8`
            : audioOnly;

          const bitRate = !quality ? 320 : quality;
          ffmpeg(audioToStream, { timeout: 0 })
            .audioBitrate(bitRate)
            .noVideo()
            .addOptions(["-hls_flags delete_segments"])
            .on("error", err => console.log("ERRPR!@", err))
            .save(`/var/www/example.exam/html/${stream}-${quality}.m3u8`);
        })
        .then(() => {
          res.json(`https://example.stream/${stream}-${quality}.m3u8`);
        })
        .catch(err =>
          console.log("There was an error sending the encoded file back", err)
        );
    }
  })

  .get("/api/meta", (req, res) => {
    api.clientID = process.env.clientId;

    const streamInfo = theIDs.map(id =>
      axios
        .get(`https://api.twitch.tv/kraken/streams/${id}`, {
          headers: {
            "Client-ID": process.env.clientId,
            Accept: "application/vnd.twitchtv.v5+json"
          }
        })
        .then(v => v.data.stream)
    );

    Promise.all(streamInfo).then(streams =>
      res.json(
        streams
          .filter(x => x)
          .map(s => {
            const { name, logo, url, display_name, status, game } = s.channel;

            return {
              stream: name,
              logo,
              game,
              url,
              title: display_name,
              status
            };
          })
      )
    );
  })

  .listen(process.env.PORT || 4321, () => console.log("Server up!"));
