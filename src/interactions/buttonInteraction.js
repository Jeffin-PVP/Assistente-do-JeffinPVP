const {
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    ChannelType
} = require("discord.js");

const embedCache = new Map();

module.exports = {

    embedCache,

    async execute(interaction) {

        if (!interaction.isButton())
            return;

        /*
        =========================
            CANCELAR
        =========================
        */

        if (interaction.customId === "embed_cancel") {

            embedCache.delete(interaction.user.id);

            return interaction.update({

                content:
                    "❌ Criação da embed cancelada.",

                embeds: [],

                components: []

            });

        }

        /*
        =========================
            ENVIAR
        =========================
        */

        if (interaction.customId === "embed_send") {

            embedCache.set(

                interaction.user.id,

                interaction.message.embeds[0]

            );

            const menu =

                new ChannelSelectMenuBuilder()

                    .setCustomId("embed_channel")

                    .setPlaceholder(

                        "Escolha um canal..."

                    )

                    .addChannelTypes(

                        ChannelType.GuildText

                    );

            return interaction.update({

                content:

                    "📢 Escolha o canal onde deseja enviar a embed.",

                embeds: interaction.message.embeds,

                components: [

                    new ActionRowBuilder()

                        .addComponents(menu)

                ]

            });

        }

    }

};