const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "unbanMember",

            description: "Remove banimento.",

            category: "Moderation",

            permissions: [
                PermissionFlagsBits.BanMembers
            ],

            parameters: {

                type: "object",

                properties: {

                    userId: {

                        type: "string",

                        description: "ID."

                    },

                    reason: {

                        type: "string",

                        description: "Motivo."

                    }

                },

                required: [
                    "userId"
                ]

            }

        });

    }

    async execute(message, args) {

        try {

            const bans = await message.guild.bans.fetch();

            const ban = bans.get(args.userId);

            if (!ban) {

                return {

                    success: false,

                    message: "Usuário não está banido."

                };

            }

            await message.guild.members.unban(

                args.userId,

                args.reason || "Banimento removido."

            );

            return {

                success: true,

                userId: args.userId,

                username: ban.user.username,

                message: `${ban.user.tag} foi desbanido.`

            };

        } catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};