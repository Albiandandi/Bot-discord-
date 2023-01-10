const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = async (client, interaction, args) => {
    client.simpleEmbed({
        desc: `${client.emotes.animated.loading} Calcul du ping...`,
        type: 'editreply'
    }, interaction).then((resultMessage) => {
        const ping = Math.floor(resultMessage.createdTimestamp - interaction.createdTimestamp);

        mongoose.connection.db.admin().ping(function (err, result) {

            var mongooseSeconds = ((result.ok % 60000) / 1000);
            var pingSeconds = ((ping % 60000) / 1000);
            var apiSeconds = ((client.ws.ping % 60000) / 1000);

            client.embed({
                title: `${client.emotes.normal.pong}・Pong`,

                desc: `Vérifier la rapidité du bot`,

                fields: [
                    {
                        name: "<:discord_bot:1012038552521031703> ┆ Bot latence",
                        value: `${ping}ms (${pingSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "<:blue_hammers:1012018248163786763> ┆ API Latence",
                        value: `${client.ws.ping}ms (${apiSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "<:to_space:1012038751729491968> ┆ Database Latence",
                        value: `${result.ok}ms (${mongooseSeconds}s)`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction)
        })
    })
}

 
