import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Manually send the welcome embed'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Welcome to NOVA!')
      .setDescription('🌟 Chill, connect, and level up. Type `/profile` to get started.')
      .setColor('#00ccff')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
