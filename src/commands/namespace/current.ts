import {Command, flags} from '@oclif/command'
import { api } from '../../api';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';

export default class NamespaceCurrent extends Command {
  static description = 'Set current namespace'
  static aliases = ['namespaces:current']


  static flags = {}

  static args = [{name: 'namespace'}]

  async run() {
    const {args, flags} = this.parse(NamespaceCurrent);

    if (args.namespace) {
      api.setCurrentNamespace(args.namespace);
    } else {
      printCurrentNamespace();
    }
  }
}
