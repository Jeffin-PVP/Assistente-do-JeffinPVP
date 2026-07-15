const {

    EmbedBuilder

} = require("discord.js");

const database = require("../database/database");
const LogTypes = require("./LogTypes");

class LogManager {

    static async send(data) {

        try {

            const config = database.prepare(`
                SELECT logsChannel
                FROM guilds
                WHERE guildId = ?
            `).get(data.guild.id);

            if (!config?.logsChannel) return;

            const channel = await data.guild.channels.fetch(config.logsChannel)
                .catch(() => null);

            if (!channel) return;

            const embed = this.createEmbed(data);

            if (!embed) return;

            await channel.send({

                embeds: [embed]

            });

        } catch (err) {

            console.error("[LogManager]", err);

        }

    }

    static createEmbed(data) {

        const embed = new EmbedBuilder()

            .setTimestamp()

            .setFooter({

                text: `Servidor: ${data.guild.name}`

            });

        switch (data.type) {

            case LogTypes.BAN:

                embed

                    .setColor("#ff3b30")

                    .setTitle("🔨 Banimento")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`,

                            inline: true

                        },

                        {

                            name: "Usuário",

                            value: `${data.target.user.tag}`,

                            inline: true

                        },

                        {

                            name: "Motivo",

                            value: data.reason || "Não informado"

                        }

                    );

                break;

            case LogTypes.UNBAN:

                embed

                    .setColor("#34c759")

                    .setTitle("♻ Desbanimento")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`,

                            inline: true

                        },

                        {

                            name: "Usuário",

                            value: data.username,

                            inline: true

                        },

                        {

                            name: "Motivo",

                            value: data.reason || "Não informado"

                        }

                    );

                break;

            case LogTypes.KICK:

                embed

                    .setColor("#ff9500")

                    .setTitle("👢 Expulsão")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`,

                            inline: true

                        },

                        {

                            name: "Usuário",

                            value: `${data.target.user.tag}`,

                            inline: true

                        },

                        {

                            name: "Motivo",

                            value: data.reason || "Não informado"

                        }

                    );

                break;

            case LogTypes.TIMEOUT:

                embed

                    .setColor("#ffcc00")

                    .setTitle("🔇 Timeout")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`,

                            inline: true

                        },

                        {

                            name: "Usuário",

                            value: `${data.target.user.tag}`,

                            inline: true

                        },

                        {

                            name: "Tempo",

                            value: data.duration,

                            inline: true

                        },

                        {

                            name: "Motivo",

                            value: data.reason || "Não informado"

                        }

                    );

                break;

            case LogTypes.REMOVE_TIMEOUT:

                embed

                    .setColor("#30d158")

                    .setTitle("🔊 Timeout removido")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`,

                            inline: true

                        },

                        {

                            name: "Usuário",

                            value: `${data.target.user.tag}`,

                            inline: true

                        }

                    );

                break;

            case LogTypes.WARN:

                embed

                    .setColor("#ffd60a")

                    .setTitle("⚠ Advertência")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`,

                            inline: true

                        },

                        {

                            name: "Usuário",

                            value: `${data.target.user.tag}`,

                            inline: true

                        },

                        {

                            name: "Motivo",

                            value: data.reason || "Não informado"

                        }

                    );

                break;

            case LogTypes.PURGE:

                embed

                    .setColor("#5ac8fa")

                    .setTitle("🧹 Limpeza")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`

                        },

                        {

                            name: "Canal",

                            value: `${data.channel}`

                        },

                        {

                            name: "Mensagens",

                            value: `${data.amount}`

                        }

                    );

                break;

            case LogTypes.LOCK:

                embed

                    .setColor("#8e8e93")

                    .setTitle("🔒 Canal trancado")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`

                        },

                        {

                            name: "Canal",

                            value: `${data.channel}`

                        }

                    );

                break;

            case LogTypes.UNLOCK:

                embed

                    .setColor("#32d74b")

                    .setTitle("🔓 Canal destrancado")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`

                        },

                        {

                            name: "Canal",

                            value: `${data.channel}`

                        }

                    );

                break;

            case LogTypes.SLOWMODE:

                embed

                    .setColor("#64d2ff")

                    .setTitle("🐢 Slowmode alterado")

                    .addFields(

                        {

                            name: "Executor",

                            value: `${data.executor}`

                        },

                        {

                            name: "Canal",

                            value: `${data.channel}`

                        },

                        {

                            name: "Tempo",

                            value: data.time

                        }

                    );

                break;

            default:

                return null;

        }

        return embed;

    }

}

module.exports = LogManager;