const Discord = require('discord.js');

const Schema = require("../../database/models/stickymessages");

module.exports = async (client, interaction, args) => {
    const data = await Schema.find({ Guild: interaction.guild.id });

    if (data) {
        let list = ``;

        for (var i = 0; i < data.length; i++) {
            list += `**${i + 1}** - Channel: ${data[i].Channel}`;
        }

        await client.embed({ 
            title: `💬・Sticky messages`, 
            desc: list, 
            type: 'editreply' 
        }, interaction)
    }
    else {
        client.errNormal({ 
            error: "Pas de données trouvées !",
            type: 'editreply' 
        }, interaction)
    }
}

 
