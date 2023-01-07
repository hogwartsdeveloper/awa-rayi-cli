import chalk from 'chalk';
import dedent from "dedent-js";
function printError(error) {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

function printSuccess(msg) {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
}

function printHelp() {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_TOKEN] для вывода помощи
        `)
    );
}

function printWeather(res, icon) {
    console.log(
        dedent(`${chalk.bgBlueBright(' WEATHER  ')} Погода в городе ${res.name}
        ${icon}${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Скорость ветра: ${res.wind.speed} 
        `)
    );
}

export { printError, printSuccess, printHelp, printWeather }