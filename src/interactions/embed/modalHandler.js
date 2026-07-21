const EmbedSessionManager =
    require("./EmbedSessionManager");

const EmbedPreview =
    require("./EmbedPreview");

const EmbedButtons =
    require("./EmbedButtons");

module.exports = {

    async execute(interaction) {

        const session =
            EmbedSessionManager.get(
                interaction.user.id
            );

        if (!session) {

            return interaction.reply({

                content:
                    "❌ Sua sessão expirou. Execute **/embed** novamente.",

                flags: [

                    "Ephemeral"

                ]

            });

        }

        /*
        =====================================
            EDITAR EMBED
        =====================================
        */

        if (

            interaction.customId ===

            "embed_edit_modal"

        ) {

            session.title =
                interaction.fields.getTextInputValue("title");

            session.description =
                interaction.fields.getTextInputValue("description");

            const color =
                interaction.fields.getTextInputValue("color");

            if (color)

                session.color = color;

        }

        /*
        =====================================
            IMAGENS
        =====================================
        */

        if (

            interaction.customId ===

            "embed_images_modal"

        ) {

            session.thumbnail =
                interaction.fields.getTextInputValue("thumbnail");

            session.image =
                interaction.fields.getTextInputValue("image");

        }

        /*
        =====================================
            ATUALIZA O PAINEL
        =====================================
        */

        return interaction.update({

            embeds: [

                EmbedPreview.build(session)

            ],

            components:

                EmbedButtons.build()

        });

    }

};