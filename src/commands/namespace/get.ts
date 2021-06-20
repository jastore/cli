import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import config from '../../config';
import { printNamespaceDetails } from '../../helpers/namespaces/printNamespaceDetails';

export default class NamespaceGet extends Command {
  static description = 'Display informations about a namespace'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),

  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(NamespaceGet);
    const namespaceCode = flags.namespace || api.getCurrentNamespace();

    const namespace = await api.fetchNamespace(namespaceCode);

    printNamespaceDetails(namespace);

  }
}


