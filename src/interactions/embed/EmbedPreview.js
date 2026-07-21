const {

    EmbedBuilder

} = require("discord.js");

class EmbedPreview {

    static build(session) {

        const embed =

            new EmbedBuilder()

                .setColor(

                    session.color ||

                    "#5865F2"

                );

        embed.setTitle(

            session.title ||

            "Nova Embed"

        );

        embed.setDescription(

            session.description ||

            "Clique em **Editar** para começar."

        );

        if (

            session.thumbnail

        ) {

            embed.setThumbnail(

                session.thumbnail

            );

        }

        if (

            session.image

        ) {

            embed.setImage(

                session.image

            );

        }

        if (

            session.author.name

        ) {

            embed.setAuthor({

                name:

                    session.author.name,

                iconURL:

                    session.author.iconURL ||

                    null,

                url:

                    session.author.url ||

                    null

            });

        }

        if (

            session.footer.text

        ) {

            embed.setFooter({

                text:

                    session.footer.text,

                iconURL:

                    session.footer.iconURL ||

                    null

            });

        }

        if (

            session.timestamp

        ) {

            embed.setTimestamp();

        }

        if (

            session.fields.length

        ) {

            embed.addFields(

                session.fields

            );

        }

        return embed;

    }

}

module.exports = EmbedPreview;