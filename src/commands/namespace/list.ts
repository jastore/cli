import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux'
import { store } from '../../storage';

export default class NamespaceList extends Command {
  static description = 'List the namespaces you have access to.'
  static aliases = ['namespaces:list', 'namespaces']

  static flags = {
    // help: flags.help({char: 'h'}),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(NamespaceList)

    // const { data : namespaces, status } = await api().get(`/namespaces`);
    // const namespaces = store.accessibleNamespaces || [];
    // console.log(JSON.stringify(store.tmpNamespacesKeys));
    const tmpNamespaces = Object.keys(store.tmpNamespacesKeys || {});


    if (tmpNamespaces.length === 0) {
      this.log('No accessible namespaces');
    } 

    const currentNamespace = api.getCurrentNamespace();
    for (const tmpNamespace of tmpNamespaces) {
      const isCurrent = tmpNamespace === currentNamespace;
      this.log(`- ${tmpNamespace} (temporary)${isCurrent ? ` (current)` : ``}`);
    }
    
  }
}
