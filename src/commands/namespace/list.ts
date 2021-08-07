import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux'
import { store } from '../../storage';
import chalk = require('chalk');
import * as _ from 'lodash';

export default class NamespaceList extends Command {
  static description = 'List the namespaces you have access to.'
  static aliases = ['namespaces:list', 'namespaces']

  async run() {
    const localNamespacesCodes = Object.keys(store.tmpNamespacesKeys || {});
    let remoteNamespaces = [];

    try {
      remoteNamespaces = await api.listNamespaces();
    } catch (e) {
      this.log(`You are not connected, we will only list temporary namespaces stored locally.`)
    }
     let currentNamespace = null;

    try {
      currentNamespace = api.getCurrentNamespace();
    } catch (e) {}

    const remoteNamespacesCodes = remoteNamespaces.map(n => n.code);
    const namespaces = _.merge(localNamespacesCodes, remoteNamespacesCodes);

    if (localNamespacesCodes.length === 0) {
      this.log('No accessible namespaces');
      this.log(`To create a new namespace, use the following command:`);
      this.log(chalk.green(`    jastore namespace:create`));
    }

    for (const namespace of namespaces) {
      const isCurrent = namespace === currentNamespace;
      const exists = await api.checkNamespaceExists(namespace);
      this.log(`- ${namespace} ${isCurrent ? ` (current)` : ``}${exists ? '' : chalk.red(` (deleted)`)}`);
    }
    
  }
}
