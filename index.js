require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require("discord.js");


const app = express();


const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ],


    partials: [

        Partials.Channel,

        Partials.Message,

        Partials.User

    ]

});



// ===============================
// COMMANDS
// ===============================

client.commands = new Collection();



const commandsPath = path.join(
    __dirname,
    "src",
    "commands"
);



function loadCommands(dir) {


    if (!fs.existsSync(dir)) {
        return;
    }



    const files = fs.readdirSync(dir);



    for (const file of files) {


        const filePath = path.join(
            dir,
            file
        );



        const stat = fs.statSync(filePath);



        if (stat.isDirectory()) {


            loadCommands(filePath);


            continue;

        }



        if (!file.endsWith(".js")) {
            continue;
        }



        const command = require(filePath);



        if (!command.data || !command.execute) {


            console.warn(
                `⚠ Comando inválido: ${file}`
            );


            continue;

        }



        client.commands.set(

            command.data.name,

            command

        );



        console.log(
            `✔ Comando carregado: ${command.data.name}`
        );


    }


}



loadCommands(commandsPath);





// ===============================
// EXPRESS
// ===============================

const PORT =
    process.env.PORT || 3000;



app.get("/", (req, res) => {


    res.status(200).json({

        status: "online",

        bot:
            client.user
                ? client.user.tag
                : "Inicializando...",


        uptime:
            process.uptime(),


        guilds:
            client.guilds.cache.size,


        users:
            client.guilds.cache.reduce(
                (acc, guild) =>
                    acc + guild.memberCount,
                0
            ),


        ping:
            client.ws.ping


    });


});



app.get("/status", (req, res) => {


    res.json({

        online:
            client.isReady(),


        ping:
            client.ws.ping,


        memory:
            process.memoryUsage(),


        uptime:
            process.uptime(),


        node:
            process.version


    });


});



app.listen(PORT, () => {


    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );


    console.log(
        "🌐 Express iniciado"
    );


    console.log(
        `📡 Porta: ${PORT}`
    );


    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );


});





// ===============================
// EVENTS
// ===============================

const eventsPath = path.join(
    __dirname,
    "src",
    "events"
);



if (fs.existsSync(eventsPath)) {


    const eventFiles =
        fs.readdirSync(eventsPath)
        .filter(file =>
            file.endsWith(".js")
        );



    for (const file of eventFiles) {


        const event =
            require(
                path.join(
                    eventsPath,
                    file
                )
            );



        client.on(
            event.name,
            (...args) =>
                event.execute(...args)
        );



        console.log(
            `✔ Evento carregado: ${event.name}`
        );


    }


}






// ===============================
// READY
// ===============================

client.once("ready", () => {


    console.clear();



    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );


    console.log(
        "🤖 JeffinPVP_Bot"
    );


    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );


    console.log(
        `👤 Logado como: ${client.user.tag}`
    );


    console.log(
        `🆔 ID: ${client.user.id}`
    );


    console.log(
        `🌍 Servidores: ${client.guilds.cache.size}`
    );


    console.log(
        `📶 Ping: ${client.ws.ping}ms`
    );


    console.log(
        "🟢 IA: Conectada"
    );


    console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );


});





client.login(
    process.env.TOKEN
);
//anotação desnecessária