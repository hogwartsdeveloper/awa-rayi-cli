#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

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

async function saveCity(city) {
    if (!city.length) {
        printError('Не передан city');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен');
    } catch (e) {
        printError(e.message);
    }
}

async function getForCast() {
    try {
        const weather = await getWeather(process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city));
        printWeather(weather, getIcon(weather?.weather[0]?.icon));
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
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return await getForCast();
}

initCLI();