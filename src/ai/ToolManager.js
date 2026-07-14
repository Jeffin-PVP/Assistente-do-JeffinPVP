const tools = require("../tools");

class ToolManager {

    /**
     * Executa uma ferramenta.
     * @param {string} toolName
     * @param {import("discord.js").Message} message
     * @param {Object} args
     * @returns {Promise<any>}
     */
    static async execute(toolName, message, args = {}) {

        const tool = tools[toolName];

        if (!tool) {
            throw new Error(`Ferramenta "${toolName}" não encontrada.`);
        }

        // Apenas em servidores
        if (tool.guildOnly && !message.guild) {
            throw new Error("Esta ferramenta só pode ser utilizada em servidores.");
        }

        // Apenas dono do bot
        if (tool.ownerOnly) {

            const ownerId = process.env.OWNER_ID;

            if (!ownerId) {
                throw new Error("OWNER_ID não configurado no .env.");
            }

            if (message.author.id !== ownerId) {
                throw new Error("Você não possui permissão para utilizar esta ferramenta.");
            }

        }

        // Verifica permissões do membro
        if (tool.permissions.length > 0) {

            const missing = tool.permissions.filter(permission =>
                !message.member.permissions.has(permission)
            );

            if (missing.length > 0) {

                throw new Error(
                    `Permissões necessárias: ${missing.join(", ")}`
                );

            }

        }

        try {

            return await tool.execute(message, args);

        } catch (error) {

            console.error(
                `[ToolManager] Erro em ${tool.name}:`,
                error
            );

            return {

                success: false,

                error: error.message

            };

        }

    }

    /**
     * Retorna todas as ferramentas carregadas.
     */
    static getTools() {

        return Object.values(tools);

    }

    /**
     * Lista apenas os nomes.
     */
    static getNames() {

        return Object.keys(tools);

    }

    /**
     * Verifica se existe.
     */
    static has(toolName) {

        return Object.prototype.hasOwnProperty.call(
            tools,
            toolName
        );

    }

}

module.exports = ToolManager;