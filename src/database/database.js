const fs = require("fs");
const path = require("path");

class Database {

    constructor() {

        this.file = path.join(__dirname, "database.json");

        if (!fs.existsSync(this.file)) {

            fs.writeFileSync(
                this.file,
                JSON.stringify({
                    guilds: {},
                    warnings: [],
                    memories: [],
                    economy: {}
                }, null, 4)
            );

        }

    }

    // ============================
    // Base
    // ============================

    read() {

        return JSON.parse(
            fs.readFileSync(this.file, "utf8")
        );

    }

    save(data) {

        fs.writeFileSync(
            this.file,
            JSON.stringify(data, null, 4)
        );

    }

    // ============================
    // Guild
    // ============================

    getGuild(guildId) {

        const data = this.read();

        if (!data.guilds[guildId]) {

            data.guilds[guildId] = {};

            this.save(data);

        }

        return data.guilds[guildId];

    }

    setGuild(guildId, guildData) {

        const data = this.read();

        data.guilds[guildId] = guildData;

        this.save(data);

    }

    // ============================
    // Configurações
    // ============================

    setGuildConfig(guildId, key, value) {

        const data = this.read();

        if (!data.guilds[guildId]) {

            data.guilds[guildId] = {};

        }

        data.guilds[guildId][key] = value;

        this.save(data);

    }

    getGuildConfig(guildId, key) {

        const data = this.read();

        if (!data.guilds[guildId]) {

            return null;

        }

        return data.guilds[guildId][key] ?? null;

    }

    // ============================
    // Logs
    // ============================

    setLogsChannel(guildId, channelId) {

        this.setGuildConfig(
            guildId,
            "logsChannel",
            channelId
        );

    }

    getLogsChannel(guildId) {

        return this.getGuildConfig(
            guildId,
            "logsChannel"
        );

    }

    // ============================
    // Advertências
    // ============================

    addWarning({

        guildId,

        userId,

        moderatorId,

        moderatorTag,

        reason

    }) {

        const data = this.read();

        const id =
            data.warnings.length > 0
                ? data.warnings[data.warnings.length - 1].id + 1
                : 1;

        const warning = {

            id,

            guildId,

            userId,

            moderatorId,

            moderatorTag,

            reason,

            createdAt: Date.now()

        };

        data.warnings.push(warning);

        this.save(data);

        return warning;

    }

    getWarnings(guildId, userId) {

        const data = this.read();

        return data.warnings.filter(warning =>

            warning.guildId === guildId &&
            warning.userId === userId

        );

    }

    getWarning(guildId, warningId) {

        const data = this.read();

        return data.warnings.find(warning =>

            warning.guildId === guildId &&
            warning.id === Number(warningId)

        ) ?? null;

    }

    getWarningCount(guildId, userId) {

        return this.getWarnings(
            guildId,
            userId
        ).length;

    }

    removeWarning(guildId, warningId) {

        const data = this.read();

        const index = data.warnings.findIndex(warning =>

            warning.guildId === guildId &&
            warning.id === Number(warningId)

        );

        if (index === -1) {

            return false;

        }

        data.warnings.splice(index, 1);

        this.save(data);

        return true;

    }

    clearWarnings(guildId, userId) {

        const data = this.read();

        const before = data.warnings.length;

        data.warnings = data.warnings.filter(warning =>

            !(warning.guildId === guildId &&
              warning.userId === userId)

        );

        this.save(data);

        return before - data.warnings.length;

    }

    // ============================
    // Memórias
    // ============================

    addMemory(memory) {

        const data = this.read();

        data.memories.push({

            id: Date.now(),

            ...memory

        });

        this.save(data);

    }

    getMemories() {

        return this.read().memories;

    }

    removeMemory(id) {

        const data = this.read();

        data.memories = data.memories.filter(memory =>

            memory.id !== id

        );

        this.save(data);

    }

    // ============================
    // Economia
    // ============================

    getBalance(userId) {

        const data = this.read();

        return data.economy[userId] ?? 0;

    }

    setBalance(userId, amount) {

        const data = this.read();

        data.economy[userId] = amount;

        this.save(data);

    }

    addMoney(userId, amount) {

        const balance = this.getBalance(userId);

        this.setBalance(

            userId,

            balance + amount

        );

    }

    removeMoney(userId, amount) {

        const balance = this.getBalance(userId);

        this.setBalance(

            userId,

            Math.max(0, balance - amount)

        );

    }

}

module.exports = new Database();