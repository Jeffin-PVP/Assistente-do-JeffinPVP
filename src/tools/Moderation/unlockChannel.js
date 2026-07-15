const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "unlockChannel",

            description: "Destranca canal.",

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

                    channelName: {

                        type: "string",

                        description: "Nome."

                    },

                    reason: {

                        type: "string",

                        description: "Motivo."

                    }

                },

                required: []

            }

        });

    }

    async execute(message, args) {

        let channel = null;

        if (args.channelId) {

            channel = message.guild.channels.cache.get(args.channelId);

        }

        if (!channel && args.channelName) {

            channel = message.guild.channels.cache.find(c =>
                c.name.toLowerCase() === args.channelName.toLowerCase()
            );

        }

        if (!channel) {

            channel = message.channel;

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

                    SendMessages: null

                },

                {

                    reason: args.reason || "Canal destrancado."

                }

            );

            return {

                success: true,

                channelId: channel.id,

                channelName: channel.name,

                message: `Canal #${channel.name} destrancado.`

            };

        } catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};