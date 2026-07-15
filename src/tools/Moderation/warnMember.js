const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");
const database = require("../../database/database");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "warnMember",

            description: "Aplica uma advertência a um membro.",

            category: "Moderation",

            guildOnly: true,

            permissions: [
                PermissionFlagsBits.ModerateMembers
            ],

            parameters: {

                type: "object",

                properties: {

                    userId: {

                        type: "string",

                        description: "ID do membro."

                    },

                    reason: {

                        type: "string",

                        description: "Motivo da advertência."

                    }

                },

                required: [
                    "userId",
                    "reason"
                ]

            }

        });

    }

    async execute(message, args) {

        const member = await message.guild.members
            .fetch(args.userId)
            .catch(() => null);

        if (!member) {

            return {

                success: false,

                error: "Membro não encontrado."

            };

        }

        if (member.id === message.guild.ownerId) {

            return {

                success: false,

                error: "Não posso advertir o dono do servidor."

            };

        }

        if (member.id === message.client.user.id) {

            return {

                success: false,

                error: "Não posso advertir a mim mesmo."

            };

        }

        if (member.id === message.author.id) {

            return {

                success: false,

                error: "Você não pode advertir a si mesmo."

            };

        }

        if (!member.moderatable) {

            return {

                success: false,

                error: "Não tenho permissão para moderar este membro."

            };

        }

        const warning = {

            guildId: message.guild.id,

            userId: member.id,

            moderatorId: message.author.id,

            moderatorTag: message.author.tag,

            reason: args.reason,

            timestamp: Date.now()

        };

        try {

            await database.addWarning(warning);

            const totalWarnings =
                await database.getWarningCount(
                    message.guild.id,
                    member.id
                );

            return {

                success: true,

                action: "warn",

                target: {

                    id: member.id,

                    username: member.user.username,

                    displayName: member.displayName

                },

                moderator: {

                    id: message.author.id,

                    username: message.author.username

                },

                reason: args.reason,

                warnings: totalWarnings

            };

        } catch (error) {

            return {

                success: false,

                error: error.message

            };

        }

    }

};