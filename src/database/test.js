const database = require("./database");


async function test() {

    console.log("🧪 Iniciando teste do banco...");


    // Inserir usuário de teste

    await database.run(`

        INSERT OR IGNORE INTO users
        (
            user_id,
            guild_id,
            coins
        )

        VALUES
        (
            ?,
            ?,
            ?
        )

    `, [

        "123456789",

        "987654321",

        100

    ]);



    console.log("✅ Usuário criado");


    // Buscar usuário

    const user = await database.get(`

        SELECT *

        FROM users

        WHERE user_id = ?

    `, [

        "123456789"

    ]);



    console.log("📄 Dados encontrados:");

    console.log(user);



    console.log("✅ Teste finalizado");


    process.exit();

}


test();