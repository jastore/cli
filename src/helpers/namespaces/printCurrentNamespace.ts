import chalk = require("chalk");
import { api } from "../../api";


export function printCurrentNamespace (namespace?: string) {
  const currentNamespace = namespace || api.getCurrentNamespace();
  if (currentNamespace) {
    console.log(`Current namespace:`, currentNamespace); 
  } else {
    console.log('No current namespace selected.');
    console.log(`To select a namespace, use the following command: `);
    console.log(`    ${chalk.green(`jastore namespace:current <namespace-code>`)}`);
    console.log(`To list available namespaces, use the following command: `);
    console.log(`    ${chalk.green(`jastore namespace:list`)}`);
  }
}