import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
export default {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View your XP and roles'),
  async execute(interaction, client) {
    const docRef = client.db.collection('users').doc(interaction.user.id);
    const doc = await docRef.get();
    let xp = 0, roles = [];
    if (doc.exists) {
      const data = doc.data();
      xp = data.xp || 0;
      roles = data.roles || [];
    } else {
      await docRef.set({ xp: 0, roles: [] });
    }
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Profile`)
      .addFields(
        { name: 'XP', value: xp.toString(), inline: true },
        { name: 'Roles', value: roles.join(', ') || 'None', inline: true }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
