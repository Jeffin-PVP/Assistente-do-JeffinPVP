const Tool = require("../../structures/Tool");
const database = require("../../database/database");

module.exports = new class extends Tool {

    constructor() {

        super({

            name: "getWarnings",

            description: "Consulta advertências.",

            category: "Moderation",

            parameters: {

                type: "object",

                properties: {

                    userId: {

                        type: "string",

                        description: "ID."

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

            const warnings = database.prepare(`
                SELECT
                    reason,
                    moderatorId,
                    createdAt
                FROM warnings
                WHERE guildId = ?
                AND userId = ?
                ORDER BY createdAt DESC
            `).all(

                message.guild.id,
                args.userId

            );

            return {

                success: true,

                total: warnings.length,

                warnings

            };

        } catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};