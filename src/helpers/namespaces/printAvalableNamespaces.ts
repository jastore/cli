import chalk = require("chalk");
import { api } from "../../api";
import { store } from "../../storage";


export async function printAvailableNamespaces () {
  const tmpNamespaces = Object.keys(store.tmpNamespacesKeys || {});

  if (tmpNamespaces.length === 0) {
    console.log('No accessible namespaces');
    console.log(`To create a new namespace, use the following command:`);
    console.log(chalk.green(`    jastore namespace:create`));
  } 

  const currentNamespace = api.getCurrentNamespace();
  for (const tmpNamespace of tmpNamespaces) {
    const isCurrent = tmpNamespace === currentNamespace;
    const exists = await api.checkNamespaceExists(tmpNamespace);
    console.log(`- ${tmpNamespace} (temporary)${isCurrent ? ` (current)` : ``}${exists ? '' : chalk.red(` (deleted)`)}`);
  }

}