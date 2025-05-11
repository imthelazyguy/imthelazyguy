import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily XP'),
  async execute(interaction, client) {
    const uid = interaction.user.id;
    const docRef = client.db.collection('users').doc(uid);
    const doc = await docRef.get();
    const now = Date.now();
    let data = doc.exists ? doc.data() : {};
    if (data.lastDaily && now - data.lastDaily < 24 * 3600 * 1000) {
      return interaction.reply({ content: '🕒 You already claimed today. Come back later!', ephemeral: true });
    }
    const xpGain = 50;
    data.xp = (data.xp || 0) + xpGain;
    data.lastDaily = now;
    await docRef.set(data, { merge: true });
    await interaction.reply(`✅ You received ${xpGain} XP!`);
  }
};
