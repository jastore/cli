import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';
import { info } from '../../helpers/logs/info';

export default class UserGet extends Command {
  static description = 'Display informations about a particular user in a namespace'

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'email'}]

  async run() {
    const {args, flags} = this.parse(UserGet)
    const namespace = flags.namespace || api.getCurrentNamespace();
    const user: string = args.email || (await cli.prompt(`User email`)) || this.error(`You must provide the user's email`);

    const userInfo = await api.fetchUser(namespace, user);

    info(userInfo)
  }
}
