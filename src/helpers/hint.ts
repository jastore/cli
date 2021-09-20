import chalk = require("chalk");


export const hint = (...args: any[]) => console.log(chalk.green(`hint: `), ...args);