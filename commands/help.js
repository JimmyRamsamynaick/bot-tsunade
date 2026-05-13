const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche la liste des commandes disponibles'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📋 Liste des commandes')
      .setDescription('Voici toutes les commandes disponibles :')
      .addFields(
        { name: '/help', value: 'Affiche la liste des commandes' },
        { name: '/points [utilisateur]', value: 'Voir votre solde de points ou celui d\'un autre utilisateur' },
        { name: '/roue <utilisateur>', value: 'Faire tourner la roue de la fortune (propriétaire uniquement)' },
        { name: '/managepoints <utilisateur> <action> <montant>', value: 'Gérer les points d\'un utilisateur (propriétaire uniquement)' }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
