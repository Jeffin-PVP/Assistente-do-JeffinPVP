const {
    PermissionFlagsBits
} = require("discord.js");

const Tool = require("../../structures/Tool");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "purgeMessages",

            description: "Limpa mensagens.",

            category: "Moderation",

            permissions: [
                PermissionFlagsBits.ManageMessages
            ],

            parameters: {

                type: "object",

                properties: {

                    amount: {

                        type: "integer",

                        description: "Quantidade.",

                        minimum: 1,

                        maximum: 100

                    }

                },

                required: [
                    "amount"
                ]

            }

        });

    }

    async execute(message, args) {

        const amount = Number(args.amount);

        if (isNaN(amount)) {

            return {

                success: false,

                message: "Quantidade inválida."

            };

        }

        if (amount < 1 || amount > 100) {

            return {

                success: false,

                message: "A quantidade deve estar entre 1 e 100."

            };

        }

        if (!message.guild) {

            return {

                success: false,

                message: "Este comando só funciona em servidores."

            };

        }

        if (!message.channel.bulkDelete) {

            return {

                success: false,

                message: "Este canal não suporta limpeza de mensagens."

            };

        }

        try {

            const deleted = await message.channel.bulkDelete(
                amount,
                true
            );

            return {

                success: true,

                deleted: deleted.size,

                message: `${deleted.size} mensagens removidas.`

            };

        } catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};