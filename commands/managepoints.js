const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { addPoints, removePoints, getPoints } = require('../utils/storage');
require('dotenv').config();
const ownerId = process.env.OWNER_ID;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('managepoints')
    .setDescription('Gérer les points d\'un utilisateur')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur dont vous voulez gérer les points')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('action')
        .setDescription('Ajouter ou retirer des points')
        .setRequired(true)
        .addChoices(
          { name: 'Ajouter', value: 'add' },
          { name: 'Retirer', value: 'remove' }
        ))
    .addIntegerOption(option =>
      option.setName('montant')
        .setDescription('Le montant de points')
        .setRequired(true)
        .setMinValue(1)),
  async execute(interaction) {
    if (interaction.user.id !== ownerId) {
      return interaction.reply({ content: 'Seul le propriétaire du bot peut utiliser cette commande !', ephemeral: true });
    }

    const targetUser = interaction.options.getUser('utilisateur');
    const action = interaction.options.getString('action');
    const amount = interaction.options.getInteger('montant');

    let newPoints;
    if (action === 'add') {
      newPoints = addPoints(targetUser.id, amount);
    } else {
      newPoints = removePoints(targetUser.id, amount);
    }

    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('✅ Points mis à jour')
      .setDescription(`Action effectuée sur ${targetUser} !`)
      .addFields(
        { name: 'Action', value: action === 'add' ? `+${amount} points` : `-${amount} points`, inline: true },
        { name: 'Nouveau solde', value: `${newPoints} points`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
