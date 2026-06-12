const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { spinWheel } = require('../utils/wheel');
const { addPoints } = require('../utils/storage');
const { generateWheelImage } = require('../utils/wheelRenderer');
const rewards = require('../rewards.json');
require('dotenv').config();
const ownerId = process.env.OWNER_ID;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roue')
    .setDescription('Faire tourner la roue de la fortune (points)')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur qui recevra la récompense')
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id !== ownerId) {
      return interaction.reply({ content: 'Seul le propriétaire du bot peut utiliser cette commande !', ephemeral: true });
    }

    try {
      await interaction.deferReply();
      
      // Embed de chargement simple
      const loadingEmbed = new EmbedBuilder()
        .setColor('#ffaa00')
        .setTitle('🎡 La roue tourne...')
        .setDescription('Préparez-vous... 🔄 ⏳')
        .setTimestamp();
      
      await interaction.editReply({ embeds: [loadingEmbed] });
      
      // Attendre un peu pour l'effet
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const targetUser = interaction.options.getUser('utilisateur');
      const { reward, index } = spinWheel(rewards);
      
      const numSegments = rewards.length;
      const segmentAngle = (2 * Math.PI) / numSegments;
      const finalRotation = -Math.PI / 2 - index * segmentAngle - segmentAngle / 2;
      
      const finalImage = generateWheelImage(finalRotation, rewards, index);
      const finalAttachment = new AttachmentBuilder(finalImage, { name: 'wheel-final.png' });
      const newPoints = addPoints(targetUser.id, reward.value);
      
      const finalEmbed = new EmbedBuilder()
        .setColor(reward.value > 0 ? '#00ff00' : reward.value < 0 ? '#ff0000' : '#ffff00')
        .setTitle('🎡 Résultat de la roue !')
        .setDescription(`${targetUser} a obtenu **${reward.name}** !`)
        .addFields(
          { name: 'Points', value: reward.value >= 0 ? `+${reward.value}` : `${reward.value}`, inline: true },
          { name: 'Nouveau solde', value: `${newPoints} points`, inline: true }
        )
        .setImage('attachment://wheel-final.png')
        .setTimestamp();
      
      await interaction.editReply({ embeds: [finalEmbed], files: [finalAttachment] });
    } catch (error) {
      console.error('Error in roue command:', error);
      try {
        await interaction.followUp({ content: 'Une erreur est survenue !', ephemeral: true });
      } catch (e) {
        console.error('Error replying to interaction:', e);
      }
    }
  },
};
