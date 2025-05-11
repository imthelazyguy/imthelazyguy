import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the top 10 users by XP'),
  async execute(interaction, client) {
    const usersSnap = await client.db.collection('users')
      .orderBy('xp', 'desc').limit(10).get();
    let description = '';
    let rank = 1;
    usersSnap.forEach(doc => {
      description += `**${rank++}.** <@${doc.id}> — ${doc.data().xp} XP\n`;
    });
    await interaction.reply({ content: description || 'No data yet.' });
  }
};
