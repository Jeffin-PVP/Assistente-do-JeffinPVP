const groq = require("./groq");
const systemPrompt = require("./systemPrompt");
const ToolManager = require("./ToolManager");
const toolSchema = require("../tools/schema");

class AIManager {

    static async chat({ message, question, context }) {

        // Histórico da conversa
        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: `
=== CONTEXTO ===

Servidor:
- Nome: ${context.server.name}
- Descrição: ${context.server.description}
- Total de membros: ${context.server.memberCount}

Canal:
- Nome: #${context.channel.name}

Usuário:
- Nome: ${context.author.username}
- Apelido: ${context.author.displayName}
- Cargos: ${
                    context.author.roles.length
                        ? context.author.roles.join(", ")
                        : "Nenhum"
                }

=== PERGUNTA ===

${question}
`
            }
        ];

        // Primeira chamada para a IA
        const firstResponse = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages,

            tools: toolSchema,

            tool_choice: "auto",

            temperature: 0.7

        });

        const assistantMessage = firstResponse.choices[0].message;

        // A IA respondeu normalmente
        if (!assistantMessage.tool_calls) {

            return assistantMessage.content;

        }

        // Adiciona a resposta da IA ao histórico
        messages.push(assistantMessage);

        // Executa todas as ferramentas solicitadas
        for (const toolCall of assistantMessage.tool_calls) {

            const toolName = toolCall.function.name;

            let args = {};

            try {

                args = JSON.parse(toolCall.function.arguments || "{}");

            } catch {

                args = {};

            }

            const result = await ToolManager.execute(

                toolName,

                message,

                args

            );

            messages.push({

                role: "tool",

                tool_call_id: toolCall.id,

                content: JSON.stringify(result)

            });

        }

        // Segunda chamada (agora com o resultado das ferramentas)
        const secondResponse = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages,

            temperature: 0.7

        });

        return secondResponse.choices[0].message.content;

    }

}

module.exports = AIManager;