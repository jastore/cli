import {Command, flags} from '@oclif/command'
import chalk = require('chalk');
import { api } from '../../api';
import { hint } from '../../helpers/logs/hint';
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';
import { tips } from '../../tips';

export default class NamespaceCurrent extends Command {
  static description = 'Set current namespace'
  static aliases = ['namespaces:current', 'namespace:current', 'current', 'use', 'namespace:use', 'namespace', 'ns', 'ns:current', 'ns:use']

  static flags = {}

  static args = [{name: 'namespace'}]

  async run() {
    const {args, flags} = this.parse(NamespaceCurrent);

    if (args.namespace) {
      api.setCurrentNamespace(args.namespace);
    } else {
      await printCurrentNamespace();
      await ensureNamespace();
      hint(tips.namespaces.setCurrent);
      hint(tips.namespaces.listAvailable);
    }
  }
}
