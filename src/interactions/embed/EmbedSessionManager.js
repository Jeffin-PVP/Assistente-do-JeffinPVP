class EmbedSessionManager {

    static sessions = new Map();

    static create(userId) {

        const session = {

            title: "",
            description: "",
            color: "#5865F2",

            author: {
                name: "",
                iconURL: "",
                url: ""
            },

            footer: {
                text: "",
                iconURL: ""
            },

            thumbnail: "",
            image: "",

            timestamp: false,

            fields: [],

            channelId: null,

        };

        this.sessions.set(userId, session);

        return session;

    }

    static get(userId) {

        return this.sessions.get(userId);

    }

    static has(userId) {

        return this.sessions.has(userId);

    }

    static delete(userId) {

        this.sessions.delete(userId);

    }

}
module.exports = EmbedSessionManager;