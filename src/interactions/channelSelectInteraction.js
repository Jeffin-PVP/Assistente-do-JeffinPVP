const {

    ActionRowBuilder,

    ButtonBuilder,

    ButtonStyle

} = require("discord.js");

const {

    embedCache

} = require("./buttonInteraction");

module.exports = {

    async execute(interaction) {

        if (!interaction.isChannelSelectMenu())
            return;

        if (interaction.customId !== "embed_channel")
            return;

        const embed =
            embedCache.get(interaction.user.id);

        if (!embed) {

            return interaction.reply({

                content:
                    "❌ A embed expirou.",

                ephemeral: true

            });

        }

        const channel =

            interaction.channels.first();

        await channel.send({

            embeds: [embed]

        });

        embedCache.delete(
            interaction.user.id
        );

        return interaction.update({

            content:

                `✅ Embed enviada em ${channel}.`,

            embeds: [],

            components: []

        });

    }

};