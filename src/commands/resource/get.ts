import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';

export default class ResourceGet extends Command {
  static description = 'print details about a resource';
  static aliases = ['resources:get', 'resource', 'resources'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'resource', required : true }]

  async run() {
    const {args, flags} = this.parse(ResourceGet)
    const namespace = flags.namespace || api.getCurrentNamespace();

    const resource = await api.fetchResource(namespace, args.resource);

    // console.log(resource);
    this.log(`Namespace: ${namespace}`);
    this.log(`Resource: ${resource.name}`);
    this.log(`Schema properties:`);
    if (resource.schema?.properties) {
      for (const propName of (Object.keys(resource.schema.properties))) {
        const props = resource.schema.properties[propName];
        this.log(`- ${propName} (${props.type})`)
      }
    } else {
      this.log(`(empty)`);
    }

  }
}
