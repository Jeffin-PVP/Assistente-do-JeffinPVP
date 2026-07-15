const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "slowmodeChannel",

            description: "Altera slowmode.",

            category: "Moderation",

            permissions: [
                PermissionFlagsBits.ManageChannels
            ],

            parameters: {

                type: "object",

                properties: {

                    time: {

                        type: "integer",

                        description: "Tempo.",

                        minimum: 0

                    },

                    unit: {

                        type: "string",

                        description: "Unidade.",

                        enum: [
                            "seconds",
                            "minutes",
                            "hours"
                        ]

                    },

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

                required: [
                    "time"
                ]

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

        if (!channel.setRateLimitPerUser) {

            return {

                success: false,

                message: "Este canal não suporta slowmode."

            };

        }

        const time = Number(args.time);

        if (Number.isNaN(time) || time < 0) {

            return {

                success: false,

                message: "Tempo inválido."

            };

        }

        let seconds = time;

        switch (args.unit) {

            case "hours":

                seconds = time * 3600;

                break;

            case "minutes":

                seconds = time * 60;

                break;

            case "seconds":

            default:

                seconds = time;

        }

        if (seconds > 21600) {

            return {

                success: false,

                message: "O Discord permite no máximo 6 horas."

            };

        }

        try {

            await channel.setRateLimitPerUser(

                seconds,

                args.reason || "Slowmode alterado."

            );

            return {

                success: true,

                seconds,

                channelId: channel.id,

                channelName: channel.name,

                message:

                    seconds === 0

                        ? `Slowmode removido de #${channel.name}.`

                        : `Slowmode alterado para ${seconds} segundos em #${channel.name}.`

            };

        } catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};