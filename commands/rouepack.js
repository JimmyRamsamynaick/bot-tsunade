const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { spinWheel } = require('../utils/wheel');
const { generateWheelImage } = require('../utils/wheelRenderer');
const rewards = require('../rewards-pack.json');
require('dotenv').config();
const ownerId = process.env.OWNER_ID;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rouepack')
    .setDescription('Faire tourner la roue de la fortune (packs)')
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
        .setDescription('Préparez-vous pour le pack... 🔄 ⏳')
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
      
      const finalEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🎡 Résultat de la roue pack !')
        .setDescription(`${targetUser} a obtenu **${reward.name}** !`)
        .setImage('attachment://wheel-final.png')
        .setTimestamp();
      
      await interaction.editReply({ embeds: [finalEmbed], files: [finalAttachment] });
    } catch (error) {
      console.error('Error in rouepack command:', error);
      try {
        await interaction.followUp({ content: 'Une erreur est survenue !', ephemeral: true });
      } catch (e) {
        console.error('Error replying to interaction:', e);
      }
    }
  },
};
