class Tool {

    constructor(options) {

        this.name = options.name;

        this.description = options.description;

        this.parameters = options.parameters ?? {
            type: "object",
            properties: {},
            required: []
        };

        this.category = options.category ?? "Geral";

        this.ownerOnly = options.ownerOnly ?? false;

        this.guildOnly = options.guildOnly ?? true;

        this.permissions = options.permissions ?? [];

        this.cooldown = options.cooldown ?? 0;

    }

    async execute(message, args) {

        throw new Error(
            `A ferramenta "${this.name}" não implementou execute().`
        );

    }

}

module.exports = Tool;