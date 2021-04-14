import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';

export default class ResourceList extends Command {
  static description = 'list all resources in a namespace';
  static aliases = ['resources:list'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ResourceList)
    const namespace = flags.namespace || api.getCurrentNamespace();
    
    const list = await api.listNamespaceResources(namespace);

    console.log(list)
    // for (const resource of list) {
    //   this.log(resource);
    // } 
  }
}
