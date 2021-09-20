

import chalk = require("chalk");
import { api } from "../../api";


export function printNamespaceDetails (namespace: any) {
  console.log(chalk.green(`Type:`), namespace.type);

  if (Object.keys(namespace.options || {}).length > 0) {
    console.log(chalk.green(`Options: `))
    Object.keys(namespace.options).forEach(prop => {
      console.log(`  - ${prop}: ${namespace.options[prop]}`);
    })
  } else {
    console.log(`${chalk.green('Options:')} (no options)`);
  }
}