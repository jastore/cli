import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import chalk = require('chalk');

export default class GroupsList extends Command {
  static description = 'List user groups for a particular namespace'


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  async run() {
    const {args, flags} = this.parse(GroupsList);
    const namespace = flags.namespace || api.getCurrentNamespace();

    const groups = await api.listNamespaceGroups(namespace);

    this.log(`Namespace:`, namespace);

    if (!groups || groups.length === 0) {
      this.log(`No user groups in this namespace.`);
    } else {
      this.log(`${groups.length} user groups configured: `)
      groups.forEach((group: any) => {
        this.log(`- ${group.name}`)
      })
    }

    this.log(`To create more user groups, try this command:`, chalk.green(`jastore groups:create`));
  }

}
