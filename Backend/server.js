import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { sendFile } from "./discord_bot.js";
import File from "./model/File.js";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "15mb" }));
app.use(bodyParser.json());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cloudBin");
}
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
  await File.findOne({
    fileName: chunks[0].fileName,
  }).then(async (foundFile) => {
    if (foundFile) {
      chunks = [];
      res.send({
        msg: "File already exists",
        status: 500
      });
    } else {
      for (let i = 0; i < chunks.length; i++) {
        const fileNameWithOutExtension = chunks[0].fileName.split('.').slice(0, -1).join('.');
        let fileName = fileNameWithOutExtension + "-" + i + ".txt";
        fs.appendFile(fileName, chunks[i].data, (err) => {
          if (err) {
            console.log(err);
          }
        });
        const messageId = await sendFile(fileName);
        await File.findOne({
          fileName: chunks[i].fileName,
        }).then((foundFile) => {
          if (foundFile) {
            foundFile.groupMessageId.push({
              messageId: messageId,
            });
            foundFile.save();
          } else {
            const groupMessageID = [];
            groupMessageID.push({
              messageId: messageId,
            });
            const newFile = new File({
              fileName: chunks[i].fileName,
              fileType: chunks[i].fileType,
              chunkName: fileName,
              fileSize: chunks[i].fileSize,
              lastModified: chunks[i].lastModifiedDate,
              groupMessageId: groupMessageID,
            });
            newFile.save();
          }
        });
        fs.unlink(fileName, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      chunks = [];
      res.send({
        msg: "Entire file sent to backend",
        status: 200,
      });
    }
  });
});

app.get("/getAllFiles", async (req, res) => {
  await File.find({}).then((allFiles) => {
    res.send({
      data: allFiles
    })
  })
})



app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
