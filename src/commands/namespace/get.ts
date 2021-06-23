import { flags } from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import config from '../../config';
import { printNamespaceDetails } from '../../helpers/namespaces/printNamespaceDetails';
import Command from '../../base';
import chalk = require('chalk');

export default class NamespaceGet extends Command {
  static description = 'Display informations about a namespace'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),

  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(NamespaceGet);
    const namespaceCode = flags.namespace || api.getCurrentNamespace();

    try {
      const namespace = await api.fetchNamespace(namespaceCode);
      printNamespaceDetails(namespace);
    } catch (e) {
      if (e?.response?.status === 403 || e?.response?.status) {
        return this.error(chalk.red(`This namespace does not exists or you dont have access to it.`));
      }

      throw e;
    }
  }
}


