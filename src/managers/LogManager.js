const database = require("../database/database");

const Builders = require("./logs");


class LogManager {


    static async send(data) {


        try {


            if (!data.guild) {

                console.error(
                    "[LogManager] Guild não informado."
                );

                return false;

            }



            // Busca configuração do servidor

            const config =
                await database.get(`

                    SELECT
                        log_channel

                    FROM guild_settings

                    WHERE guild_id = ?

                `, [

                    data.guild.id

                ]);



            if (!config?.log_channel) {


                console.log(
                    "[LogManager] Canal de logs não configurado para:",
                    data.guild.id
                );


                return false;


            }



            // Busca canal

            const channel =
                await data.guild.channels.fetch(
                    config.log_channel
                )
                .catch(() => null);



            if (!channel) {


                console.log(
                    "[LogManager] Canal de logs não encontrado."
                );


                return false;


            }



            // Cria embed

            const embed =
                Builders.create(data);



            if (!embed) {


                console.log(
                    "[LogManager] Falha ao criar embed:",
                    data.type
                );


                return false;


            }



            await channel.send({

                embeds: [

                    embed

                ]

            });



            console.log(

                "📋 Log enviado:",

                data.type

            );



            return true;



        } catch (error) {


            console.error(

                "❌ [LogManager]",

                error

            );


            return false;


        }


    }


}


module.exports = LogManager;