import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { REST, Routes } from 'discord.js';

const commands = [];
const commandsPath = path.resolve('commands');
for (const category of fs.readdirSync(commandsPath)) {
  const categoryPath = path.join(commandsPath, category);
  for (const file of fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'))) {
    const cmd = await import(path.join(categoryPath, file));
    commands.push(cmd.default.data.toJSON());
  }
}

const rest = new REST().setToken(process.env.TOKEN);
await rest.put(
  Routes.applicationCommands(process.env.CLIENT_ID),
  { body: commands }
);
console.log('✅ Commands deployed');
