import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { sendFile } from "./discord_bot.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "15mb" }));
app.use(bodyParser.json());
app.use(cors());
let chunks = [];
app.post("/uploadFile", async (req, res) => {
  const data = req.body;
  chunks.push(data);
  res.send({
    msg: "File sent to backend",
    status: 200,
  });
});

app.get("/processFile", async (req, res) => {
  for (let i = 0; i < chunks.length; i++) {
    let fileName = chunks[i].fileName + "-" + i + ".txt";
    fs.appendFile(fileName, chunks[i].data, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const messageId = await sendFile(fileName);
    fs.unlink(fileName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  res.send({
    msg: "Entire file sent to backend",
    status: 200,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
