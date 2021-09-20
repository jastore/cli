import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import { printAvailableResources } from '../../helpers/resources/printAvailableResource';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';
import _ = require('lodash');
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';

export default class ResourceList extends Command {
  static description = 'List all resources in a namespace';
  static aliases = ['resources:list', 'resources', 'resource'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'namespace', description: `namespace code, (default to current namespace)`}]


  async run() {
    const {args, flags} = this.parse(ResourceList)
    const namespaceCode = flags.namespace || args.namespace || api.getCurrentNamespace();
    await ensureNamespace(namespaceCode);
    await printCurrentNamespace(namespaceCode);
    printAvailableResources(namespaceCode);
  }
}
