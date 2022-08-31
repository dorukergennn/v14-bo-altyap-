const Discord = require('discord.js')

module.exports = {
    slash: false,
    name: ['test2'],
    yetki: 'ManageMessages',
    botyetki: 'ManageMessages',
    cooldown: 10,
    async execute(client, message, args) {

        await message.channel.send('Test Başarılı')

    }}