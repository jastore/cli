import {Command, flags} from '@oclif/command'
import { api } from '../../api';

export default class NamespaceCurrent extends Command {
  static description = 'Display the currently selected namespace'
  static aliases = ['namespaces:current']


  static flags = {
  }

  static args = [{name: 'namespace'}]

  async run() {
    const {args, flags} = this.parse(NamespaceCurrent);

    if (args.namespace) {
      api.setCurrentNamespace(args.namespace);
    } else {
      const currentNamespace = api.getCurrentNamespace();
      if (currentNamespace) {
        this.log(`Current namespace:`, currentNamespace); 
      } else {
        this.log('No current namespace');
      }
    }
  }
}
