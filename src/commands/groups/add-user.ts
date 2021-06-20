import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';

export default class GroupsAddUser extends Command {
  static description = 'Add a user to a group'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    user: flags.string({char: 'u', description: `email of the user`}),
    group: flags.string({char: 'g', description: `name of the group`}),
  }

  async run() {
    const {args, flags} = this.parse(GroupsAddUser);
    const namespace = flags.namespace || api.getCurrentNamespace();

    let user = flags.user;
    let group = flags.group;

    if (!user) {
      user = await cli.prompt(`User (email)`);
    }

    if (!user) {
      return this.error(`You must provide the user email`);
    }

    if (!group) {
      group = await cli.prompt(`Group name`);
    }

    if (!group) {
      return this.error(`You must provide a group name`);
    }

    await api.addUserToGroup(namespace, group, user);

    this.log(`user added to the group`);
  }
}
