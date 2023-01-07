#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {printError, printHelp, printSuccess} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

async function saveToken(token) {
    if (!token.length) {
        printError('Не передан token');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
}

async function getForCast() {
    try {
        const weather = await getWeather(process.env.CITY);
        console.log(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }

}
const initCLI = async () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp()
    }
    if (args.s) {
        // save city
    }
    if (args.t) {
        return saveToken(args.t);
    }
    await getForCast();
}

initCLI();