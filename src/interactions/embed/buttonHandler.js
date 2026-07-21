const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = {

    async execute(interaction) {

        /*
        =========================
            EDITAR
        =========================
        */

        if (interaction.customId === "embed_edit") {

            const modal = new ModalBuilder()

                .setCustomId("embed_edit_modal")

                .setTitle("Editar Embed");

            const title = new TextInputBuilder()

                .setCustomId("title")

                .setLabel("Título")

                .setStyle(TextInputStyle.Short)

                .setRequired(false)

                .setMaxLength(256);

            const description = new TextInputBuilder()

                .setCustomId("description")

                .setLabel("Descrição")

                .setStyle(TextInputStyle.Paragraph)

                .setRequired(false)

                .setMaxLength(4000);

            const color = new TextInputBuilder()

                .setCustomId("color")

                .setLabel("Cor (#5865F2)")

                .setStyle(TextInputStyle.Short)

                .setRequired(false);

            modal.addComponents(

                new ActionRowBuilder().addComponents(title),

                new ActionRowBuilder().addComponents(description),

                new ActionRowBuilder().addComponents(color)

            );

            return interaction.showModal(modal);

        }

        /*
        =========================
            IMAGENS
        =========================
        */

        if (interaction.customId === "embed_images") {

            const modal = new ModalBuilder()

                .setCustomId("embed_images_modal")

                .setTitle("Imagens");

            const thumbnail = new TextInputBuilder()

                .setCustomId("thumbnail")

                .setLabel("Thumbnail URL")

                .setStyle(TextInputStyle.Short)

                .setRequired(false);

            const image = new TextInputBuilder()

                .setCustomId("image")

                .setLabel("Imagem URL")

                .setStyle(TextInputStyle.Short)

                .setRequired(false);

            modal.addComponents(

                new ActionRowBuilder().addComponents(thumbnail),

                new ActionRowBuilder().addComponents(image)

            );

            return interaction.showModal(modal);

        }

        /*
        =========================
            CANCELAR
        =========================
        */

        if (interaction.customId === "embed_cancel") {

            return interaction.update({

                content: "❌ Editor fechado.",

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

            const EmbedSessionManager =
                require("./EmbedSessionManager");

            const EmbedPreview =
                require("./EmbedPreview");

            const session =
                EmbedSessionManager.get(

                    interaction.user.id

                );

            if (!session) {

                return interaction.reply({

                    content:

                        "❌ Sessão não encontrada.",

                    ephemeral: true

                });

            }

            if (!session.channelId) {

                return interaction.reply({

                    content:

                        "⚠ Primeiro escolha um canal.",

                    ephemeral: true

                });

            }

            const channel =

                interaction.guild.channels.cache.get(

                    session.channelId

                );

            if (!channel) {

                return interaction.reply({

                    content:

                        "❌ Canal inválido.",

                    ephemeral: true

                });

            }

            await channel.send({

                embeds: [

                    EmbedPreview.build(session)

                ]

            });

            EmbedSessionManager.delete(

                interaction.user.id

            );

            return interaction.update({

                content:

                    "✅ Embed enviada com sucesso!",

                embeds: [],

                components: []

            });

        }

    }

};