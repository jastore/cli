import chalk = require("chalk");


export const tips = {
  namespaces : {
    setCurrent: `To set the current namespace to another namespace, try this command: ${chalk.green(`jastore current <namespacecode>`)}`,
    listAvailable: `To list available namespaces, try this command: ${chalk.green(`jastore namespaces:list`)}`,
  }
}