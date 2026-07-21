const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const EmbedSessionManager =
    require("../../interactions/embed/EmbedSessionManager");

const EmbedPreview =
    require("../../interactions/embed/EmbedPreview");

const EmbedButtons =
    require("../../interactions/embed/EmbedButtons");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("embed")

        .setDescription(
            "Criar uma embed personalizada."
        )

        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageMessages
        ),

    async execute(interaction) {

        /*
        =========================
            CRIA A SESSÃO
        =========================
        */

        const session =
            EmbedSessionManager.create(
                interaction.user.id
            );

        /*
        =========================
            EMBED PADRÃO
        =========================
        */

        session.title =
            "Nova Embed";

        session.description =
            "Clique em **📝 Editar** para começar a montar sua embed.";

        session.color =
            "#5865F2";

        /*
        =========================
            PAINEL
        =========================
        */

        await interaction.reply({

            embeds: [

                EmbedPreview.build(session)

            ],

            components:

                EmbedButtons.build(),

            flags: [

                "Ephemeral"

            ]

        });

    }

};