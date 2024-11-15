import "dotenv/config";
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

export async function sendFile(filepath) {
  const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  const file = new AttachmentBuilder(filepath);

  try {
    const message = await channel.send({ content: 'Here is your file:', files: [file] });
    return message.id;
  } catch (error) {
    console.error('Error sending file:', error);
    throw error; 
  }
}
