const {

    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelSelectMenuBuilder,
    ChannelType

} = require("discord.js");

class EmbedButtons {

    static build() {

        return [

            new ActionRowBuilder()

                .addComponents(

                    new ButtonBuilder()

                        .setCustomId("embed_edit")

                        .setLabel("📝 Editar")

                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()

                        .setCustomId("embed_images")

                        .setLabel("🖼️ Imagens")

                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()

                        .setCustomId("embed_cancel")

                        .setLabel("❌ Cancelar")

                        .setStyle(ButtonStyle.Danger)

                ),

            new ActionRowBuilder()

                .addComponents(

                    new ChannelSelectMenuBuilder()

                        .setCustomId("embed_channel")

                        .setPlaceholder("📍 Escolha um canal")

                        .addChannelTypes(

                            ChannelType.GuildText

                        )

                ),

            new ActionRowBuilder()

                .addComponents(

                    new ButtonBuilder()

                        .setCustomId("embed_send")

                        .setLabel("📤 Enviar")

                        .setStyle(ButtonStyle.Success)

                )

        ];

    }

}

module.exports = EmbedButtons;