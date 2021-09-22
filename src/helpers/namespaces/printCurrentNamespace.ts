import chalk = require("chalk");
import { api } from "../../api";
import * as moment from 'moment';
import { settings } from "../../settings";
import { info } from "../logs/info";


export async function printCurrentNamespace (namespaceCode?: string) {
  const currentNamespace = namespaceCode || api.getCurrentNamespace();
  if (currentNamespace) {
    const existing = await api.checkNamespaceExists(currentNamespace);
    if (existing) {
      const createdAt = moment(existing.createdAt);
      const expiration = createdAt.clone().add(settings.expiration, settings.expirationUnit);
    }
    const alias = existing?.name ? `(alias: ${existing.name})` : ``;
    const deleted = existing ? '' : chalk.red(` (deleted)`);
    info(chalk.green(`Current namespace:`), currentNamespace, alias, deleted); 
  } else {
    info('No current namespace selected.');
    info(`To select a namespace, use the following command: `);
    info(`    ${chalk.green(`jastore namespace:current <namespace-code>`)}`);
    info(`To list available namespaces, use the following command: `);
    info(`    ${chalk.green(`jastore namespace:list`)}`);
  }
}