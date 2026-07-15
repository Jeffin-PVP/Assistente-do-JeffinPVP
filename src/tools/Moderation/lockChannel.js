const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "lockChannel",

            description: "Tranca canal.",

            category: "Moderation",

            permissions: [
                PermissionFlagsBits.ManageChannels
            ],

            parameters: {

                type: "object",

                properties: {

                    channelId: {

                        type: "string",

                        description: "Canal."

                    },

                    reason: {

                        type: "string",

                        description: "Motivo."

                    }

                },

                required: [
                    "channelId"
                ]

            }

        });

    }

    async execute(message, args) {

        const channel = message.guild.channels.cache.get(args.channelId);

        if (!channel) {

            return {

                success: false,

                message: "Canal não encontrado."

            };

        }

        if (!channel.permissionOverwrites) {

            return {

                success: false,

                message: "Este canal não suporta permissões."

            };

        }

        try {

            await channel.permissionOverwrites.edit(

                message.guild.roles.everyone,

                {

                    SendMessages: false

                },

                {

                    reason: args.reason || "Canal trancado."

                }

            );

            return {

                success: true,

                channelId: channel.id,

                channelName: channel.name,

                message: `Canal #${channel.name} trancado.`

            };

        } catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};