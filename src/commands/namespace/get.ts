import { flags } from '@oclif/command';
import chalk = require('chalk');

import { api } from '../../api';
import { printNamespaceDetails } from '../../helpers/namespaces/printNamespaceDetails';
import Command from '../../base';
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';

export default class NamespaceGet extends Command {
  static description = 'Display details about a namespace'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),

  }

  static args = [{name: 'namespace'}]

  async run() {
    const {args, flags} = this.parse(NamespaceGet);
    const namespaceCode = flags.namespace || args.namespace || api.getCurrentNamespace();

    await ensureNamespace(namespaceCode);
    try {
      await printCurrentNamespace();
      const namespace = await api.fetchNamespace(namespaceCode);
      printNamespaceDetails(namespace);
    } catch (e: any) {
      if (e?.response?.status === 403 || e?.response?.status === 404) {
        return this.error(chalk.red(`This namespace does not exists or you dont have access to it.`));
      }

      throw e;
    }
  }
}


