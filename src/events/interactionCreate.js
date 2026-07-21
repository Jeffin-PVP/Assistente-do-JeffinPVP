const {
    Events
} = require("discord.js");

const CommandManager =
    require("../managers/CommandManager");

const modalSubmit =
    require("../interactions/modalSubmit");

const embedButtons =
    require("../interactions/embed/buttonHandler");

const buttonInteraction =
    require("../interactions/buttonInteraction");

const channelSelectInteraction =
    require("../interactions/channelSelectInteraction");

const embedModals =
    require("../interactions/embed/modalHandler");

module.exports = {

    name: Events.InteractionCreate,

    async execute(interaction) {

        try {

            /*
            =========================
                MODAIS
            =========================
            */

            if (interaction.isModalSubmit()) {

                if (

                    interaction.customId.startsWith("embed_")

                ) {

                    return embedModals.execute(
                        interaction
                    );

                }

                return modalSubmit.execute(
                    interaction
                );

            }

            /*
            =========================
                BOTÕES
            =========================
            */

            if (interaction.isButton()) {

                return await buttonInteraction.execute(
                    interaction
                );

            }

            /*
            =========================
                CHANNEL SELECT MENU
            =========================
            */

            if (interaction.isChannelSelectMenu()) {

                return await channelSelectInteraction.execute(
                    interaction
                );

            }

            /*
            =========================
                BOTÕES
            =========================
            */

            if (interaction.isButton()) {

                return embedButtons.execute(interaction);

            }

            /*
            =========================
                COMANDOS SLASH
            =========================
            */

            if (!interaction.isChatInputCommand()) {

                return;

            }

            await CommandManager.execute(
                interaction
            );

        } catch (error) {

            console.error(

                "Erro na interação:",

                error

            );

            const payload = {

                content:
                    "❌ Ocorreu um erro ao processar a interação.",

                ephemeral: true

            };

            try {

                if (

                    interaction.replied ||

                    interaction.deferred

                ) {

                    await interaction.followUp(
                        payload
                    );

                } else {

                    await interaction.reply(
                        payload
                    );

                }

            } catch { }

        }

        console.log("1 - InteractionCreate:", interaction.id);

        if (interaction.isModalSubmit()) {

            console.log("2 - Modal");

            return await modalSubmit.execute(interaction);

        }

        if (interaction.isButton()) {

            console.log("3 - Botão");

            return await buttonInteraction.execute(interaction);

        }

        if (interaction.isChannelSelectMenu()) {

            console.log("4 - SelectMenu");

            return await channelSelectInteraction.execute(interaction);

        }

        console.log("5 - Slash Command");

        if (!interaction.isChatInputCommand())
            return;

        console.log("6 - Executando comando");

        await CommandManager.execute(interaction);

        console.log("7 - Finalizado");

    }

};