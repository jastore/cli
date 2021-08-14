import {Command, flags} from '@oclif/command'
import { api } from '../../api';
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';

export default class UserDelete extends Command {
  static aliases = ['users:create'];

  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static description = 'delete a new user from a namespace';

  static args = [{name: 'email', required : true }];

  static examples = [
    `npx jastore user:delete user@email.com`,
  ];

  async run() {
    const {args, flags} = this.parse(UserDelete);
    const namespace = flags.namespace || api.getCurrentNamespace();
    await ensureNamespace(namespace);

    await api.deleteUser(namespace, args.email);

    this.log('user deleted');
  }
}
