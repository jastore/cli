import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux'
import { store } from '../../storage';
import chalk = require('chalk');

export default class NamespaceList extends Command {
  static description = 'List the namespaces you have access to.'
  static aliases = ['namespaces:list', 'namespaces']

  async run() {
    const tmpNamespaces = Object.keys(store.tmpNamespacesKeys || {});


    if (tmpNamespaces.length === 0) {
      this.log('No accessible namespaces');
      this.log(`To create a new namespace, use the following command:`);
      this.log(chalk.green(`    jastore namespace:create`));
    } 

    const currentNamespace = api.getCurrentNamespace();
    for (const tmpNamespace of tmpNamespaces) {
      const isCurrent = tmpNamespace === currentNamespace;
      const exists = await api.checkNamespaceExists(tmpNamespace);
      this.log(`- ${tmpNamespace} (temporary)${isCurrent ? ` (current)` : ``}${exists ? '' : chalk.red(` (deleted)`)}`);
    }
    
  }
}
