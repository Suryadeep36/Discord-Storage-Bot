import "dotenv/config";
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  await channel.send("hello");
});

client.on("messageCreate", async (msg) => {
  console.log(msg.content);
  if (msg.content == "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);


function sendMessage(channel, msg){
  channel.send(msg);
}