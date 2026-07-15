const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "banMember",

            description: "Bane um membro do servidor.",

            category: "Moderation",

            guildOnly: true,

            permissions: [
                PermissionFlagsBits.BanMembers
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

                        description: "Motivo do banimento."

                    },

                    deleteMessageSeconds: {

                        type: "integer",

                        description: "Segundos de mensagens para apagar (0 a 604800)."

                    }

                },

                required: [
                    "userId"
                ]

            }

        });

    }

    async execute(message, args) {

        const reason =
            args.reason ?? "Nenhum motivo informado.";

        const deleteMessageSeconds =
            Math.max(
                0,
                Math.min(
                    Number(args.deleteMessageSeconds ?? 0),
                    604800
                )
            );

        // Busca o membro

        const member =
            await message.guild.members
                .fetch(args.userId)
                .catch(() => null);

        if (!member) {

            return {

                success: false,

                error: "Membro não encontrado."

            };

        }

        // Não permitir banir o dono

        if (member.id === message.guild.ownerId) {

            return {

                success: false,

                error: "Não posso banir o dono do servidor."

            };

        }

        // Não permitir banir o próprio bot

        if (member.id === message.client.user.id) {

            return {

                success: false,

                error: "Não posso banir a mim mesmo."

            };

        }

        // Não permitir banir quem executou

        if (member.id === message.author.id) {

            return {

                success: false,

                error: "Você não pode banir a si mesmo."

            };

        }

        // Hierarquia

        if (!member.bannable) {

            return {

                success: false,

                error: "Não tenho permissão para banir este membro."

            };

        }

        try {

            await member.ban({

                reason,

                deleteMessageSeconds

            });

            return {

                success: true,

                action: "ban",

                target: {

                    id: member.id,

                    username: member.user.username,

                    displayName: member.displayName

                },

                moderator: {

                    id: message.author.id,

                    username: message.author.username

                },

                reason,

                deleteMessageSeconds

            };

        } catch (error) {

            return {

                success: false,

                error: error.message

            };

        }

    }

};