import chalk = require("chalk");


export const hint = (...args: any[]) => console.info(chalk.green(`hint: `), ...args);