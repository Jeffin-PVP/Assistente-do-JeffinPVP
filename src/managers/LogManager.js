const database = require("../database/database");

const Builders = require("./logs");

class LogManager {

    static async send(data) {

        try {

            const config = database.prepare(`
                SELECT logsChannel
                FROM guilds
                WHERE guildId = ?
            `).get(data.guild.id);

            if (!config?.logsChannel)
                return false;

            const channel = await data.guild.channels.fetch(
                config.logsChannel
            ).catch(() => null);

            if (!channel)
                return false;

            const embed = Builders.create(data);

            if (!embed)
                return false;

            await channel.send({

                embeds: [embed]

            });

            return true;

        } catch (err) {

            console.error("[LogManager]", err);

            return false;

        }

    }

}

module.exports = LogManager;