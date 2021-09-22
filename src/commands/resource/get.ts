import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import { printResourceDetails } from '../../helpers/resources/printResourceDetails';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';

export default class ResourceGet extends Command {
  static description = 'Display details about a resource';
  static aliases = ['resources:get', 'rs:get'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'resource', required : true }]

  async run() {
    const {args, flags} = this.parse(ResourceGet)
    const namespace = flags.namespace || api.getCurrentNamespace();

    await ensureNamespace(namespace);
    await printCurrentNamespace(namespace);

    await printResourceDetails(args.resource, namespace);
  }
}
