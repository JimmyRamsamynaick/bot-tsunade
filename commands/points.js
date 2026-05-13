const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getPoints } = require('../utils/storage');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('points')
    .setDescription('Voir votre solde de points ou celui d\'un autre utilisateur')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur dont vous voulez voir le solde')),
  async execute(interaction) {
    const targetUser = interaction.options.getUser('utilisateur') || interaction.user;
    const points = getPoints(targetUser.id);

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('💰 Solde de points')
      .setDescription(`${targetUser} a actuellement **${points} points** !`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
