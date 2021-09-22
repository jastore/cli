import chalk = require("chalk");
import { api } from "../../api";
import { store } from "../../storage";
import { info } from "../logs/info";


export async function printAvailableNamespaces () {
  const tmpNamespaces = Object.keys(store.tmpNamespacesKeys || {});

  if (tmpNamespaces.length === 0) {
    info('No accessible namespaces');
    info(`To create a new namespace, use the following command:`);
    info(chalk.green(`    jastore namespace:create`));
  } 

  const currentNamespace = api.getCurrentNamespace();
  for (const tmpNamespace of tmpNamespaces) {
    const isCurrent = tmpNamespace === currentNamespace;
    const exists = await api.checkNamespaceExists(tmpNamespace);
    info(`- ${tmpNamespace} (temporary)${isCurrent ? ` (current)` : ``}${exists ? '' : chalk.red(` (deleted)`)}`);
  }

}