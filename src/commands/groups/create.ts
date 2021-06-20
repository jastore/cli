import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';

export default class GroupsCreate extends Command {
  static description = 'Create an empty user group'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'group', description: 'name of the group you want to create', required: true}]

  static examples = [
    `jastore groups:create mygroup`
  ]


  async run() {
    const {args, flags} = this.parse(GroupsCreate)
    const namespace = flags.namespace || api.getCurrentNamespace();
    let group = args.group;

    this.log(`Creating a new user group...`)
    // if (!group) {
    //   group = await cli.prompt(`Name of the group`);
    // }

    if (!group) {
      return this.error(`You must provide a name for the group you want to create`)
    }

    await api.createGroup(namespace, group);

    this.log(chalk.green(`Group "${group}" created`));
    this.log(`To add users to this group, try this command:`, chalk.green(`jastore groups:add-user --help`))
    this.log(`To allow this group to perform some operations on a resource, try the command:`, chalk.green(`jastore access:create --help`))


  }
}
