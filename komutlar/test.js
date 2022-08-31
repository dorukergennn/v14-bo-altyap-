const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    slash: true,
    yetki: 'ManageMessages',
    botyetki: 'ManageMessages',
    cooldown: 10,

    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test Komutu')
    .addStringOption(option =>
        option
            .setName('seçenek')
            .setDescription('seçenek açıklaması')
            .setRequired(true)
    ),
    async execute(client, interaction) {

        await interaction.reply('Test Başarılı')

    }}