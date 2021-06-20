import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';

export default class UserGroups extends Command {
  static description = 'List the groups a user is part of'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'user'}]

  async run() {
    const {args, flags} = this.parse(UserGroups)
    const namespace = flags.namespace || api.getCurrentNamespace();
    const user: string = args.user || (await cli.prompt(`User email`)) || this.error(`You must provide the user's email`);

    const userGroups = await api.listGroupsForUser(namespace, user);

    if (!userGroups || userGroups.length === 0) {
      return this.log(`This user isn't in any groups`);
    } else {
      this.log('This user is part of the following groups:')
      userGroups.forEach((ug: any) => {
        // this.log(`- ${ug.group} [record uuid: ${ug.uuid}]`)
        this.log(`- ${ug.group}`)
      })
    }

  }
}
