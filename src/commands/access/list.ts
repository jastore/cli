import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';
import { printAccessControls } from '../../helpers/access/printAccessControls';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';

export default class AccessList extends Command {
  static description = 'List the resources accessible for each user group'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  async run() {
    const {args, flags} = this.parse(AccessList);
    const namespace = flags.namespace || api.getCurrentNamespace();

    const accessControl = await api.listAccessControls(namespace);

    printCurrentNamespace(namespace);
    printAccessControls(accessControl);
  }
}
