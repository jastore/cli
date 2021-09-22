import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import { printAvailableResources } from '../../helpers/resources/printAvailableResource';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';
import _ = require('lodash');
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';
import { printResourceDetails } from '../../helpers/resources/printResourceDetails';
import chalk = require('chalk');

export default class ResourceList extends Command {
  static description = 'List all resources in a namespace';
  static aliases = ['resources:list', 'rs', 'rs:list'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'resource', description: `(optional) resource name (if present, this command will print the details about this resource instead of the list of all resources)`}]

  static examples = [
    `# List all resources in current namespace:
${chalk.green(`npx jastore resource:list`)}
# Alias:
${chalk.green(`npx jastore resources:list`)}
${chalk.green(`npx jastore rs:list`)}
${chalk.green(`npx jastore rs`)}
`,
    `# Print details about a resource (alias for the resource:get command):
${chalk.green(`npx jastore rs [resource_name]`)}
`,
  ]

  async run() {
    const {args, flags} = this.parse(ResourceList)
    const namespaceCode = flags.namespace || api.getCurrentNamespace();
    const resourceCode = args.resource;

    await ensureNamespace(namespaceCode);
    await printCurrentNamespace(namespaceCode);

    if (resourceCode) {
      printResourceDetails(resourceCode, namespaceCode);
    } else {
      printAvailableResources(namespaceCode);
    }
  }
}
