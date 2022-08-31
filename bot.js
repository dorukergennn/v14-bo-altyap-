const Discord = require('discord.js')
const { Client, Partials } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' });
const { prefix, botid, ownerid, token } = require("./ayarlar.json");
const db = require('./database')
require("./slash")(client)

const icooldown = new Discord.Collection()
const pcooldown = new Discord.Collection()

// * DURUM ve HAZIR MESAJI
client.on("ready", () => {

    console.log(`${client.user.tag} Hazırlandı`);
    client.user.setActivity(`/yardım | ${client.guilds.cache.size} Sunucu`);
    
});

// * ETİKETE TEPKİ
client.on('messageCreate', async message => {

    const embedetiket = new Discord.EmbedBuilder()
    .setColor('Blue')
    .setDescription(`**/yardım** Komutu ile Komutlarımı Görebilirsiniz`)
    if (message.content === `<@${botid}>`) {
      message.channel.send({ embeds: [embedetiket] })
    }
});

// ! MODÜLLER - SLASH
client.on("interactionCreate", interaction => {

	const command = client.slashcommands.get(interaction.commandName);
	if (!command) return;

    // * COOLDOWN
    if(interaction.user.id !== ownerid) {
    if(!icooldown.has(interaction.commandName)) {
        icooldown.set(interaction.commandName, new Discord.Collection())
    }
    
    const now = Date.now()
    const timestampt = icooldown.get(interaction.commandName)
    const cooldownAmount = (command.cooldown) * 1000

    if(timestampt.has(interaction.user.id)) {
        const expiration = timestampt.get(interaction.user.id) + cooldownAmount

        if(now < expiration) {
            const timeleft = Math.round((expiration - now) / 1000)
            
            const embeduyarı = new Discord.EmbedBuilder()
            .setDescription(`<:red2:964923770005499946> Bu Komutu Kullanabilmek için **${timeleft} Saniye** Beklemelisin`)
            .setColor('Red')
            interaction.reply({ embeds: [embeduyarı] })
            setTimeout(() => { interaction.deleteReply() }, expiration - now);
            
            return;
        }
    
    } else {

        timestampt.set(interaction.user.id, now)
        setTimeout(() => timestampt.delete(interaction.user.id), cooldownAmount)
    }
    }

    // * YETKİLER
    if (command.yetki) {

        var yetki = command.yetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

        var yetkiyok = new Discord.EmbedBuilder()
        .setDescription(`
        <:red2:964923770005499946> Yetersiz Yetki
            
        Gerekli Yetki: '**${yetki}**'
        `)
        .setColor('Red')
        if (!interaction.member.permissions.has(`${command.yetki}`)) return interaction.reply({ embeds: [yetkiyok] })
    }

    if (command.botyetki) {

        var botyetki = command.botyetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

        var botyetkiyok = new Discord.EmbedBuilder()
        .setDescription(`
        <:red2:964923770005499946> Yetersiz Yetkiye Sahibim
            
        Gerekli Yetki: '**${botyetki}**'
        `)
        .setColor('Red')
        if (!interaction.guild.members.me.permissions.has(`${command.botyetki}`)) return interaction.reply({ embeds: [botyetkiyok] })
    }
    
	try {
		command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		interaction.reply({ content: 'Komutta bir sorun oluştu lütfen daha sonra tekrar dene 😔', ephemeral: true });
	}
})

// ! MODÜLLER - PREFIX
client.on("messageCreate", message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    let cmd = client.commands.get(command)
    if (!cmd) return;

    // * COOLDOWN
    if(message.author.id !== ownerid) {
    if(!pcooldown.has(cmd.name[0])) {
        pcooldown.set(cmd.name[0], new Discord.Collection())
    }
    
    const now = Date.now()
    const timestampt = pcooldown.get(cmd.name[0])
    const cooldownAmount = (cmd.cooldown) * 1000

    if(timestampt.has(message.author.id)) {
        const expiration = timestampt.get(message.author.id) + cooldownAmount

        if(now < expiration) {
            const timeleft = Math.round((expiration - now) / 1000)
            
            const embeduyarı = new Discord.EmbedBuilder()
            .setDescription(`<:red2:964923770005499946> Bu Komutu Kullanabilmek için **${timeleft} Saniye** Beklemelisin`)
            .setColor('Red')
            message.channel.send({ embeds: [embeduyarı] }).then(msg => {
            setTimeout(() => { msg.delete() }, expiration - now)
            })
            return;
        }
    
    } else {

        timestampt.set(message.author.id, now)
        setTimeout(() => timestampt.delete(message.author.id), cooldownAmount)
    }
    }

    // * YETKİLER
    if (cmd.yetki) {

        var yetki = cmd.yetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

        var yetkiyok = new Discord.EmbedBuilder()
        .setDescription(`
        <:red2:964923770005499946> Yetersiz Yetki
            
        Gerekli Yetki: '**${yetki}**'
        `)
        .setColor('Red')
        if (!message.member.permissions.has(`${cmd.yetki}`)) return message.channel.send({ embeds: [yetkiyok] })
    }

    if (cmd.botyetki) {

        var botyetki = cmd.botyetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

        var botyetkiyok = new Discord.EmbedBuilder()
        .setDescription(`
        <:red2:964923770005499946> Yetersiz Yetkiye Sahibim
            
        Gerekli Yetki: '**${botyetki}**'
        `)
        .setColor('Red')
        if (!message.guild.members.me.permissions.has(`${cmd.botyetki}`)) return message.channel.send({ embeds: [botyetkiyok] })
    }    

    cmd.execute(client, message, args);

});

// ! TOKEN
client.login(token);