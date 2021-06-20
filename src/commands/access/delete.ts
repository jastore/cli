import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux';

export default class AccessDelete extends Command {
  static description = 'Delete an access control record'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    resource: flags.string({char: 'r', description: `resource name`, required: true }),
  }

  static args = [{name: 'access', required: true, description: 'uuid of the access-control record to delete'}]


  async run() {
    const {args, flags} = this.parse(AccessDelete)
    const namespace = flags.namespace || api.getCurrentNamespace();

    await api.deleteAccessControl(namespace, flags.resource, args.access)

    this.log(`Access-control record deleted`);

  }
}
