const LogTypes = require("../LogTypes");

const ModerationLogs = require("./ModerationLogs");
const EconomyLogs = require("./EconomyLogs");
const GameLogs = require("./GameLogs");
const MemberLogs = require("./MemberLogs");
const ChannelLogs = require("./ChannelLogs");
const RoleLogs = require("./RoleLogs");
const MessageLogs = require("./MessageLogs");
const VoiceLogs = require("./VoiceLogs");
const TicketLogs = require("./TicketLogs");
const AILogs = require("./AILogs");
const SystemLogs = require("./SystemLogs");


module.exports.create = function (data) {


    switch (data.type) {


        /*
        =========================
            MODERAÇÃO
        =========================
        */


        case LogTypes.BAN:

        case LogTypes.UNBAN_MEMBER:

        case LogTypes.KICK:

        case LogTypes.WARN:

        case LogTypes.REMOVE_WARN:

        case LogTypes.TIMEOUT:

        case LogTypes.REMOVE_TIMEOUT:

        case LogTypes.PURGE_MESSAGES:

        case LogTypes.LOCK_CHANNEL:

        case LogTypes.UNLOCK_CHANNEL:

        case LogTypes.SLOWMODE_CHANNEL:


            return ModerationLogs.create(data);




        /*
        =========================
            ECONOMIA
        =========================
        */


        case LogTypes.DAILY:

        case LogTypes.WORK:

        case LogTypes.CRIME:

        case LogTypes.ROB:

        case LogTypes.DEPOSIT:

        case LogTypes.WITHDRAW:

        case LogTypes.TRANSFER:

        case LogTypes.BUY:

        case LogTypes.SELL:

        case LogTypes.MONEY_ADD:

        case LogTypes.MONEY_REMOVE:


            return EconomyLogs.create(data);




        /*
        =========================
            JOGOS
        =========================
        */


        case LogTypes.SLOTS:

        case LogTypes.BLACKJACK:

        case LogTypes.COINFLIP:

        case LogTypes.ROULETTE:


            return GameLogs.create(data);




        /*
        =========================
            MEMBROS
        =========================
        */


        case LogTypes.MEMBER_JOIN:

        case LogTypes.MEMBER_LEAVE:

        case LogTypes.MEMBER_BOOST:

        case LogTypes.MEMBER_UNBOOST:

        case LogTypes.MEMBER_NICKNAME:


            return MemberLogs.create(data);




        /*
        =========================
            CANAIS
        =========================
        */


        case LogTypes.CHANNEL_CREATE:

        case LogTypes.CHANNEL_DELETE:

        case LogTypes.CHANNEL_UPDATE:


            return ChannelLogs.create(data);




        /*
        =========================
            CARGOS
        =========================
        */


        case LogTypes.ROLE_CREATE:

        case LogTypes.ROLE_DELETE:

        case LogTypes.ROLE_UPDATE:

        case LogTypes.ROLE_ADD:

        case LogTypes.ROLE_REMOVE:


            return RoleLogs.create(data);




        /*
        =========================
            MENSAGENS
        =========================
        */


        case LogTypes.MESSAGE_DELETE:

        case LogTypes.MESSAGE_EDIT:

        case LogTypes.MESSAGE_BULK_DELETE:


            return MessageLogs.create(data);




        /*
        =========================
            VOZ
        =========================
        */


        case LogTypes.VOICE_JOIN:

        case LogTypes.VOICE_LEAVE:

        case LogTypes.VOICE_MOVE:


            return VoiceLogs.create(data);




        /*
        =========================
            TICKETS
        =========================
        */


        case LogTypes.TICKET_CREATE:

        case LogTypes.TICKET_CLOSE:

        case LogTypes.TICKET_REOPEN:

        case LogTypes.TICKET_DELETE:


            return TicketLogs.create(data);




        /*
        =========================
            IA
        =========================
        */


        case LogTypes.AI_COMMAND:

        case LogTypes.AI_TOOL:

        case LogTypes.AI_ERROR:


            return AILogs.create(data);




        /*
        =========================
            SISTEMA
        =========================
        */


        case LogTypes.BOT_START:

        case LogTypes.BOT_STOP:

        case LogTypes.DATABASE_ERROR:


            return SystemLogs.create(data);




        default:


            console.warn(
                "[Logs] Tipo desconhecido:",
                data.type
            );


            return null;


    }


};