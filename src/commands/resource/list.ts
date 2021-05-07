import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';

export default class ResourceList extends Command {
  static description = 'list all resources in a namespace';
  static aliases = ['resources:list', 'resources', 'resource'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ResourceList)
    const namespace = flags.namespace || api.getCurrentNamespace();
    
    const list = await api.listNamespaceResources(namespace);

    // console.log(list)
    this.log(`Namespace: ${namespace}`);
    if (!list || list.length === 0) {
      this.log(`No resource in this namespace. Use the "resource:create" command to create one.`);
      this.log(`Example to create a resource named "book":`);
      this.log(`\t jastore resource:create --schema ./book.schema.json book`);
    } else {
      this.log(`Resources:`);
      for (const resource of list) {
        this.log(`- ${resource.name}`);
      }
      // this.log(` `)
      // this.log(`Hint: to vizualize the endpoint available for a resource, type: `)
      // this.log(`\t jastore resource`)
    }
  }
}
